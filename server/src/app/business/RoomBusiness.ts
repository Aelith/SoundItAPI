/**
 * Created by Lakio on 20/01/2017.
 */

import PlaylistRepository = require("../repository/postgres/RoomRepository");
import RoomPlaylistRepository = require("../repository/postgres/RoomPlaylistRepository");
import {Room} from "../model/postgres/Room";
import {Playlist} from "../model/postgres/Playlist";
import {PlaylistType} from "../model/postgres/PlaylistType";
import {RoomPlaylist} from "../model/postgres/RoomPlaylist";
import {RoomTemplate} from "../model/postgres/RoomTemplate";
import BaseBusiness = require("./interfaces/BaseBusiness");
import RoomRepository = require("../repository/postgres/RoomRepository");
import RoomTemplateRepository = require("../repository/postgres/RoomTemplateRepository");

class RoomBusiness extends BaseBusiness<Room> {

    private roomRepository: RoomRepository;
    private roomPlaylistRepository: RoomPlaylistRepository;

    constructor () {
        super(Room);
        this.roomRepository = new RoomRepository();
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
        item.deleted = true;
        this.roomRepository.update(item, callback);
    }

    deleteById(id: number, callback: (error: any, result: any) => void){
        
        this.roomRepository.findById(id, (err, res) => {
            if(err) {
                callback(err, res);
            }
            else {
                res.deleted = true;
                this.roomRepository.update(res, callback);
            }
        });
    }

    findById (_id: number, callback: (error: any, result: Room) => void) {
        this.roomRepository.findById(_id, callback);
    }

    findHydratedById (_id: number, callback: (error: any, result: Room) => void) {
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


    getRoomPlaylistByRoomId(roomId: number, callback: (error: any, result: RoomPlaylist[]) => void) {
        this.roomPlaylistRepository.findByRoomId(roomId,callback);
    }

    addPlaylistToRoom(roomPlaylist: RoomPlaylist, callback: (error: any, result: Room) => void) {

        new RoomPlaylistRepository().create(roomPlaylist, callback);
    }

    desactivateAllRoomByRoomTemplate(roomTemplate: RoomTemplate, callback: (error: any, result: any) => void) {
        this.roomRepository.setInactiveByRoomTemplateId(roomTemplate.id, callback);
    }
}

Object.seal(RoomBusiness);
export = RoomBusiness;