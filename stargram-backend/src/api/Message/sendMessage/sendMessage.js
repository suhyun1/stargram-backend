import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default{
    Mutation: {
        sendMessage: async(_, args, {request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if (roomId === undefined){   //roomid가 없으면 새로 만들기
                if (user.id !== toId ){    //보내는 사람이 자기 자신이 아닐때 room생성
                    room = await prisma.createRoom({
                        participants: {
                            connect: [
                                { id: toId },   //받는사람
                                { id: user.id } //보내는 사람(나)
                            ]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            }else { //roomId 존재하면
                room = await prisma.room({id: roomId}).$fragment(ROOM_FRAGMENT);
            }

            if (!room) {
                throw Error("Room not found");
            }
            
            const getTo = room.participants.filter(participant => participant.id !== user.id)[0];
            const newMessage = await prisma.createMessage({
                text: message,
                from: {
                    connect: {id: user.id}
                }, 
                to:{
                    connect: {
                        id: roomId ? getTo.id: toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
            return newMessage;
        }
    }
};