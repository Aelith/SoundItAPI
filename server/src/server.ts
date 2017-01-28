import express 			= require('express');
import BaseRoutes 	    = require("./config/routes/Routes");
import bodyParser 	    = require("body-parser");
import path 			= require('path');
import compression      = require('compression');
import expressJwt       = require('express-jwt');
import Constants        = require("./config/constants/constants");
import cors             = require('cors');
import {LoginManager}     from './tools/LoginManager';

var port	: number 	= process.env.PORT || 3000;
var env		: string 	= process.env.NODE_ENV || 'developement';
var secure  : number    = process.env.SECURE || 0;

var app 	= express();

app.set('port', port);

app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(bodyParser.json());
app.use(compression());

if (env === 'developement')
{
    app.use(cors());
}


if(secure == 1){
    app.use(expressJwt({ secret: Constants.SECRET_TOKEN }).unless({ path: [ '/api/login' ]}));
    app.use(LoginManager.decodeToken);
}
else
{
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.locals.userToken = {};
        res.locals.userToken.decoded = true;
        res.locals.userToken.login = "default";
        res.locals.userToken.password = "default";

        next();
    })
}

app.use('/api', new BaseRoutes().routes);

if(env === 'developement'){
    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}


// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});



export { app }