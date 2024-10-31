import axios from "axios";

class ApiController {

    async Signup(name: string, password: string) {

        try {

            const res = await axios.post('http://3.138.136.255/webchat/signup', {
                name: name,
                password: password
            });
            
            return res;

        } catch (error) {
            
           return error
            
        }

    }

    async Signin(name: string, password: string) {

        try {

            const res = await axios.post('http://3.138.136.255/webchat/signin', {
                name: name,
                password: password
            });
            
            return res
            
        } catch (error) {
            return error
        }
    }

    async getMessages (id: string) {

        try {

            const res = await axios.get(`http://3.138.136.255/webchat/messages/${id}`);
            
            return res
            
        } catch (error) {
            return error
        }
    }

    async getUsers (id: string) {

        try {
            
            const res = await axios.get(`http://3.138.136.255/webchat/users/${id}`);
            
            return res

            
        } catch (error) {
            return error
        }
    }

    async getMessageChat(MyId: string, UserId: string) {
        
        try {

           const res = await axios.post('http://3.138.136.255/webchat/chat', {
            from: MyId,
            receive: UserId
           })

           return res
            
        } catch (error) {
            return error
        }
    }

    async createMessage (from: string, receive: string, data: string) {

        try {

            const res = await axios.post('http://3.138.136.255/webchat/new', {
              from: from,
              receive: receive,
              data: data
            });
            
            return res
            
        } catch (error) {
            return error
        }

    }

}

export const ApiControll = new ApiController();