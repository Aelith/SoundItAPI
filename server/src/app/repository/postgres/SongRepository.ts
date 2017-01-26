/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Song} from "../../model/postgres/Song";
import DataAccessPostgres = require("../../dataAccess/postgres/DataAccessPostgres");

enum SongSource {
    Soundcloud  = 1,
    Spotify     = 2,
    Youtube     = 3,
    Deezer      = 4
}

class SongRepository extends BaseRepository<Song> {

    public static readonly eSongSource = SongSource;

    constructor() {
        super(Song);
    }


    /**
     * Retrieve a single song by it stream and source
     * @param stream
     * @param source
     * @param callback
     */
    findByStreamAndSource (stream: string, source: SongSource, callback : (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Song)
            .createQueryBuilder(Song.getTableName())
            .where("\"" + Song.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Song.getTableName() + "\".stream = :stream", {stream: stream})
            .andWhere("\"" + Song.getTableName() + "\".\"songSource\" = :sS", {sS : source})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

    /**
     * Retrieve an hydrated single song by it stream and source
     * @param stream
     * @param source
     * @param callback
     */
    findHydratedByStreamAndSource (stream: string, source: SongSource, callback : (error: any, result: any) => any) {

        DataAccessPostgres.connect()
            .getRepository(Song)
            .createQueryBuilder(Song.getTableName())
            .leftJoinAndSelect(Song.getTableName() + ".songSource", "songSource")
            .where("\"" + Song.getTableName() + "\".deleted = :deleted", {deleted: false})
            .andWhere("\"" + Song.getTableName() + "\".stream = :stream", {stream: stream})
            .andWhere("\"" + Song.getTableName() + "\".\"songSource\" = :sS", {sS : source})
            .getOne()
            .then((result) => {
                callback(null, result);
            })
            .catch(e => {
                callback(e, null);
            });
    }

}

export = SongRepository;