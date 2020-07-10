import { prisma } from "../../../generated/prisma-client";

export default {
    Tag: {
        posts: ({ id }) => prisma.tag({ id }).posts(),
        postsCount: ({ id }) =>
            prisma
                .postsConnection({ where: { tags_some: { id } } })
                .aggregate()
                .count(),
    }
};