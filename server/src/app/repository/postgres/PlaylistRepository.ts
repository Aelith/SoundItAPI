/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Playlist} from "../../model/postgres/Playlist";


class PlaylistRepository extends BaseRepository<Playlist> {

    constructor() {
        super(Playlist);
    }

}

export = PlaylistRepository;