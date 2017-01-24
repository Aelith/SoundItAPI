/**
 * Created by soundit on 16/01/2017.
 */

import express = require("express");
import logger = require("./../tools/Logger");

import PlaylistSongRepository = require("./../app/repository/postgres/PlaylistSongRepository");
import PlaylistRepository = require("./../app/repository/postgres/PlaylistRepository");
import {PlaylistSong}  from "./../app/model/postgres/PlaylistSong";


class TestController
{
    retrieve(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistRepository = new PlaylistRepository();
            BR.retrieve((error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("retrieve error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    retrieveHydrated(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistRepository = new PlaylistRepository();
            BR.retrieveHydrated((error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("retrieve error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    findByIds(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistSongRepository = new PlaylistSongRepository();
            var id1 = req.params._id1;
            var id2 = req.params._id2;
            BR.findByIds(id1, id2, (error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("findById error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    findHydratedByIds(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistSongRepository = new PlaylistSongRepository();
            var id1 = req.params._id1;
            var id2 = req.params._id2;
            BR.findHydratedByIds(id1, id2, (error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("findById error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    findById1(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistRepository = new PlaylistRepository();
            var id = req.params._id;
            BR.findById(id, (error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("findById error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    findHydratedById1(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistRepository = new PlaylistRepository();
            var id = req.params._id;
            BR.findHydratedById(id, (error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("findById error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }



    findById2(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistRepository = new PlaylistRepository();
            var id = req.params._id;
            BR.findByUserId(id, (error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("findById error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

    findHydratedById2(req: express.Request, res: express.Response): void
    {
        try {
            let BR : PlaylistRepository = new PlaylistRepository();
            var id = req.params._id;
            BR.findCustomHydratedByUserId(id, [PlaylistRepository.eProperty.Songs, PlaylistRepository.eProperty.PlaylistType],(error, result) => {
                if(error)
                {
                    logger.error("retrieve error", {"error": error});
                    res.send(error);
                }
                else
                {
                    res.send(result);
                }
            });
        }
        catch (e)  {
            logger.error("findById error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }


    create(req: express.Request, res: express.Response): void {
        try {

            var addr: PlaylistSong = <PlaylistSong>req.body;
            let BR : PlaylistSongRepository = new PlaylistSongRepository();
            BR.create(addr, (error, result) => {
                if(error)
                {
                    logger.warn("Create error", {"error": error}, addr);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(201).send({"result": "Created", "data": result});
            });
        }
        catch (e)  {
            logger.error("create error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }


    update(req: express.Request, res: express.Response): void {
        try {
            var addr: PlaylistSong = <PlaylistSong>req.body;
            let BR : PlaylistSongRepository = new PlaylistSongRepository();
            BR.update(addr, (error, result) => {
                if(error)
                {
                    logger.warn("Update error", {"error": error}, addr);
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Updated", "data": result});
            });
        }
        catch (e)  {
            logger.error("update error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }


    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: number = req.params._id;
            let BR : PlaylistSongRepository = new PlaylistSongRepository();
            BR.deleteById(_id, (error, result) => {
                if(error)
                {
                    logger.warn("Delete error", {"error": error});
                    res.status(400).send({"result": "Bad Request"});
                }
                else
                    res.status(200).send({"result": "Deleted", "data": result});
            });
        }
        catch (e)  {
            logger.error("delete error", {"error": e});
            res.status(400).send({"result": "Bad Request"});

        }
    }

}
export = TestController;