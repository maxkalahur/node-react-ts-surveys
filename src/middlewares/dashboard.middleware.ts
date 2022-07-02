import * as express from 'express';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { PromoterApiService } from "../services/api/promoter-api.service";
import { AuthService } from "../services/auth/auth.service";

export default function(req: any, res: express.Response, next: express.NextFunction) {
console.log('start');

    if ( !req.session.user && req.query.key ) {

        const key = req.query.key;
        const userExistCheck: any = new AuthService(new PromoterApiService()).checkIfUserAdmin(key);
        console.log(userExistCheck);
        if( userExistCheck.res === "1" ) {
            let user = User.findOne({ api_key: key }).exec();

            if( !user ) {
                user = new User({
                    apiKey: key,
                    isSuperAdmin: userExistCheck.isSuperAdmin,
                }).save();
            }
            console.log(user);
            req.session.user = user;
            next();
        }
        else {
            return res.sendStatus(302);
        }

    } else if( req.session.user ) {
        next();
    } else {
        return res.sendStatus(302);
    }
}