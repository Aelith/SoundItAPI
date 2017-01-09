/**
 * Created by soundit on 06/01/2017.
 */

import winston   = require('winston');
require('winston-loggly-bulk');


var env		: string 	= process.env.NODE_ENV || 'developement';

// Values
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

var logger = new winston.Logger({
    //level: 'info',
    transports: [
        new (winston.transports.Loggly)({
            token: "8a143261-dab1-43e9-9b74-e238e0669853",
            subdomain: "soundit",
            tags: ["SoundIt", "SoundItAPI", "API"],
            json: true,
            name: "soundit-info",
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'logs/info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
    filename: 'logs/error.log',
        level: 'error'
})
]
});

if(env == "developement")
{
    logger.add(winston.transports.Console, {name: "console"});
}

export = logger;


