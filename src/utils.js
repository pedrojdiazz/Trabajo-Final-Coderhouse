import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configObject from './config/config.js';
import passport from 'passport';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export class AuthHandler {

    #generateToken(user) {
        const token = jwt.sign(user, configObject.JWT_SECRET, {expiresIn:'24h'});
        return token;
    }

    createUserToken(user, res) {
        const userPayload = { cart_id: user.cart._id, email: user.email, role: user.role, age: user.age, first_name: user.first_name, last_name: user.last_name};
        const token = this.#generateToken(userPayload);
        res.cookie('pepeCookieToken', token, { httpOnly: true, maxAge: 60*60*1000 })
           .redirect("/profile");
        }

    passportCallMiddleware(strategy, options = {}) {
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

    optionalAuthMiddleware(strategy, options = {}) {
        return async (req, res, next) => {
            passport.authenticate(strategy, options, (error, user, info) => {
                if (error) {
                    return next(error);
                }
    
                req.user = user || null;
                next();
            })(req, res, next);
        }
    }

    authorizationMiddleware(role) {
            return async (req, res, next) => {
                if(req.user.role !== role) { 
                    return res.status(403).send({error: "No tenes permiso para ingresar"}); 
                }
                next();
            }
        }

}


export class PassportTools {
    
    createHash(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    
    isValidPassword(user, password) {
        return bcrypt.compareSync(password, user.password)
    } 

    cookieExtractor(req) {
        let token;
        if (req && req.cookies) {  
            token = req.cookies['pepeCookieToken']
        }
        return token;
    }
}

