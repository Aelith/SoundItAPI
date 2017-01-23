/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {RoomTemplate} from "../../model/postgres/RoomTemplate";


class RoomTemplateRepository extends BaseRepository<RoomTemplate> {

    constructor() {
        super(RoomTemplate);
    }

}

export = RoomTemplateRepository;