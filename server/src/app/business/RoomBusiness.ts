/**
 * Created by Lakio on 20/01/2017.
 */

import PlaylistRepository = require("../repository/postgres/RoomRepository");
import {Room} from "../model/postgres/Room";
import BaseBusiness = require("./interfaces/BaseBusiness");
import RoomRepository = require("../repository/postgres/RoomRepository");
import RoomTemplateRepository = require("../repository/postgres/RoomTemplateRepository");
import RoomPlaylistRepository = require("../repository/postgres/RoomPlaylistRepository");
import {RoomPlaylist} from "../model/postgres/RoomPlaylist";

class RoomBusiness extends BaseBusiness<Room> {

    private roomRepository: RoomRepository;
    private roomPlaylistRepository: RoomPlaylistRepository;

    constructor () {
        super(Room);
        this.roomRepository = new PlaylistRepository();
        this.roomPlaylistRepository = new RoomPlaylistRepository();
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
        this.roomRepository.findCustomHydratedById(_id,
                [RoomRepository.eProperty.RoomPlaylistPlaylistType,
                RoomRepository.eProperty.RoomPlaylistPlaylist,
                RoomRepository.eProperty.RoomTemplateTag,
                RoomRepository.eProperty.RoomUserUser,
                RoomRepository.eProperty.Tags],
            callback);
    }

    getRoomsWithDetails(callback: (error: any, result: any) => void){
        //TODO
    }

    findByUserId(_id: number, callback: (error: any, result: Room) => void) {
        //this.roomRepository.findByUserId(_id, callback);
    }

    getRoomPlaylistByRoomId(roomId: number, callback: (error: any, result: RoomPlaylist[]) => void) {
        this.roomPlaylistRepository.findByRoomId(roomId,callback);
    }

}

Object.seal(RoomBusiness);
export = RoomBusiness;