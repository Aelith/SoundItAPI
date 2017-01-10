/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

class Constants {
    static MONGO_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://SAJER-IT:27017/quickStart"
}
Object.seal(Constants);
export = Constants;