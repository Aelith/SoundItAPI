/**
 * Created by Lakio on 15-01-2017.
 */

import IReadController = require("../common/ReadController");
import IWriteController = require("../common/WriteController");
import IBaseBusiness = require("../../app/business/interfaces/BaseBusiness");
import PostgresModel = require("../../app/model/postgres/interfaces/PostgresModel");
import BaseBusiness = require("../../app/business/interfaces/BaseBusiness");

interface BaseController<T> extends IReadController, IWriteController{

}
export = BaseController;