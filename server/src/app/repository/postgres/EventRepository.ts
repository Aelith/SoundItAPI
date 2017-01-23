/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Event} from "../../model/postgres/Event";


class EventRepository extends BaseRepository<Event> {

    constructor() {
        super(Event);
    }

}

export = EventRepository;