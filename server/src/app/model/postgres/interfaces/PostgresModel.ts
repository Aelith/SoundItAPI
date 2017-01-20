/**
 * Created by soundit on 17/01/2017.
 */

import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


interface PostgresModel {

    createTime: Date;
    updateTime: Date;
    deleted: boolean;
}

export = PostgresModel;