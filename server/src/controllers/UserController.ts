/**
 * Created by Lakio on 16/01/2017.
 */

import express = require("express");
import UserBusiness = require("./../app/business/UserBusiness");
import IBaseController = require("./interfaces/BaseController");
import logger = require("./../tools/Logger");
import jwt = require('jsonwebtoken');
import Constants = require("../config/constants/constants");
import {LoginManager} from "../tools/LoginManager";


class UserController implements IBaseController <UserBusiness> {

    constructor(){

    }

    //Show user detail
    findById(req: express.Request, res: express.Response): void {
        try
        {
            var _id: number = req.params._userId;

            new UserBusiness().findById(_id, (error, result) => {
            //var result = new UserBusiness().findById(_id, result);// => {
                if(error)
                {
                    logger.warn("findById : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    // var jsonObject = {};
                    //
                    // jsonObject['request id'] = _id;
                    // jsonObject['id'] = result.id;
                    // jsonObject['login'] = result.login;
                    // jsonObject['email'] = result.email;
                    // jsonObject['firstName'] = result.firstName;
                    // jsonObject['lastName'] = result.lastName;
                    // jsonObject['phoneNumber'] = result.phoneNumber;
                    // jsonObject['cellphoneNumber'] = result.cellphoneNumber;
                    //
                    //res.json(JSON.stringify(jsonObject));
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("findById : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try
        {
            // new UserBusiness().retrieve((error, result) => {
            //     if(error)
            //     {
            //         logger.warn("retrieve : error", {"error": error});
            //         res.status(400).send({"result": "Bad Request"});
            //     }
            //     else
            //     {
            //         // var jsonObject = {};
            //         //
            //         // jsonObject['id'] = result.id;
            //         // jsonObject['login'] = result.login;
            //         // jsonObject['email'] = result.email;
            //         // jsonObject['firstName'] = result.firstName;
            //         // jsonObject['lastName'] = result.lastName;
            //         // jsonObject['phoneNumber'] = result.phoneNumber;
            //         // jsonObject['cellphoneNumber'] = result.cellphoneNumber;
            //         //
            //         // res.json(JSON.stringify(jsonObject));
            //         res.json(JSON.stringify(result));
            //     }
            // });
        }
        catch (e)  {
            logger.error("retrieve : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show user detail edition view
    getEditionView(req: express.Request, res: express.Response): void {
        try
        {
            this.findById(req,res);
        }
        catch (e)  {
            logger.error("getEditionView : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show user application settings edition view
    getUserSettingsEditionView(req: express.Request, res: express.Response): void {
        try
        {
            var _id: string = req.params._userId;

            new UserBusiness().getUserSettings(_id, (error, result) => {
                //var result = userBusiness.findById(_id, result);// => {
                if(error)
                {
                    logger.warn("getUserSettingsEditionView : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                {
                    res.json(JSON.stringify(result));
                }
            });
        }
        catch (e)  {
            logger.error("getUserSettingsEditionView : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Show saved playlist creation view
    getSavedPlaylistCreationView(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Show friend creation view
    getFriendCreationView(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Show friend message view
    getFriendMessageCreationView(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Show subscribed event view
    getSubscribeEventCreationView(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Show user creation view
    getCreationView(req: express.Request, res: express.Response): void {
        //TODO

    }


    login(req: express.Request, res: express.Response): void {
    //TODO

        new UserBusiness().findByLogin(req.body.login, (error, result) => {

            if(error)
            {
                logger.warn("login : error login unknown", {"error": error});
                res.status(400).send({"result": "User unknown"});
            }
            else
            {
                if (req.body.login == result[0].login && req.body.password == result[0].password) {

                    var token = LoginManager.getToken(req);

                    if (token != null) {
                        res.send({"token": token});
                    }
                    else {
                        res.status(400).send({"result": "Bad Request or wrong login/password"});
                    }
                }
                else
                {
                    logger.warn("login : error bad password", {"error": error});
                    res.status(400).send({"result": "Bad Request or wrong password"});
                }
            }
        });
    }

    //Create a user
    create(req: express.Request, res: express.Response): void {
        //TODO
        try {

            new UserBusiness().create(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("create : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Created", "data": result});
            });
        }
        catch(e) {
            logger.warn("create : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});
        }
    }

    //Add room to favorite
    addRoomToFavorite(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Save a playlist
    savePlaylist(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Add a friend
    addFriend(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Send message to friend
    sendMessage(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Subscribe event
    subscribeToEvent(req: express.Request, res: express.Response): void {
        //TODO

    }


    //Update an user
    update(req: express.Request, res: express.Response): void {
        //TODO
        try {

            new UserBusiness().update(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("update : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Updated", "data": result});
            });
        }
        catch (e)  {
            logger.error("update : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    //Save user settings
    updateAppSettings(req: express.Request, res: express.Response): void {
        //TODO

    }

    delete(req: express.Request, res: express.Response): void {
        try {

            new UserBusiness().delete(JSON.parse(req.body), (error, result) => {
                if (error) {
                    logger.warn("delete : error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Deleted", "data": result});
            });
        }
        catch (e)  {
            logger.error("delete : error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    //Delete an event
    deleteFriend(req: express.Request, res: express.Response): void {
        //TODO

    }

    //Delete an event subscription
    deleteEventSubscription(req: express.Request, res: express.Response): void {
        //TODO

    }

}
export = UserController;