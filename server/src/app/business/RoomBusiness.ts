/**
 * Created by Lakio on 20/01/2017.
 */

import PlaylistRepository = require("../repository/postgres/RoomRepository");
import {Room} from "../model/postgres/Room";
import BaseBusiness = require("./interfaces/BaseBusiness");
import RoomRepository = require("../repository/postgres/RoomRepository");

class RoomBusiness extends BaseBusiness<Room> {

    private roomRepository: RoomRepository;

    constructor () {
        super(Room);
        this.roomRepository = new PlaylistRepository();
    }

    create (item: Room, callback: (error: any, result: any) => void) {
        this.roomRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this.roomRepository.retrieve(callback);
    }

    update (item: Room, callback: (error: any, result: any) => void) {
        //TODO
        this.roomRepository.findById(item.id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                this.roomRepository.update(item, callback);
            }
        });
    }

    delete(item: Room, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: Room) => void) {
        this.roomRepository.findById(_id, callback);
    }

    getRoomsWithDetails(callback: (error: any, result: any) => void){
        //TODO
    }

}

Object.seal(RoomBusiness);
export = RoomBusiness;