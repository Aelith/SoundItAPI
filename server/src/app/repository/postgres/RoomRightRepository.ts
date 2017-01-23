/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {RoomRight} from "../../model/postgres/RoomRight";


class RoomRightRepository extends BaseRepository<RoomRight> {

    constructor() {
        super(RoomRight);
    }

}

export = RoomRightRepository;