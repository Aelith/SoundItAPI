/**
 * Created by Lakio on 21/01/2017.
 */

import RoomSettingsRepository = require("../repository/postgres/RoomSettingsRepository");
import BaseBusiness = require("./interfaces/BaseBusiness");
import {RoomSettings} from "../model/postgres/RoomSettings";

class RoomSettingsBusiness extends BaseBusiness<RoomSettings> {

    private roomSettingsRepository: RoomSettingsRepository;

    constructor () {
        super(RoomSettings);
        this.roomSettingsRepository = new RoomSettingsRepository();
    }

}

Object.seal(RoomSettingsBusiness );
export = RoomSettingsBusiness ;