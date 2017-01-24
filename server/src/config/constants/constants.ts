/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

class Constants {
    static MONGO_CONNECTION_STRING: string  = process.env.NODE_ENV === 'production' ? process.env.M_DB_URI : "mongodb://192.168.25.90:27017/quickStart";
    static POSTGRES_HOSTNAME: string        = process.env.NODE_ENV === 'production' ? process.env.PG_DB_Hostname : "192.168.25.90";
    static POSTGRES_PORT: number            = process.env.NODE_ENV === 'production' ? process.env.PG_DB_Port : 5432;
    static POSTGRES_USERNAME: string        = process.env.NODE_ENV === 'production' ? process.env.PG_DB_Username : "soundit";
    static POSTGRES_PASSWORD: string        = process.env.NODE_ENV === 'production' ? process.env.PG_DB_Password : "soundit";
    static POSTGRES_DBNAME: string          = process.env.NODE_ENV === 'production' ? process.env.PG_DB_DBName : "soundit";
    static POSTGRES_SCHEMA: string          = process.env.NODE_ENV === 'production' ? process.env.PG_DB_Schema : "sounditapi";
    static SECRET_TOKEN: string             = 'sajer-it@soundit#2017';
}
Object.seal(Constants);
export = Constants;