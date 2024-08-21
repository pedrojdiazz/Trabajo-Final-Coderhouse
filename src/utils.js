import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configObject from './config/config.js';
const __filename = fileURLToPath(import.meta.url);
import passport from 'passport';
export const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const cookieExtractor = req => {
    let token;
    if (req && req.cookies) {  
        token = req.cookies['pepeCookieToken']
    }
    return token;
}

export const generateToken = (user) => {
    const token = jwt.sign(user, configObject.JWT_SECRET, {expiresIn:'24h'});
    return token;
}

export const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, options, (error, user, info) => {
            if (error) {
                return next(error)
            }

            if(!user) {
                return res.status(401).send({error: info.message ? info.message : info.toString() }); 
            }

            req.user = user; 
            next(); 
        })(req, res, next)

    }
}

export const authorization = (role) => {
    return async (req, res, next) => {
        if(req.user.role !== role) { 
            return res.status(403).send({error: "No tenes permiso para ingresar"}); 
        }
        next();
    }
}

export const handleLogin = (user, res) => {
    const userPayload = { id: user._id, email: user.email, role: user.role, age: user.age, first_name: user.first_name, last_name: user.last_name};
    const token = generateToken(userPayload);
    res.cookie('pepeCookieToken', token, { httpOnly: true, maxAge: 60*60*1000 })
       .redirect("/api/sessions/current");
}
