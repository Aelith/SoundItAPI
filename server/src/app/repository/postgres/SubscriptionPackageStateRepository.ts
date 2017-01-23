/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {SubscriptionPackageState} from "../../model/postgres/SubscriptionPackageState";


class SubscriptionPackageStateRepository extends BaseRepository<SubscriptionPackageState> {

    constructor() {
        super(SubscriptionPackageState);
    }

}

export = SubscriptionPackageStateRepository;