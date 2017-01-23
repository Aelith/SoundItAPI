/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Tax} from "../../model/postgres/Tax";


class TaxRepository extends BaseRepository<Tax> {

    constructor() {
        super(Tax);
    }

}

export = TaxRepository;