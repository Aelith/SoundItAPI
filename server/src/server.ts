import express 			= require('express');
import BaseRoutes 	    = require("./config/routes/Routes");
import bodyParser 	    = require("body-parser");
import path 			= require('path');
import compression      = require('compression');


var port	: number 	= process.env.PORT || 3000;
var env		: string 	= process.env.NODE_ENV || 'developement';


var app 	= express();

app.set('port', port);


app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(bodyParser.json());
app.use(compression());

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