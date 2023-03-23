<template>
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada', serif;">
        <div class="container mt-md-5 col-md-7 p-5">
            <h2 class = "text-start" style="border-bottom: 3px solid #BABABA">Modify Customer Payment Profile</h2>
            <!-- {{ this.customer.customer.mobile}} -->
            <div class="row mt-md-5 ">
                <div class="col text-start">
                    <div class="ID p-2 col-4 rounded-2">
                        <p class="fw-semibold">CIF ID</p>
                        <p>{{this.customer.customer.id  }}</p>
                    </div><br>
                    <div>
                        <p class="fw-semibold">Instruction Processing</p>
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="instruction" v-on:click="Instruction"  id="flexRadioDefault1" :checked="this.radioInstruction=='BATCH'" style="cursor: pointer;">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Bacth Basic
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="instruction" id="flexRadioDefault2" v-on:click="Instruction" :checked="this.radioInstruction=='TXN'" style="cursor: pointer;">
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Transaction Basic
                                </label>
                            </div>
                        </div>
                    </div><br>
                    <div>
                        <p class="fw-semibold">WHT Returned Credit A/c</p>
                        <div class="bg-light col-6 p-1 rounded-3" style="color: #BABABA;">disable</div>
                    </div>
                </div>

                <div class="col text-start">
                    <div>
                        <p class="fw-semibold">VIP Customer</p>
                        <!-- <div v-if="!this.customer.customer.vip"> -->
                        <div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="vip" id="flexRadioDefault1" v-on:click="changeVip" :checked=this.radio style="cursor: pointer;">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="vip" id="flexRadioDefault2" v-on:click="changeVip" :checked=!this.radio style="cursor: pointer;">
                                <label class="form-check-label" for="flexRadioDefault2">
                                    No
                                </label>
                            </div>
                        </div>
                    </div><br>
                    <div>
                        <p class="fw-semibold">Subsidiary Code</p>
                        <div class="bg-light col-6 p-1 rounded-3" style="color: #BABABA;">disable</div>
                    </div><br>
                    <div>
                        <p class="fw-semibold">Float Sharing Credit A/c</p>
                        <div class="bg-light col-6 p-1 rounded-3" style="color: #BABABA;">disable</div>
                    </div><br>
                </div>
            </div><br>
            
        </div>



        <!-- Fee Details -->
        <div class="container col-md-7 p-4 mb-3 rounded-5 bg-light" >
            <h5 class = "text-start fw-semibold">Fee Details</h5>
                <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#7D7D7D ;">
                    <div class="col fs-6 ps-md-5">
                        Fee Group ID
                    </div>
                    <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                        Debit A/c.
                    </div>
                    <div class="col-1 text-center" style="border-left: 3px solid #FFFFFF"></div>
                </div>
                <div v-if="feeDatails.length">
                    <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow"  v-for="fee in feeDatails" v-bind:key="fee">
                        <div class="col fs-6 ps-md-5" >
                            {{fee.chargeGroup.name}}
                        </div>
                        <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                            {{ fee.account.id }}
                        </div>
                        <div class="col-1 text-center " style="border-left: 3px solid #BABABA">
                            <!-- <a><i class="fa fa-regular fa-pen-to-square fa-xl" style="cursor: pointer; "></i></a> -->
                            <a @click="deleteFeeDetail(fee.id)"><i class='fa far fa-trash-alt fa-xl' style="cursor: pointer;"></i></a>
                        </div>
                    </div>
                </div>
                <div v-else class="row my-md-2 bg-white py-md-3 rounded-4 text-center shadow p-4">
                    <h6>There are no recodes to display.</h6>
                </div>
                <div class="text-end mt-3">
                    <button v-on:click="showAdd" class="btn btn-primary">Add Recode</button>
                </div>
            <!-- </div> -->
                <div v-if="this.show">
                    <h6 class = "text-start">Fee Details #1</h6>
                    <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#7D7D7D ;">
                        <div class="col fs-6 ps-md-5">
                            Fee Group ID
                        </div>
                        <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                            Debit A/c.
                        </div>
                    </div>
                    <div>
                        <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow">
                            <div class="col fs-6 ps-md-5" >
                                <input class="col-8" type="text" :value=this.groupSelect disabled/>
                                <!-- <select class="form-select" name="group" id="" v-model="fee.chargeGroup"> 
                                    <option v-for="g in group" v-bind:key="g" :value=g.id >{{ g.name +" - "+g.description }}</option>
                                </select> -->
                                <a @click="getGroup()"><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                <!-- <select class="form-select" name="group" id="" v-model="fee.account" > 
                                    <option v-for="a in acc" v-bind:key="a" :value=a.id >{{ a.id }}</option>
                                </select> -->
                                <input class="col-8" type="text" :value=this.accSelect disabled/>
                                <a @click="getAcc()"><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                            </div>
                            <div class="text-end mt-3">
                                <button v-on:click="saveFeedatails" class="btn" style="background-color: #6271D3; color: #fff;">done</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="this.showGroup">
                    <h6 class = "mt-4 text-start fw-semibold">Charge Group ID List</h6>
                    <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#7D7D7D ;">
                        <div class="col-1"></div>
                        <div class="col fs-6 ps-md-5">
                            Charge Code.
                        </div>
                        <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                            Charge Desc.
                        </div>
                    </div>
                        <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow"  v-for="g in group" v-bind:key="g">
                            <div class="col-1 text-center" >
                                <!-- <a @click="getGroup"><i class='fa fas fa-angle-down' style="cursor: pointer;"></i></a> -->
                                <button v-on:click="getGroup(g.name,g.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                    <i class='fa fas fa-angle-down' style="cursor: pointer;"></i>
                                </button>
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{g.name}}
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{ g.description }}
                            </div>
                        </div>
                </div>


                <div v-if="this.showAccount">
                    <h6 class = "mt-4 text-start fw-semibold">A/cs List</h6>
                    <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#7D7D7D ;">
                        <div class="col-1"></div>
                        <div class="col fs-6 ps-md-5">
                            A/C Id.
                        </div>
                        <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                            CIF ID.
                        </div>
                    </div>
                    <!-- <div v-if="feeDatails.length"> -->
                        <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="a in acc" v-bind:key="a">
                            <div class="col-1 text-center" >
                                <!-- <a @click="getGroup"><i class='fa fas fa-angle-down' style="cursor: pointer;"></i></a> -->
                                <button v-on:click="getAcc(a.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                    <i class='fa fas fa-angle-down' style="cursor: pointer;"></i>
                                </button>
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{a.id}}
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{ a.customer.id }}
                            </div>
                        </div>
                    <!-- </div> -->
                </div>
        </div><br>


        <!-- Billing -->
        <div class="container col-md-7 p-4 mb-3 rounded-5 bg-light" >
            <h5 class = "text-start fw-semibold" style="border-bottom: 2px solid #BABABA">Billing of Monthly Fee</h5>
            <div class="row text-start">
                <div class="col">
                    <div class="col">
                        <h6>Fee Collection Period</h6>
                        <!-- {{this.billingMonth  }} -->
                        <select class="form-select" name="feeperiod" id=""  v-on:change="onChangeMonthFeeperiod($event)" v-model="billingMonth.feePeriod" >
                            <option disabled value="">Please select</option>
                            <option v-for="p in periodMonth" v-bind:key="p" v-bind:value="p.id">{{ p.name }}</option>
                        </select>
                    </div><br>
                    <div class="col">
                        <h6>Start Month</h6>
                        <select class="form-select" name="year" id=""  v-on:change="onChangeMonth($event)" v-model="billingMonth.startMonth" >
                            <option disabled value="">Please select</option>
                            <option v-for="m in month" v-bind:key="m" v-bind:value="m.name">{{m.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <h6>Recurring Date</h6>
                    <div v-if="billingMonth.startMonth == ''">
                            <select class="form-select" disabled>
                                <option>Please select month</option>
                            </select>
                    </div>
                    <div v-else>
                        <select class="form-select" name="year" id=""  v-on:change="onChangeMonthDate($event)" v-model="billingMonth.recurringDate" >
                            <option disabled value="">Please select</option>
                            <option v-for="d in day" v-bind:key="d" v-bind:value="d">{{d}}</option>
                        </select>
                    </div>
                    
                </div>
            </div><br>


            <h5 class = "text-start fw-semibold" style="border-bottom: 2px solid #BABABA">Billing of Transaction Fee</h5>
            <div class="row text-start">
                <div class="col">
                    <div class="col">
                        <h6>Fee Collection Period</h6>
                        <select class="form-select" name="feeperiod" id=""  v-on:change="onChangeTxnFeeperiod($event)" v-model="billingTxn.feePeriod" >
                            <option disabled value="">Please select</option>
                            <option v-for="p in periodTxn" v-bind:key="p" v-bind:value="p.id">{{ p.name }}</option>
                        </select>
                    </div><br>
                    <div class="col">
                        <h6>Start Month</h6>
                        <div v-if="billingTxn.feePeriod == 1 || billingTxn.feePeriod == 2">
                            <select class="form-select" disabled>
                                <option> </option>
                            </select>
                        </div>
                        <div v-else>
                            <select class="form-select" name="year" id=""  v-on:change="onChangeTxnMonth($event)" v-model="billingTxn.startMonth" >
                                <option disabled value="">Please select</option>
                                <option v-for="m in month" v-bind:key="m" v-bind:value="m.name">{{m.name}}</option>
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div class="col">
                    <h6>Recurring Date</h6>
                    <div v-if="billingTxn.feePeriod == 1 || billingTxn.feePeriod == 2">
                        <select class="form-select" disabled>
                            <option> </option>
                        </select>
                    </div>
                    <div v-else>
                        <div v-if="billingTxn.startMonth == ''">
                            <select class="form-select" disabled>
                                <option>Please select month</option>
                            </select>
                        </div>
                        <div v-else>
                            <select class="form-select" name="year" id=""  v-on:change="onChangeTxnDate($event)" v-model="billingTxn.recurringDate" >
                                <option disabled value="">Please select</option>
                                <option v-for="d in day" v-bind:key="d" v-bind:value="d">{{d}}</option>
                            </select>
                        </div>
                    </div>
                    
                    
                </div>
            </div><br>


            <h5 class = "text-start fw-semibold" style="border-bottom: 2px solid #BABABA">Billing of Yearly Fee</h5>
            <!-- <div class="text-start" v-for="bill in this.billing.billingResponses" v-bind:key="bill"> -->
                <!-- {{ this.billing.billingResponses[0].name }} -->
                <div class="row text-start">
                    <div class="col">
                        <div class="col">
                            <h6>Yearly Fee Collection</h6>
                            <select class="form-select" name="feeperiod" id=""  v-on:change="onChangeYearFeeperiod($event)" v-model="billingYear.feePeriod" >
                                <option disabled value="">Please select</option>
                                <option v-for="p in periodYear" v-bind:key="p" v-bind:value="p.id">{{ p.name }}</option>
                            </select>
                        </div><br>
                        <div class="col">
                            <h6>Start Year</h6>
                            <!-- {{ bill.startYear }} -->
                            <select class="form-select" name="year" id=""  v-on:change="onChangeYear($event)" v-model="billingYear.startYear" >
                                <option disabled value="">Please select</option>
                                <option v-for="y in year" v-bind:key="y" v-bind:value="y.id">{{y.id }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="col">
                            <h6>Recurring Date</h6>
                            <div v-if="billingYear.startMonth == ''">
                                <select class="form-select" disabled>
                                    <option>Please select month</option>
                                </select>
                            </div>
                            <div v-else>
                                <select class="form-select" name="year" id=""  v-on:change="onChangeYearDate($event)" v-model="billingYear.recurringDate" >
                                    <option disabled value="">Please select</option>
                                    <option v-for="d in day" v-bind:key="d" v-bind:value="d">{{d}}</option>
                                </select>
                            </div>
                            
                        </div><br>
                        <div class="col">
                            <h6>Recurring Month</h6>
                            <select class="form-select" name="year" id=""  v-on:change="onChangeYearMonth($event)" v-model="billingYear.startMonth" >
                                <option disabled value="">Please select</option>
                                <option v-for="m in month" v-bind:key="m" v-bind:value="m.name">{{m.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                
            <!-- </div> -->
            <br>


        </div><br>
        <div class="container col-md-7 pb-sm-5 mb-3">
            <div class="row">
                <div class="col-8"></div>
                <div class="col row text-end">
                    <div class="col">
                        <button class="btn btn-danger" v-on:click="cancel">cancel</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-success" v-on:click="save">submit</button>
                    </div>
                </div>
                
            </div>
            
        </div>
        
    </div>
</template>
<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import DataService from '@/service/DataService'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
    name : 'modifyCus',
    data(){
        return{
            customer:[],
            feeDatails:[],
            group:[],
            showGroup:null,
            accountAll:[],
            acc:[],
            showAccount:null,
            radio:'',
            radioInstruction:'',
            show:null,
            fee:{
                chargeGroup:'',
                account:''
            },
            groupSelect:'',
            accSelect:'',
            billing:'',
            period:'',
            periodMonth:[],
            periodTxn:[],
            periodYear:[],
            ID_billingYear:'',
            billingYear:{
                name:'Y',
                recurringDate:'',
                startMonth:'',
                startYear:'',
                feePeriod:'',
                customer : this.$route.params.id
            },
            ID_billingMonth:'',
            billingMonth:{
                name:'M',
                recurringDate:'',
                startMonth:'',
                feePeriod:'',
                customer : this.$route.params.id
            },
            ID_billingTxn:'',
            billingTxn:{
                name:'T',
                recurringDate:'',
                startMonth:'',
                feePeriod:'',
                customer : this.$route.params.id
            },
            year:[
                {id : '2017'},
                {id : '2018'},
                {id : '2019'},
                {id : '2020'},
                {id : '2021'},
                {id : '2022'},
                {id : '2023'},
                {id : '2024'},
            ],
            month:[
                {name:'Jan'},
                {name:'Feb'},
                {name:'Mar'},
                {name:'Apr'},
                {name:'May'},
                {name:'Jun'},
                {name:'Jul'},
                {name:'Aug'},
                {name:'Sep'},
                {name:'Oct'},
                {name:'Nov'},
                {name:'Dec'},
            ],
            day:''
        }
    },
    methods:{
        callLogin(){
            if(this.$cookies.get('token') == null){
                this.$router.push({ path: '/login' })
            }
        },
        getAuto(){
            DataService.getCustomerId(this.$route.params.id ).then((res)=>{
                this.customer = res.data;
                this.radio = this.customer.customer.vip
                this.radioInstruction = this.customer.customer.instruction
                // console.log("inst --> "+this.radioInstruction)
                // console.log(res.data);
            }),
            DataService.getAccount().then((res)=>{
                this.accountAll = res.data;
                this.accountAll.forEach(element => {
                    // console.log(element)
                    if(element.customer.id == this.$route.params.id){
                        this.acc.push(element);
                    }
                });
                // console.log("test")
                // console.log(this.acc)
            }),
            DataService.getFeeDetailByCustomer(this.$route.params.id).then((res)=>{
                this.feeDatails = res.data;
                // console.log(res.data)
            }).catch(err =>{
                console.log(err)
            }),
            DataService.getChargeGroup().then((res)=>{
                this.group = res.data;
            }),
            DataService.getAllBillByCustomer(this.$route.params.id).then((res) =>{
                this.billing = res.data;
                this.billing.billingResponses.forEach(element => {
                    if(element.name == 'Billing of Yearly Fee'){
                        console.log(element)
                        this.ID_billingYear = element.id
                        console.log("ID_billingYear -- >"+this.ID_billingYear)
                        this.billingYear.feePeriod = element.feePeriod.id
                        this.billingYear.recurringDate = element.recurringDate
                        this.billingYear.startMonth = element.startMonth
                        this.billingYear.startYear = element.startYear
                        if(this.billingYear.startMonth == 'Jan' || this.billingYear.startMonth =='Mar' || this.billingYear.startMonth =='May' || this.billingYear.startMonth =='Jul' || this.billingYear.startMonth =='Aug' || this.billingYear.startMonth =='Oct' || this.billingYear.startMonth =='Dec'){
                            this.day = 31
                        }
                        else if(this.billingYear.startMonth == 'Apr' || this.billingYear.startMonth =='Jun' || this.billingYear.startMonth =='Sep' || this.billingYear.startMonth =='Nov'){
                            this.day = 30
                        }
                        else{
                            this.day = 28
                        }
                        // this.billingYear.customer = this.$route.params.id

                    }
                    else if(element.name == 'Billing of Monthly Fee'){
                        console.log(element)
                        this.ID_billingMonth = element.id
                        console.log("ID_billingMonth -- >"+this.ID_billingMonth)
                        this.billingMonth.feePeriod = element.feePeriod.id
                        this.billingMonth.recurringDate = element.recurringDate
                        this.billingMonth.startMonth = element.startMonth
                        if(this.billingMonth.startMonth == 'Jan' || this.billingMonth.startMonth =='Mar' || this.billingMonth.startMonth =='May' || this.billingMonth.startMonth =='Jul' || this.billingMonth.startMonth =='Aug' || this.billingMonth.startMonth =='Oct' || this.billingMonth.startMonth =='Dec'){
                            this.day = 31
                        }
                        else if(this.billingMonth.startMonth == 'Apr' || this.billingMonth.startMonth =='Jun' || this.billingMonth.startMonth =='Sep' || this.billingMonth.startMonth =='Nov'){
                            this.day = 30
                        }
                        else{
                            this.day = 28
                        }
                        // this.billingMonth.customer = this.$route.params.id

                    }
                    else if(element.name == 'Billing of Transaction Fee'){
                        console.log(element)
                        this.ID_billingTxn = element.id
                        console.log("ID_billingTxn -- >"+this.ID_billingTxn)
                        this.billingTxn.feePeriod = element.feePeriod.id
                        this.billingTxn.recurringDate = element.recurringDate
                        this.billingTxn.startMonth = element.startMonth
                        if(this.billingTxn.startMonth == 'Jan' || this.billingTxn.startMonth =='Mar' || this.billingTxn.startMonth =='May' || this.billingTxn.startMonth =='Jul' || this.billingTxn.startMonth =='Aug' || this.billingTxn.startMonth =='Oct' || this.billingTxn.startMonth =='Dec'){
                            this.day = 31
                        }
                        else if(this.billingTxn.startMonth == 'Apr' || this.billingTxn.startMonth =='Jun' || this.billingTxn.startMonth =='Sep' || this.billingTxn.startMonth =='Nov'){
                            this.day = 30
                        }
                        else{
                            this.day = 28
                        }
                        // this.billingTxn.customer = this.$route.params.id

                    }
                    

                });
                // console.log(res.data);
            }),
            DataService.getFeePeriod().then((res) =>{
                this.period = res.data

                this.period.forEach(element => {
                    if(element.id == 6){
                        this.periodMonth.push(element)
                        this.periodTxn.push(element)
                        this.periodYear.push(element)
                    }
                    else if(element.id == 3 || element.id == 4 || element.id == 5){
                        this.periodMonth.push(element)
                        this.periodTxn.push(element)
                    }
                    else if(element.id == 1|| element.id == 2){
                        this.periodTxn.push(element)
                    }
                    else if(element.id == 7|| element.id == 8){
                        this.periodYear.push(element)
                    }
                    
                });
                // console.log("period")
                // console.log(res.data)
            })
        },
        changeVip(){
            console.log("vip 1 --> "+this.radio )
            this.radio = !this.radio
            console.log("vip 2 --> "+this.radio )
        },
        Instruction(){
            console.log("Instruc 1 --> " + this.radioInstruction)
            if(this.radioInstruction == 'TXN'){
                this.radioInstruction = 'BATCH'
            }
            else{
                this.radioInstruction = 'TXN'
            }
            console.log("Instruc 2 --> " + this.radioInstruction)
        },
        save(){

            //bill txn
            console.log(this.billingTxn)
            if(this.ID_billingTxn){
                DataService.updateBilling(this.ID_billingTxn,this.billingTxn).then(()=>{
                    this.ID_billingTxn ='',
                    this.billingTxn = {
                        name:'T',
                        recurringDate:'',
                        startMonth:'',
                        feePeriod:'',
                        customer : this.$route.params.id
                    }
                })
                .catch(err=>{
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    console.log(err);
                })
            }
            else{
                console.log("POst")
                DataService.newBilling(this.billingTxn).then(()=>{
                    this.ID_billingTxn ='',
                    this.billingTxn = {
                        name:'T',
                        recurringDate:'',
                        startMonth:'',
                        feePeriod:'',
                        customer : this.$route.params.id
                    }
                })
                .catch(err =>{
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    console.log(err);
                })
            }
            
            

            //bill month
            if(this.ID_billingMonth){
                console.log("Put")
                DataService.updateBilling(this.ID_billingMonth,this.billingMonth).then(()=>{
                    this.ID_billingMonth = '',
                    this.billingMonth = {
                        name:'M',
                        recurringDate:'',
                        startMonth:'',
                        feePeriod:'',
                        customer : this.$route.params.id
                    }
                })
                .catch(err=>{
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    console.log(err);
                })
            }
            else{
                console.log("POst")
                DataService.newBilling(this.billingMonth).then(()=>{
                    this.ID_billingMonth = '',
                    this.billingMonth = {
                        name:'M',
                        recurringDate:'',
                        startMonth:'',
                        feePeriod:'',
                        customer : this.$route.params.id
                    }
                })
                .catch(err =>{
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    console.log(err);
                })
            }
            

            //bill year
            if(this.ID_billingYear){
                DataService.updateBilling(this.ID_billingYear,this.billingYear).then(()=>{
                    this.ID_billingYear='',
                    this.billingYear={
                        name:'Y',
                        recurringDate:'',
                        startMonth:'',
                        startYear:'',
                        feePeriod:'',
                        customer : this.$route.params.id
                    }
                })
                .catch(err=>{
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    console.log(err);
                })
            }
            else{
                console.log("POst")
                DataService.newBilling(this.billingYear).then(()=>{
                    this.ID_billingYear='',
                    this.billingYear={
                        name:'Y',
                        recurringDate:'',
                        startMonth:'',
                        startYear:'',
                        feePeriod:'',
                        customer : this.$route.params.id
                    }
                })
                .catch(err =>{
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    console.log(err);
                })
            }
            
            

            //update customer
            DataService.updateCustomer(this.$route.params.id,{vip:this.radio,instruction:this.radioInstruction}).then(()=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Update Success!...',
                }).then((result) => {
                    this.$router.go(0) 
                })
            })
            .catch(err =>{
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
                console.log(err);
            })
        },
        cancel(){
            Swal.fire({
                title: 'cancel?',
                // text:'you want to delete?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#FF8C8C',
                cancelButtonColor:'#74F380',
                cancelButtonText:'No'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.$router
                    .push({ path: '/customerProfile' })
                    .then(() => { this.$router.go(0) })
                } 
            })
        },
        showAdd(){
            this.show = 'TEST'
        },
        deleteFeeDetail : function(id){
            Swal.fire({
                title: 'delete?',
                // text:'you want to delete?',
                showCancelButton: true,
                confirmButtonText: 'delete',
                confirmButtonColor: '#FF8C8C',
                cancelButtonColor:'#74F380'
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('delete!', 'Successfully...', 'success').then(() =>{
                        DataService.deleteFeeDetail(id).then(()=>{
                            this.$router.go(0)
                        }).catch(err => {
                            console.log(err)
                        })
                })
                } 
            })
        },
        saveFeedatails(){
            DataService.newFeeDetail(this.fee).then(()=>{
                this.$router.go(0)
            }).catch(err =>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
                console.log(err);
            })
        },
        getGroup : function(name,id){
           this.showGroup = !this.showGroup
           console.log("id --> "+id)
           this.groupSelect = name
           this.fee.chargeGroup = id
        },
        getAcc : function(id){
            this.showAccount = !this.showAccount
            this.accSelect = id
            this.fee.account = id
        },

        // Yearly billing
        onChangeYearFeeperiod : function(e){
            this.billingYear.feePeriod = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id year period',this.billingYear.feePeriod );
            console.log('name year period',name );
        },
        onChangeYear : function(e){
            this.billingYear.startYear = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id year',this.billingYear.startYear );
            console.log('name year',name );
        },
        onChangeYearMonth : function(e){
            this.billingYear.startMonth = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id month',this.billingYear.startMonth );
            console.log('name month',name );

            if(name == 'Jan' || name =='Mar' || name =='May' || name =='Jul' || name =='Aug' || name =='Oct' || name =='Dec'){
                this.day = 31
            }
            else if(name == 'Apr' || name =='Jun' || name =='Sep' || name =='Nov'){
                this.day = 30
            }
            else{
                this.day = 28
            }
        },
        onChangeYearDate : function(e){
            this.billingYear.recurringDate = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id date',this.billingYear.recurringDate );
            console.log('name date',name );
        },

        // Monthly billing
        onChangeMonthFeeperiod : function(e){
            this.billingMonth.feePeriod = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id year period',this.billingMonth.feePeriod );
            console.log('name year period',name );
        },
        onChangeMonth : function(e){
            this.billingMonth.startMonth = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id month',this.billingMonth.startMonth );
            console.log('name month',name );
            if(name == 'Jan' || name =='Mar' || name =='May' || name =='Jul' || name =='Aug' || name =='Oct' || name =='Dec'){
                this.day = 31
            }
            else if(name == 'Apr' || name =='Jun' || name =='Sep' || name =='Nov'){
                this.day = 30
            }
            else{
                this.day = 28
            }
        },
        onChangeMonthDate : function(e){
            this.billingMonth.recurringDate = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id date',this.billingMonth.recurringDate );
            console.log('name date',name );
        },

        // transaction billing
        onChangeTxnFeeperiod : function(e){
            this.billingTxn.feePeriod = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id year period',this.billingTxn.feePeriod );
            console.log('name year period',name );
        },
        onChangeTxnMonth : function(e){
            this.billingTxn.startMonth = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id month',this.billingTxn.startMonth );
            console.log('name month',name );
            if(name == 'Jan' || name =='Mar' || name =='May' || name =='Jul' || name =='Aug' || name =='Oct' || name =='Dec'){
                this.day = 31
            }
            else if(name == 'Apr' || name =='Jun' || name =='Sep' || name =='Nov'){
                this.day = 30
            }
            else{
                this.day = 28
            }
        },
        onChangeTxnDate : function(e){
            this.billingTxn.recurringDate = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('id date',this.billingTxn.recurringDate );
            console.log('name date',name );
        }
    },
    created(){
        this.callLogin();
        this.getAuto();
        
    }
}
</script>

<style scoped>
.ID{
    background-color: #FFF5A9;
}

.form-select{
    width: 70%;
}

</style>

