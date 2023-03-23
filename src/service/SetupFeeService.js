import axios from "axios";


// const FEE_API_BASE_URL = "http://192.168.75.1:8000";
const FEE_API_BASE_URL = "http://localhost:9000";

class SetupFeeService{

    /**
     * Get All 
     */
    getAll(){
        return axios.get(FEE_API_BASE_URL+"/feeAll")
    }

    /**
     * Yearly Fee
     */

    newYearlyFee(body){
        return axios.post(FEE_API_BASE_URL+"/YEARF",body)
    }
    getYearlyFee(id){
        return axios.get(FEE_API_BASE_URL+"/YEARF/"+id)
    }
    updateYearFee(id,body){
        return axios.put(FEE_API_BASE_URL+"/YEARF/"+id,body)
    }
    deleteYearFee(id){
        return axios.delete(FEE_API_BASE_URL+"/YEARF/"+id)
    }

    /**
     * Transaction Fee
     */

    newTransactionFee(body){
        return axios.post(FEE_API_BASE_URL+"/TRNFE",body)
    }
    getTransactionFee(id){
        return axios.get(FEE_API_BASE_URL+"/TRNFE/"+id)
    }
    updateTransactionFee(id,body){
        return axios.put(FEE_API_BASE_URL+"/TRNFE/"+id,body)
    }
    deleteTransactionFee(id){
        return axios.delete(FEE_API_BASE_URL+"/TRNFE/"+id)
    }

    /**
     * Monthly Fee
     */

    newMonthlyFee(body){
        return axios.post(FEE_API_BASE_URL+"/MONFE",body)
    }
    getMonthlyFee(id){
        return axios.get(FEE_API_BASE_URL+"/MONFE/"+id)
    }
    updateMonthlyFee(id,body){
        return axios.put(FEE_API_BASE_URL+"/MONFE/"+id,body)
    }
    deleteMonthlyFee(id){
        return axios.delete(FEE_API_BASE_URL+"/MONFE/"+id)
    }

    /**
     * Batch Fee
     */

    newBatchFee(body){
        return axios.post(FEE_API_BASE_URL+"/BATFE",body)
    }
    getBatchFee(id){
        return axios.get(FEE_API_BASE_URL+"/BATFE/"+id)
    }
    updateBatchFee(id,body){
        return axios.put(FEE_API_BASE_URL+"/BATFE/"+id,body)
    }
    deleteBatchFee(id){
        return axios.delete(FEE_API_BASE_URL+"/BATFE/"+id)
    }

    /**
     * Penalty Fee
     */

    newPenaltyFee(body){
        return axios.post(FEE_API_BASE_URL+"/PNLFE",body)
    }
    getPenaltyFee(id){
        return axios.get(FEE_API_BASE_URL+"/PNLFE/"+id)
    }
    updatePenaltyFee(id,body){
        return axios.put(FEE_API_BASE_URL+"/PNLFE/"+id,body)
    }
    deletePenaltyFee(id){
        return axios.delete(FEE_API_BASE_URL+"/PNLFE/"+id)
    }

    
    /**
     * One off Fee
     */

    newOneFee(body){
        return axios.post(FEE_API_BASE_URL+"/ONEFE",body)
    }
    getOneFee(id){
        return axios.get(FEE_API_BASE_URL+"/ONEFE/"+id)
    }
    updateOneFee(id,body){
        return axios.put(FEE_API_BASE_URL+"/ONEFE/"+id,body)
    }
    deleteOneFee(id){
        return axios.delete(FEE_API_BASE_URL+"/ONEFE/"+id)
    }
}

export default new SetupFeeService();