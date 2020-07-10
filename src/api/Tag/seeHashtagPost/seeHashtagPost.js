import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeHashtagPost: async (_, args) => {
        const { tag } = args;
        return prisma.tag({name: tag});
    }
  }
};
