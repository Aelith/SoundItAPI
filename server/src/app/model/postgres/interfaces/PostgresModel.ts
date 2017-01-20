/**
 * Created by soundit on 17/01/2017.
 */

abstract class PostgresModel {

    createTime: Date;
    updateTime: Date;
    deleted: boolean;

    static getTableName() : string {
        return this.name;
    }

    constructor() {
    }
}

export = PostgresModel;