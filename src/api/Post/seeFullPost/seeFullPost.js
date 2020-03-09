import { prisma } from "../../../../generated/prisma-client";

export default {

    Query:{
        seeFullPost: async(_,args)=> {
            const {id} = args;
            // return await prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
            return await prisma.post({id});
            
        }
    }
};