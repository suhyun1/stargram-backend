import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFollower: async (_, args) => {
            const { username } = args;
            return prisma
                .user({ username })
                .followers();
        }
    }
};