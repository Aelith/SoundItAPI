/**
 * Created by soundit on 16/01/2017.
 */

import express = require("express");
import HeroBusiness = require("./../app/business/HeroBusiness");
import logger = require("./../tools/Logger");

import AddressRepository = require("./../app/repository/postgres/AddressRepository");
import {Address}  from "./../app/model/postgres/Address";


class TestController
{
    retrieve(req: express.Request, res: express.Response): void
    {
        try {
            let BR : AddressRepository = new AddressRepository();
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

    findById(req: express.Request, res: express.Response): void
    {
        try {
            let BR : AddressRepository = new AddressRepository();
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

    create(req: express.Request, res: express.Response): void {
        try {

            var addr: Address = <Address>req.body;
            let BR : AddressRepository = new AddressRepository();
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
            var addr: Address = <Address>req.body;
            let BR : AddressRepository = new AddressRepository();
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
            let BR : AddressRepository = new AddressRepository();
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