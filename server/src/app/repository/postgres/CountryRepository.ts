/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Country} from "../../model/postgres/Country";


class CountryRepository extends BaseRepository<Country> {

    constructor() {
        super(Country);
    }

}

export = CountryRepository;