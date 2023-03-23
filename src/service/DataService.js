import axios from "axios";


// const DATA_API_BASE_URL = "http://192.168.75.1:8000/api/data";
const DATA_API_BASE_URL = "http://localhost:9000/api/data";


class DataService{

    /**
     * Delete Charge Collection
     */

    deleteCollection(id){
        return axios.delete(DATA_API_BASE_URL+'/collection/'+id)
    }

    /**
     * transaction Type data
     */

    getType(){
        return axios.get(DATA_API_BASE_URL+'/type')
    }

    /**
     * transaction Charge Type data
     */

    getChargeType(){
        return axios.get(DATA_API_BASE_URL+'/chargeType')
    }

    /**
     * Rule data
     */

    getRule(){
        return axios.get(DATA_API_BASE_URL+'/typeRule')
    }

    /**
     * account data
     */
    getAccount(){
        return axios.get(DATA_API_BASE_URL+'/account')
    }
    getAccountId(id){
        return axios.get(DATA_API_BASE_URL+'/account/'+id)
    }

    /**
     * charge part event 
     */
    getChargePartEvent(){
        return axios.get(DATA_API_BASE_URL+'/chargePartEvent')
    }
    getChargePartEventId(id){
        return axios.get(DATA_API_BASE_URL+'/chargePartEvent/'+id)
    }
    getChargePartEventIdFromEvent(id){
        return axios.get(DATA_API_BASE_URL+'/chargePartEventFromEvent/'+id)
    }
    getPartEvent(id,body){
        return axios.post(DATA_API_BASE_URL+'/partEvent/'+id,body)
    }

    /**
     * charge event
     */
    getChargeEvent(){
        return axios.get(DATA_API_BASE_URL+'/chargeEvent')
    }
    getChargeEventId(id){
        return axios.get(DATA_API_BASE_URL+'/chargeEvent/'+id)
    }
    getchargeEventByGroupId(id){
        return axios.get(DATA_API_BASE_URL+'/chargeEventByGroupId/'+id)
    }

    /**
     * charge group
     */
    getChargeGroup(){
        return axios.get(DATA_API_BASE_URL+'/chargeGroup')
    }
    getChargeGroupId(id){
        return axios.get(DATA_API_BASE_URL+'/chargeGroup/'+id)
    }

    /**
     * charge level
     */
    getChargeLevel(){
        return axios.get(DATA_API_BASE_URL+'/chargeLevel')
    }
    getChargeLevelId(id){
        return axios.get(DATA_API_BASE_URL+'/chargeLevel/'+id)
    }

    /**
     * customer
     */
    getCustomerId(id){
        return axios.get(DATA_API_BASE_URL+'/customer/'+id)
    }
    updateCustomer(id,cusBody){
        return axios.put(DATA_API_BASE_URL+'/customer/'+id,cusBody)
    }
    getAllCustomer(){
        return axios.get(DATA_API_BASE_URL+'/customer')
    }
     // eslint-disable-next-line 
    /* eslint-disable */
     /**
     * product
     */
    getProduct(){
        return axios.get(DATA_API_BASE_URL+'/product')
    }
    getProductId(id){
        return axios.get(DATA_API_BASE_URL+'/product/'+id)
    }

   
     /**
     * Fee Period
     */
     getFeePeriod(){
        return axios.get(DATA_API_BASE_URL+'/feePeriod')
    }
    getFeePeriodId(id){
        return axios.get(DATA_API_BASE_URL+'/feePeriod/'+id)
    }

    /**
     * Fee detail in profile page
     */

    newFeeDetail(body){
        return axios.post(DATA_API_BASE_URL+"/feeDetail",body)
    }
    getFeeDetailByCustomer(id){
        return axios.get(DATA_API_BASE_URL+"/feeDetail/"+id)
    }
    updateFeeDetail(id,body){
        return axios.put(DATA_API_BASE_URL+"/feeDetail/"+id,body)
    }
    deleteFeeDetail(id){
        return axios.delete(DATA_API_BASE_URL+"/feeDetail/"+id)
    }

    /**
     * Fee detail in profile page
     */

    newBilling(body){
        return axios.post(DATA_API_BASE_URL+"/billing",body)
    }
    getAllBillByCustomer(id){
        return axios.get(DATA_API_BASE_URL+"/billing/"+id)
    }
    getAllBillByCustomerAndType(id,type){
        return axios.get(DATA_API_BASE_URL+"/billing/"+id+"/"+type)
    }
    updateBilling(id,body){
        return axios.put(DATA_API_BASE_URL+"/billing/"+id,body)
    }
}

export default new DataService();