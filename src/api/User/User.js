import { prisma } from "../../../generated/prisma-client";

//computed field (prisma에 없으면 자신의 서버에서 찾음)
export default{
    User: {
        posts: ({id}) => prisma.user({id}).posts(),
        following: ({id}) => prisma.user({id}).following(),
        followers: ({id}) => prisma.user({id}).followers(),
        likes: ({id}) => prisma.user({id}).likes(),
        comments: ({id}) => prisma.user({id}).comments(),
        rooms: ({id}) => prisma.user({id}).rooms(),
        postsCount : ({id}) => 
            prisma
                .postsConnection({where: {user: {id}}})
                .aggregate()
                .count(),
        followingCount: ({id}) =>
            prisma
                .usersConnection({ where: { followers_some: { id } } })
                .aggregate()
                .count(),
        followersCount: ({ id }) =>
            prisma
                .usersConnection({ where: { following_none: { id } } })
                .aggregate()
                .count(),
        fullName: (parent) => { //parent는 나를 call한 resolver의 부모.
            // 여기서는 me에서 return한 user정보
            return `${parent.firstName} ${parent.lastName}`;
        },

        isFollowing: async(parent, _, {request}) => {
            const {user} = request;
            const { id: parentId } = parent; //내가(접속한 사용자가) 팔로우했는지 알고자 하는 사용자 
            try {
                return prisma.$exists.user({
                    AND: [
                        { id: parentId },
                        { 
                            followers_some: {
                                id: user.id
                            }
                        }
                    ]
                });
                
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, {request}) => {
            const {user} = request;
            const {id: parentId} = parent;
            return user.id === parentId;
        }
    }

    
};