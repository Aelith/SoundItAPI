/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */
import express = require('express');
import path = require('path');

import HeroRoutes = require('../routes/HeroRoutes');
import UserRoutes = require("./UserRoutes");
import StatisticRoutes = require("./StatisticRoutes");
import RoomSettingsRoutes = require("./RoomSettingsRoutes");
import PlaylistRoutes = require("./PlaylistRoutes");
import DashboardRoutes = require("./DashboardRoutes");
import EventRoutes = require("./EventRoutes");
import RoomRoutes = require("./RoomRoutes");
import RoomUserRightRoutes = require("./RoomUserRightRoutes");

var app = express();

class Routes {

    get routes() {

        app.use("/", new HeroRoutes().routes);
        app.use("/", new UserRoutes().routes);
        app.use("/", new PlaylistRoutes().routes);
        app.use("/", new DashboardRoutes().routes);
        app.use("/", new EventRoutes().routes);
        app.use("/", new RoomRoutes().routes);
        app.use("/", new RoomSettingsRoutes().routes);
        app.use("/", new RoomUserRightRoutes().routes);
        app.use("/", new StatisticRoutes().routes);

        return app;
    }
}
export = Routes;