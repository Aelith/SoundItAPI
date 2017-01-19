/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import UserController = require("./../../controllers/UserController");

var router = express.Router();
class UserRoutes {
    private _userController: UserController;

    constructor () {
        this._userController = new UserController();
    }
    get routes () {
        var controller = this._userController;

        //Show user detail
        router.get("/user/:_userId", controller.findById);
        //Show user detail edition view
        router.get("/user/:_userId/edit", controller.getEditionView);
        //Show user application settings edition view
        router.get("/userSettings/:_userId/edit", controller.getUserSettingsEditionView);
        //Show saved playlist creation view
        router.get("/user/:_userId/savedPlaylist/create", controller.getSavedPlaylistCreationView);
        //Show friend creation view
        router.get("/user/:_userId/friend/create", controller.getFriendCreationView);
        //Show friend message view
        router.get("/user/:_userId/friend/:_friendId/message/create", controller.getFriendMessageCreationView);
        //Show subscribed event view
        router.get("/user/:_userId/subscribedEvent/create", controller.getSubscribeEventCreationView);
        //Show user creation view
        router.get("/user/create", controller.getCreationView);

        //Add room to favorite
        router.post("/user/:_userId/favoriteRoom/:_roomId", controller.addRoomToFavorite);
        //Save a playlist
        router.post("/user/:_userId/savedPlaylist", controller.savePlaylist);
        //Add a friend
        router.post("/user/:_userId/friend", controller.addFriend);
        //Send message to friend
        router.post("/user/:_userId/friend/:_friendId/message", controller.sendMessage);
        //Subscribe event
        router.post("/user/:_userId/subscribedEvent", controller.subscribeToEvent);
        //Create a user
        router.post("/user", controller.create);

        //Update an user
        router.put("/user/:_userId", controller.update);
        //Save user settings
        router.put("/userSettings/:_userId", controller.updateAppSettings);

        //Delete an event
        router.delete("/user/:_userId/friend/:_friendId", controller.deleteFriend);
        //Delete an event subscription
        router.delete("/user/:_userId/subscribedEvent/:_eventId", controller.deleteEventSubscription);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;