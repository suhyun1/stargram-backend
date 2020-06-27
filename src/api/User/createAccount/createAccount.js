import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const {username, email, firstName ="", lastName="", bio=""} = args;
            const existName = await prisma.$exists.user({username});
            if (existName) {
              throw Error("This username is already taken");
            }
            const existEmail = await prisma.$exists.user({ email });
            if (existEmail) {
              throw Error("This email is already taken");
            }
            await prisma.createUser({
              username,
              email,
              firstName,
              lastName,
              bio
            });
            return true;
    
        }
    }
};