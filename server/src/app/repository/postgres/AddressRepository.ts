/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Address} from "../../model/postgres/Address";


class AddressRepository extends BaseRepository<Address> {

    constructor() {
        super(Address);
    }

}

export = AddressRepository;