/**
 * Created by Lakio on 21/01/2017.
 */

import RoomTemplateRepository = require("../repository/postgres/RoomTemplateRepository");
import BaseBusiness = require("./interfaces/BaseBusiness");
import {RoomTemplate} from "../model/postgres/RoomTemplate";

class RoomTemplateBusiness extends BaseBusiness<RoomTemplate> {

    private roomTemplateRepository: RoomTemplateRepository;

    constructor () {
        super(RoomTemplate);
        this.roomTemplateRepository = new RoomTemplateRepository();
    }

    create (item: RoomTemplate, callback: (error: any, result: any) => void) {
        this.roomTemplateRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.roomTemplateRepository.retrieve(callback);
    }

    update (item: RoomTemplate, callback: (error: any, result: any) => void) {
        //TODO
        this.roomTemplateRepository.findById(item.id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                this.roomTemplateRepository.update(item, callback);
            }
        });
    }

    delete(item: RoomTemplate, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: RoomTemplate) => void) {
        this.roomTemplateRepository.findById(_id, callback);
    }

    getRoomsWithDetails(callback: (error: any, result: any) => void){
        //TODO
    }

    findByUserId(_id: number, callback: (error: any, result: RoomTemplate) => void) {
        this.roomTemplateRepository.findCustomHydratedByUser(_id,
                [RoomTemplateRepository.eProperty.EventsTags,
                RoomTemplateRepository.eProperty.Tags],
                callback);
    }

}

Object.seal(RoomTemplateBusiness );
export = RoomTemplateBusiness ;