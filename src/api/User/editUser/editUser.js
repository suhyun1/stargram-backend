import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editUser: async(_,args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { username, email, firstName, lastName, bio, avatar} = args;
            const {user} = request;
            const exists = await prisma.$exists.user({ username });
            if (exists) {
              throw Error("This username is already taken");
            }
            return prisma.updateUser({
                where: {id: user.id},
                data: {username, email,firstName, lastName, bio, avatar}
            });
        }
    }
};