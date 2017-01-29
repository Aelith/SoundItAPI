/**
 * Created by Lakio on 16/01/2017.
 */

import BaseBusiness = require("./interfaces/BaseBusiness");
import {Tag} from "../model/postgres/Tag";
import TagRepository = require("../repository/postgres/TagRepository");


class TagBusiness extends BaseBusiness<Tag> {

    private _tagRepository: TagRepository;

    constructor () {
        super(Tag);
        this._tagRepository = new TagRepository();
    }

    create (item: Tag, callback: (error: any, result: any) => void) {
        this._tagRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._tagRepository.retrieve(callback);
    }

    update (_item: Tag, callback: (error: any, result: any) => void) {

        this._tagRepository.findById(_item.id, (err, res) => {
            if(err)
                callback(err, res);

            else {
                this._tagRepository.update(_item, callback);
            }
        });
    }

    delete(item: Tag, callback: (error: any, result: any) => void){
        super.delete(item,callback);
    }

    findById (_id: number, callback: (error: any, result: Tag) => void) {
        this._tagRepository.findById(_id, callback);
    }

    findByLabel (_label: string, callback: (error: any, result: Tag) => void) {
        this._tagRepository.findByLabel(_label, callback);
    }
}


Object.seal(TagBusiness);
export = TagBusiness;