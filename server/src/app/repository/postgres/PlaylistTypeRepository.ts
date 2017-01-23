/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {PlaylistType} from "../../model/postgres/PlaylistType";


class PlaylistTypeRepository extends BaseRepository<PlaylistType> {

    constructor() {
        super(PlaylistType);
    }

}

export = PlaylistTypeRepository;