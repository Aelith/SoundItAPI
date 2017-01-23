/**
 * Created by Lakio on 21/01/2017.
 */

import EventRepository = require("../repository/postgres/EventRepository");
import {Event} from "../model/postgres/Event";
import BaseBusiness = require("./interfaces/BaseBusiness");

class EventBusiness extends BaseBusiness<Event> {

    private eventRepository: EventRepository;

    constructor () {
        super(Event);
        this.eventRepository = new EventRepository();
    }

    create (item: Event, callback: (error: any, result: any) => void) {
        this.eventRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.eventRepository.retrieve(callback);
    }

    update (item: Event, callback: (error: any, result: any) => void) {
        //TODO
        this.eventRepository.findById(item.id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                this.eventRepository.update(item, callback);
            }
        });
    }

    delete(item: Event, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: Event) => void) {
        this.eventRepository.findById(_id, callback);
    }

}

Object.seal(EventBusiness);
export = EventBusiness;