/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

import IReadController = require("../common/ReadController");
import IWriteController = require("../common/WriteController");
import IBaseBusiness = require("../../app/business/interfaces/BaseBusiness");
interface BaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController{


}
export = BaseController;