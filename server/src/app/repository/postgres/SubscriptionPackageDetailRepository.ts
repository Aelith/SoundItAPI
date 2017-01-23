/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {SubscriptionPackageDetail} from "../../model/postgres/SubscriptionPackageDetail";


class SubscriptionPackageRepository extends BaseRepository<SubscriptionPackageDetail> {

    constructor() {
        super(SubscriptionPackageDetail);
    }

}

export = SubscriptionPackageRepository;