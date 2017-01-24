/**
 * Created by Lakio on 24/01/2017.
 */

import jwt = require('jsonwebtoken');
import Constants = require("../config/constants/constants");

class LoginManager {

    constructor(){

    }

    static decodeToken (req, res, callback: (error, result) => any ) {

        if(process.env.SECURE != 1){
            callback(null, true);
            return;
        }

        try{
            // check header parameters for token
            var token = req.headers.authorization.split(' ')[1];

            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, Constants.SECRET_TOKEN, function (err, decoded) {

                    if (err) {
                        callback(err, null);
                    } else {
                        // if everything is good, save to request for use in other routes
                        //req.decoded = decoded;

                        callback(null, decoded);
                    }
                });
            }
            else {
                callback(new Error("Unauthorized access"), null);
            }
        }
        catch(e){
            callback(e, null);
        }


    };

    static getToken(req): any {

        var token = jwt.sign({
            username: req.body.login,
            password: req.body.password
        }, Constants.SECRET_TOKEN);

        return token;
    }

}

export = LoginManager;