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
    │    │    │    ├── bin                             
    │    │    │    │    ├── www                        <= HTTP server creation
    │    │    │    ├── business                        <= business logic for application
    │    │    │    │    ├── common
    │    │    │    │    │    ├── Read.ts               <= common Read method
    │    │    │    │    │    ├── Write.ts              <= common Write method
    │    │    │    │    ├── interfaces                 <= interfaces for businesses
    │    │    │    │    │    ├── HeroBusiness.ts       
    │    │    │    │    │    ├── BaseBusiness.ts
    │    │    │    │    ├── HeroBusiness.ts
    │    │    │    ├── dataAccess
    │    │    │    │    ├── mongo    
    │    │    │    │    │    ├── schemas               <= Schemas for MongoDB
    │    │    │    │    │    │    ├── HeroSchema.ts    
    │    │    │    │    │    ├── DataAccessMongo.ts    <= Connection with MongoDB
    │    │    │    │    ├── postgres  
    │    │    │    │    │    ├── DataAccessPostgres.ts <= Connection with PostgreSQL
    │    │    │    ├── model                           <= Database's objects representation 
    │    │    │    │    ├── mongo  
    │    │    │    │    │    ├── interfaces            
    │    │    │    │    │    │    ├── HeroModel.ts
    │    │    │    │    │    ├── HeroModel.ts
    │    │    │    │    ├── postgres        
    │    │    │    ├── repository                       <= Operations with databases
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
    │    │    ├── server.ts                             <= Server configuration
    │    ├── tsconfig.json
    │    ├── tsconfig.json
    ├── gulpfile.ts                                     <= gulp tasks : clean, build, compile, run.
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    
```

## Architecture explanation
### Server configuration and initialisation
```
    /bin/wwww
    /server.ts
```
www file allow HTTP server creation, using and object "app" configured in the file server.ts.
If any configuration must be changed, middleware added or anything, 
do not modify www file, but server.ts

### Routes
```
    /config/routes/*.ts
```
The method "getRoutes()" from class "Route" (file "Route.ts") must contains all routes used in the API.
To add multiple related routes, it is preferred to create classes with a method "getRoutes()", 
implementing new routes, and then use it in "Route.getRoutes()".

### Controllers
```
    /controllers/interfaces/*
    /controllers/*
```
Each public method of controllers' classes are linked to a route. They act like a "main" for the route they are linked.
They mostly use business's classes and methods, and eventually tools' ones (e.g. parsing request's inputs ...).

### Business
```
    /app/business/common/*
    /app/business/interfaces/*
    /app/business/*
```
This is all classes related to business logic, meaning they are the most important part of the application.

### Data Access Layer
##### Repositories
```
    /app/repository/mongo/interfaces/*
    /app/repository/mongo/*
    /app/repository/postgres/interfaces/*
    /app/repository/postgres/*
```
Repositories classes are the entry point to interact with databases. They contains methods to retrieve, 
insert, update or delete data from databases. They are responsible for verifying the proper execution of requests,
and take appropriate measures according to results (transactions for multiple dependents request ...).

##### Model
```
    /app/model/mongo/interfaces/*
    /app/model/mongo/*
    /app/model/postgres/interfaces/*
    /app/model/postgres/*
```
Classes representing databases' objects.

##### DataAccess
```
    /app/dataAccess/mongo/schemas/*
    /app/dataAccess/mongo/*
    /app/dataAccess/postgres/*
```
Classes that manage database connections.

Mongoose for MongoDB use schemas, stored in "schemas" subdirectory.

### Tools
```
    /tools/*
```
This packages contains all transverse classes that can be useful anywhere, like string parsing for example. 

### Constants
```
    /config/constants/constants.ts
```
This class contains constants as attributes.


## Important notes
Take care to not use synchronous functions, since NodeJS is mono-thread, this could badly affect performances.

## License

MIT