import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        toggleLike: async(_, args, {request}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
              AND: [
                {
                  user: {
                    id: user.id
                  }
                },
                {
                  post: {
                    id: postId
                  }
                }
              ]
            };
            try {
                const existingLike = await prisma.$exists.like(filterOptions);
                //like없으면 like 생성, 있으면 삭제
                if (existingLike) {
                    //내가 한 좋아요를 찾아 삭제
                    await prisma.deleteManyLikes(filterOptions);
                } else {
                    //좋아요
                    await prisma.createLike({
                    user: {
                        connect: {
                        id: user.id
                        }
                    },
                    post: {
                        connect: {
                        id: postId
                        }
                    }
                    });
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
};