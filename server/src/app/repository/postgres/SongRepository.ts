/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Song} from "../../model/postgres/Song";


class SongRepository extends BaseRepository<Song> {

    constructor() {
        super(Song);
    }

}

export = SongRepository;