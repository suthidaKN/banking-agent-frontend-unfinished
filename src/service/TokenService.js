import axios from "axios"
import VueCookies from 'vue-cookies';

const TOKEN_API_BASE_URL = "http://localhost:9000/api/auth/signin";
axios.defaults.headers.common['Authorization'] = "Bearer "+ VueCookies.get('token')

class TokenService{

    createToken(body){

        return axios.post(TOKEN_API_BASE_URL,body);
 
    }
}

export default new TokenService();