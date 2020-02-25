// require("dotenv").config();
import path from "path";
import dotenv from "dotenv";
dotenv.config({path: path.resolve(__dirname, ".env")});

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));
// server.express.use(passport.authenticate("jwt"));

server.start({port:PORT}, ()=>
    console.log(`Server running on http://localhost:${PORT}`)
);
