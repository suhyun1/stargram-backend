import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation :{
        upload: async(_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, files, location, tags } = args;
            const post = await prisma.createPost({
                caption,
                location,
                user: {
                    connect: {id: user.id}
                }
            });
            files.forEach(
                async file => 
                    await prisma.createFile({
                        url: file,
                        post: {
                            connect: {
                                id: post.id
                            }
                        }
                    })
            );
            tags.forEach(
                async tag => {
                    const exist = await prisma.$exists.tag({ name : tag });
                    if(exist){  //기존에 생성된 태그
                        await prisma.updateTag({
                            where: { name: tag },
                            data: {
                                posts: {
                                    connect: {
                                        id: post.id
                                    }
                                }
                            }
                        });
                    }else{
                        await prisma.createTag({
                            name: tag,
                            posts: {
                                connect: {
                                    id: post.id
                                }
                            }
                        })
                    }
                }
            );
          
            return post;
        }
    }
};