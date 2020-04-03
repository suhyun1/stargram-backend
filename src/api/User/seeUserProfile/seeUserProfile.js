import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUserProfile: async(_, args) => {
            const { username } = args;
            return prisma.user({ username });
        }
    }
};