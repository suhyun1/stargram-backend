import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_,args) => {
            const {email, secret} = args;
            const user = await prisma.user({email});

            if (user.loginSecret === secret){
                //한번 확인하고 지움
                await prisma.updateUser({
                    where: {id: user.id}, 
                    data:{
                        loginSecret:''
                    }
                });
                return  generateToken(user.id);
            }else{
                throw Error("wrong email/secret combination");
            }
        }
    }
}