# SoundIt API

## Global packages
```
    npm install ts-node -g
    npm install typescript-node -g
```

## Steps to Run
```sh
    npm install          <= install all the npm Dependencies
    npm run build        <= build and compile the dest folder
    npm run deploy       <= start the Nodemon and watch for changes.
```

## Add new module dependency
```
    npm install mon-module --save
    npm install @types/mon-module --save
```

## Directory Structure

```
SoundItAPI
    ├── node_modules
    ├── server
    │    ├── src
    │    │    ├── app
    │    │    │    ├── business                        <= business logic for application
    │    │    │    │    ├── common
    │    │    │    │    │    ├── Read.ts               <= common Read method
    │    │    │    │    │    ├── Write.ts              <= common Write method
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    │    │    ├── BaseBusiness.ts
    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    ├── dataAccess
    │    │    │    │    ├── mongo    
    │    │    │    │    │    ├── schemas
    │    │    │    │    │    │    ├── HeroSchema.ts    <= Hero Schema for MongoDB
    │    │    │    │    │    ├── DataAccessMongo.ts    <= Connection with MongoDB
    │    │    │    │    ├── postgres     
    │    │    │    ├── model
    │    │    │    │    ├── mongo  
    │    │    │    │    │    ├── interfaces
    │    │    │    │    │    │    ├── HeroModel.ts
    │    │    │    │    │    ├── HeroModel.ts
    │    │    │    │    ├── postgres        
    │    │    │    ├── repository
    │    │    │    │    ├── mongo  
    │    │    │    │    │    ├── interfaces
    │    │    │    │    │    │    ├── Read.ts           <= common Read method
    │    │    │    │    │    │    ├── Write.ts          <= common Write method
    │    │    │    │    │    ├── BaseRepository.ts
    │    │    │    │    │    ├── HeroRepository.ts
    │    │    │    │    ├── postgres
    │    │    ├── config
    │    │    │    ├── constants
    │    │    │    │    ├── constants.ts                <= Constants - mongodb connection string.
    │    │    │    ├── routes
    │    │    │    │    ├── HeroRoutes.ts               <= Hero API Routes like get,post,put,delete
    │    │    │    │    ├── Routes.ts                   <= fetching all appliction routes here
    │    │    ├── controllers
    │    │    │    ├── interfaces
    │    │    │    │    ├── ReadController.ts
    │    │    │    │    ├── WriteController.ts
    │    │    │    ├── BaseController.ts                <= Base Repository controller
    │    │    │    ├── HeroController.ts
    │    │    ├── tools
    │    │    │    ├── logger.ts
    │    │    ├── server.ts
    │    ├── typings
    │    ├── tsconfig.json
    │    ├── tsconfig.json
    ├── gulpfile.ts                                     <= gulp tasks : clean, build, compile, run.
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    
```

## License

MIT