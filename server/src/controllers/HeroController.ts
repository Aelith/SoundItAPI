// /**
//  * Created by Moiz.Kachwala on 15-06-2016.
//  */
//
// import express = require("express");
// import HeroBusiness = require("./../app/business/HeroBusiness");
// import IBaseController = require("./interfaces/BaseController");
// import IHeroModel = require("../app/model/mongo/interfaces/HeroModel");
// import logger = require("./../tools/Logger");
//
//
// class HeroController implements IBaseController <HeroBusiness> {
//
//     create(req: express.Request, res: express.Response): void {
//         try {
//
//             var hero: IHeroModel = <IHeroModel>req.body;
//             var heroBusiness = new HeroBusiness();
//             heroBusiness.create(hero, (error, result) => {
//                 if(error)
//                 {
//                     logger.warn("Create : error", {"error": error}, hero);
//                     res.status(400).send({"result": "Bad Request"});
//                 }
//                 else
//                     res.status(201).send({"result": "Created", "data": result});
//             });
//         }
//         catch (e)  {
//             logger.error("create : error", {"error": e});
//             res.status(400).send({"result": "Bad Request"});
//
//         }
//     }
//     update(req: express.Request, res: express.Response): void {
//         try {
//             var hero: IHeroModel = <IHeroModel>req.body;
//             var _id: string = req.params._id;
//             var heroBusiness = new HeroBusiness();
//             heroBusiness.update(_id, hero, (error, result) => {
//                 if(error)
//                 {
//                     logger.warn("Update : error", {"error": error}, hero);
//                     res.status(400).send({"result": "Bad Request"});
//                 }
//                 else
//                     res.status(200).send({"result": "Updated", "data": result});
//             });
//         }
//         catch (e)  {
//             logger.error("update : error", {"error": e});
//             res.status(400).send({"result": "Bad Request"});
//
//         }
//     }
//     delete(req: express.Request, res: express.Response): void {
//         try {
//
//             var _id: string = req.params._id;
//             var heroBusiness = new HeroBusiness();
//             heroBusiness.delete(_id, (error, result) => {
//                 if(error)
//                 {
//                     logger.warn("Delete : error", {"error": error});
//                     res.status(400).send({"result": "Bad Request"});
//                 }
//                 else
//                     res.status(200).send({"result": "Deleted", "data": result});
//             });
//         }
//         catch (e)  {
//             logger.error("delete : error", {"error": e});
//             res.status(400).send({"result": "Bad Request"});
//
//         }
//     }
//     retrieve(req: express.Request, res: express.Response): void {
//         try {
//
//             var heroBusiness = new HeroBusiness();
//             heroBusiness.retrieve((error, result) => {
//                 if(error)
//                 {
//                     logger.warn("Retrieve : error", {"error": error});
//                     res.status(400).send({"result": "Bad Request"});
//                 }
//                 else res.send(result);
//             });
//         }
//         catch (e)  {
//             logger.error("retrieve : error", {"error": e});
//             res.status(400).send({"result": "Bad Request"});
//
//         }
//     }
//     findById(req: express.Request, res: express.Response): void {
//         try {
//
//             var _id: string = req.params._id;
//             var heroBusiness = new HeroBusiness();
//             heroBusiness.findById(_id, (error, result) => {
//                 if(error)
//                 {
//                     logger.warn("findById : error", {"error": error});
//                     res.status(400).send({"result": "Bad Request"});
//                 }
//                 else res.send(result);
//             });
//         }
//         catch (e)  {
//             logger.error("findById : error", {"error": e});
//             res.status(400).send({"result": "Bad Request"});
//
//         }
//     }
// }
// export = HeroController;