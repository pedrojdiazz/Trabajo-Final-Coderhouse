import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local";
import configObject from '../config/config.js';
import { PassportTools } from '../middlewares/auth.js';
import UserService from "../services/userService.js";

const passportTools = new PassportTools();
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            const { first_name, last_name, age } = req.body;

            try {
                const user = await UserService.addUser({ first_name, last_name, email, age, password: passportTools.createHash(password) });
                if (user === -1) return done(null, false, { message: 'Valores incompletos para el registro de usuario' });

                if (!user) return done(null, false, { message: 'El usuario ya existe' });

                return done(null, user)

            } catch (err) {
                return done(err)
            }

        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await UserService.getUserByEmail(email);
                if (!user) return done(null, false, { message: 'Usuario no encontrado' });

                if (!passportTools.isValidPassword(user, password)) return done(null, false, { message: 'Contraseña incorrecta' });

                return done(null, user)
            } catch (error) {
                return done(error);
            }
        }

    ))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([passportTools.cookieExtractor]),
        secretOrKey: configObject.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)

        } catch (error) {
            return done(error)
        }
    }
    ))
}

export default initializePassport;