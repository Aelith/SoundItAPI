/**
 * Created by Lakio on 24/01/2017.
 */

import express = require('express');
import unless = require('express-unless');
import jwt = require('jsonwebtoken');
import Constants = require("../config/constants/constants");


export class LoginManager 
{

    constructor() {

    }


    static decodeToken (req, res: express.Response, next: express.NextFunction) 
    {
        if (req.path == '/api/login')
        {
            next();
        }
        else
        {
            if (!req.headers['authorization']) throw new Error('authorization should be set');

            try{
                // check header parameters for token
                var token = req.headers['authorization'].split(' ')[1];

                if (token) {
                    // verifies secret and checks exp
                    jwt.verify(token, Constants.SECRET_TOKEN, function (err, decoded) {

                        if (err) {
                            next(err);
                        } else {

                            var decoded = jwt.decode(token, {complete: true});

                            res.locals.userToken = {};
                            res.locals.userToken.decoded = decoded;
                            res.locals.userToken.login = decoded.payload.username;
                            res.locals.userToken.password = decoded.payload.password;
                            

                            next();
                        }
                    });
                }
                else {
                    next(new Error("Unauthorized access"));
                }
            }
            catch(e){
                next(e);
            }
        }
    }

    static getToken(req): any {

        if(req.body.login != null && req.body.password != null) {
            var token = jwt.sign({
                username: req.body.login,
                password: req.body.password
            }, Constants.SECRET_TOKEN);

            return token;
        }
        else
        {
            return null;
        }
    }
}