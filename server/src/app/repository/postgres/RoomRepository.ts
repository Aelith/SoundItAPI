/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Room} from "../../model/postgres/Room";


class RoomRepository extends BaseRepository<Room> {

    constructor() {
        super(Room);
    }

}

export = RoomRepository;