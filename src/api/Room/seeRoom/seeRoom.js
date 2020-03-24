import { prisma } from "../../../../generated/prisma-client";

export default{
    Query: {
        seeRoom: async(_, args, {request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id } = args;    //room id
            const {user} = request;
            const isMember = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            });
            if (isMember){
                return prisma.room({id});
            }else{
                throw Error("You can't see this");
            }
        }
    }
}