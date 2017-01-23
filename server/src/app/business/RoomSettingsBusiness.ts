/**
 * Created by Lakio on 21/01/2017.
 */
import RoomTemplateRepository = require("../repository/postgres/RoomTemplateRepository");
import BaseBusiness = require("./interfaces/BaseBusiness");
import {RoomTemplate} from "../model/postgres/RoomTemplate";

class RoomTemplateBusiness extends BaseBusiness<RoomTemplate> {

    private roomSettingsRepository: RoomTemplateRepository;

    constructor () {
        super(RoomTemplate);
        this.roomSettingsRepository = new RoomTemplateRepository();
    }

}

Object.seal(RoomTemplateBusiness );
export = RoomTemplateBusiness ;