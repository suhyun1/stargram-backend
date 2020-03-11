import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import { Strategy, ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
};
const verifyUser = async(payload, done) => {
    try {
        const user = await prisma.user({id: payload.id});
        if(user !== null){
            return done(null, user);
        }else{
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
};

//토큰 받아서 해석하고, 사용자를 찾아 존재하면 req객체 추가하고 graphql함수 실행
export const authenticateJwt = (req, res, next) => 
    passport.authenticate("jwt", {session: false}, (error, user)=>{
        if(user){
            req.user = user;
        }
        next();
})(req,res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();