import axios from "axios";


// const USER_API_BASE_URL = "http://192.168.75.1:8000/api/data/users";
const USER_API_BASE_URL = "http://localhost:9000/api/data/users";
// const headers = { 
//     "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ2VudCB6IiwiaWF0IjoxNjczNDI1MTM4LCJleHAiOjE2NzM1MTE1Mzh9.ZMrjf_IyaksQUTI57vdm7QzBZnn_DmQ9vS_NJkcza2rTAuYyC2qbRVNhsVQbrczRGFzgULY5eIJTG2S96gol9A"
// };
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PUT"
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = "Content-Type, Authorization"


class UserService{

    getUser(){
        return axios.get(USER_API_BASE_URL);
    }
    
}

export default new UserService();
