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

## Directory Structure

```
SoundItAPI
    ├── node_modules
    ├── server
    │    ├── src
    │    │    ├── app
    │    │    │    ├── business                    <= business logic for application
    │    │    │    │    ├── common
    │    │    │    │    │    ├── Read.ts           <= common Read method
    │    │    │    │    │    ├── Write.ts          <= common Write method
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    │    │    ├── BaseBusiness.ts
    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    ├── dataAccess
    │    │    │    │    ├── schemas
    │    │    │    │    │    ├── HeroSchema.ts    <= Hero Schema for MongoDB
    │    │    │    │    ├── DataAccess.ts         <= Connection with MongoDB
    │    │    │    ├── model
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── HeroModel.ts
    │    │    │    │    ├── HeroModel.ts
    │    │    │    ├── repository
    │    │    │    │    ├── common
    │    │    │    │    │    ├── Read.ts           <= common Read method
    │    │    │    │    │    ├── Write.ts  
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── BaseRepository.ts
    │    │    │    │    ├── HeroRepository.ts
    │    │    ├── config
    │    │    │    ├── constants
    │    │    │    │    ├── constants.ts         <= Constants - mongodb connection string.
    │    │    │    ├── routes
    │    │    │    │    ├── HeroRoutes.ts        <= Hero API Routes like get,post,put,delete
    │    │    │    │    ├── Routes.ts            <= fetching all appliction routes here
    │    │    ├── controller
    │    │    │    ├── interfaces
    │    │    │    │    ├── ReadController.ts
    │    │    │    │    ├── WriteController.ts
    │    │    │    ├── BaseController.ts         <= Base Repository controller
    │    │    │    ├── HeroController.ts
    │    │    ├── server.ts
    │    ├── typings
    │    ├── tsconfig.json
    │    ├── tsconfig.json
    ├── gulpfile.ts                              <= gulp tasks : clean, build, compile, run.
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    
```

## License

MIT