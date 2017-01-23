/**
 * Created by soundit on 17/01/2017.
 */


import BaseRepository = require("./BaseRepository");
import {Tag} from "../../model/postgres/Tag";


class TagRepository extends BaseRepository<Tag> {

    constructor() {
        super(Tag);
    }

}

export = TagRepository;