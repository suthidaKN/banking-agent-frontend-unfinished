import axios from "axios";

const TXN_API_BASE_URL = "http://localhost:9001/transaction";

class TransactionService{

    getTransaction(){
        return axios.get(TXN_API_BASE_URL);
    }
}

export default new TransactionService();