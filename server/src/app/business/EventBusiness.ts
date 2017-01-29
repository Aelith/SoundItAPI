/**
 * Created by Lakio on 21/01/2017.
 */

import EventRepository = require("../repository/postgres/EventRepository");
import {Event} from "../model/postgres/Event";
import {User} from "../model/postgres/User";
import BaseBusiness = require("./interfaces/BaseBusiness");

class EventBusiness extends BaseBusiness<Event> {

    private eventRepository: EventRepository;

    constructor () {
        super(Event);
        this.eventRepository = new EventRepository();
    }



    retrieveAll (callback: (error: any, result: any) => void) {
        this.eventRepository.retrieveToComeCustomHydrated([EventRepository.eProperty.Tags], callback);
    }

    findByUser (user: User, callback: (error: any, result: any) => void) {
        if(user !== null && user !== undefined && user.id > 0)
            this.eventRepository.findCustomHydratedByUser(user.id, [EventRepository.eProperty.Tags], callback);
        else
            callback(new Error("User must be set to retrieve events by user"), null);
    }


    findById (_id: number, callback: (error: any, result: Event) => void) {
        this.eventRepository.findCustomHydratedById(_id, [EventRepository.eProperty.Tags], callback);
    }


    create (item: Event, callback: (error: any, result: any) => void) {
        this.eventRepository.create(item, callback);
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
        item.deleted = true;
        this.eventRepository.update(item, callback);
    }


}

Object.seal(EventBusiness);
export = EventBusiness;