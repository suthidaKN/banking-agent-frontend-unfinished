<template>
    <Sidebar/>
    <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada' ,serif;">
        <div class = "container col-md-10 p-5 bg-light my-md-5 rounded-5">
            <h2 class = "text-start mb-sm-4"> Custom Charge Collection List</h2>
            <div class="col text-end my-md-4">
                <button v-on:click="addNew()" class="btn btn-warning rounded-5 text-white fs-6" style="font-family: 'Tilt Neon', cursive;">Add new row</button>
            </div>
            <!-- <div class="input-container row">
                <input type="text" placeholder="Search..." v-model="authorNameSearchString" />
            </div> -->
            <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-white" style="background-color:#033495 ;">
                <div class="col-1 text-center" style="font-size: 13px;">
                    Actions
                </div>
                <div class="col  text-center" style="border-left: 2px solid #FFFFFF;">
                    Ref. No.
                </div>
                <div class="col text-center" style="border-left: 2px solid #FFFFFF;">
                    Product ID
                </div>
                <div class="col text-center" style="border-left: 2px solid #FFFFFF;">
                    Customer ID
                </div>
                <div class="col text-center" style="border-left: 2px solid #FFFFFF;">
                    Group ID
                </div>
                <div class="col text-center" style="border-left: 2px solid #FFFFFF;">
                    Event ID
                </div>
                <div class="col text-center" style="border-left: 2px solid #FFFFFF;">
                    Account No.
                </div>
                <div class="col text-center" style="border-left: 2px solid #FFFFFF;">
                    Date
                </div>
                
            </div>
            <div class="row bg-white my-md-1 pt-md-3 rounded-4 text-start shadow" v-for="fee in list"  v-bind:key="fee.id">
                <div class="col-1 text-center ">
                    <a @click="edit(fee.id)" style="cursor: pointer;"><i class="fa fa-regular fa-pen-to-square fa-lg"></i></a>
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    {{fee.id}}
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    <p v-if="fee.product == null"> - </p>
                    <p v-else>{{ fee.product.name }}</p>
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    {{ fee.account.customer.id }}
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    {{ fee.collections[0].chargePartEventId.chargeEventId.chargeGroup.name }}
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    {{ fee.collections[0].chargePartEventId.chargeEventId.name }}
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    {{ fee.account.id }}
                </div>
                <div class="col text-center" style="border-left: 1.5px solid #BABABA;">
                    {{ fee.dateTime }}
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import SetupFeeService from '@/service/SetupFeeService'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
    components: { Sidebar },
    setup() {
        return { sidebarWidth }
    },
    data(){
        return{
            fees : [],
            list:[],
        }
    },
    methods:{
        getFee(){
            SetupFeeService.getAll().then((res) => {
                this.fees = res.data
                console.log(this.fees )
                console.log("type1 -->")

                // let text = res.data[5].createDate;
                // let result = text.slice(0, 10);
                // console.log(result)

                this.fees.forEach(element => {
                    console.log("dd --> " + element.createDate)
                    console.log(element )

                    

                    if(element.type == 'ONEFE'){
                        let text = ''
                        let result =''
                        if(element.createDate != null){
                            text = element.createDate;
                            result = text.slice(0, 10);
                            console.log("date --> "+result)
                        }
                        SetupFeeService.getOneFee(element.id).then((res) => {
                            res.data.dateTime = result
                            this.list.push(res.data) 
                        })
                    }
                });

                console.log(this.list)
            })

            
        },
        edit:function(id){
            let func = ''
            if(this.$cookies.get('role') == 'MAKER'){
                func = 'modify'
                this.$router
                    .push({ path: '/ChargeCollection/'+func+'/'+id })
            }
            else if(this.$cookies.get('role') == 'CHECKER'){
                func = 'verify'
                this.$router
                    .push({ path: '/ChargeCollection/'+func+'/'+id })
            }
            
        },
        addNew:function(){
            let func = 'add'
            this.$router
                .push({ path: '/ChargeCollection/'+func })
        }
    },
    created(){
        this.getFee();
    }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
</style>