import {prisma} from "../../../../generated/prisma-client"
export default{
    Query:{
        sayHello: async() => {
            console.log(await prisma.users());
            //이렇게 접근하면 endpoint보호할 수 있음
            //사용자 -> 서버에 요청 하면 서버 -> prisma에 요청
            return "hello";
        }
    }
};