/**
 * Created by soundit on 16/01/2017.
 */

import {createConnection, Connection} from "typeorm";
import Constants = require("./../../../config/constants/constants");

class DataAccessPostgres {

    private static connection = null;

    constructor() {
        DataAccessPostgres.connect();
    }


    static connect(): Connection {

        if (this.connection != null) return this.connection;


        createConnection({
            driver: {
                type: "postgres",
                host: Constants.POSTGRES_HOSTNAME,
                port: Constants.POSTGRES_PORT,
                username: Constants.POSTGRES_USERNAME,
                password: Constants.POSTGRES_PASSWORD,
                database: Constants.POSTGRES_DBNAME,
                schemaName: Constants.POSTGRES_SCHEMA
            },
            entities: [
                //Country, User, Address
                __dirname + "/../../model/postgres/*"  // here we load all entities from entity directory
            ],
            autoSchemaSync: process.env.FORCE_DB === '1' ? true : false
        })
            .then((connection) => {
                console.log("connected to postgres");
                this.connection = connection;
            })
            .catch((e) => {
                throw e;
            });


        return this.connection;
    }
}

DataAccessPostgres.connect();
export = DataAccessPostgres;