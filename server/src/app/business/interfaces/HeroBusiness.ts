// /**
//  * Created by Moiz.Kachwala on 15-06-2016.
//  */
//
// import BaseBusiness = require("./BaseBusiness");
// import IHeroModel = require("../../model/mongo/interfaces/HeroModel");
//
// interface HeroBusiness<T> {
//     create: (item: T, callback: (error: any, result: any ) => void) => void;
//     update:(_id: string, item: T, callback: (error: any, result: any)=> void) => void ;
//     delete: (_id: string, callback: (error: any, result: any) => void) => void;
//     retrieve: (callback: (error: any, result: T)=> void)=> void ;
//     findById: (_id: string, callback: (error:any, result: T) => void) => void;
// }
// export = HeroBusiness;