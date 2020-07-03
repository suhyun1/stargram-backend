import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFollowing: async (_, args) => {
            const { username } = args;
            return prisma
                .user({ username })
                .following();
        }
    }
};