import "./env";

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport";
import {authenticateJwt} from "./passport";
import { isAuthenticated } from "./middleware"

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema, 
    context: ({ request }) => ({request, isAuthenticated})
});    
//context는 resolver들 사이에서 정보를 공유할 때 사용

server.express.use(logger("dev"));
server.express.use(authenticateJwt);    //모든 request는 이 함수 통과

server.start({port:PORT}, ()=>
    console.log(`Server running on http://localhost:${PORT}`)
);
