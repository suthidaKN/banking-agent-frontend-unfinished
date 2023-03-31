<template>
  <Sidebar/>
  <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada' ,serif;">
    
    <div class = "container col-md-10 p-5 bg-light my-md-5 rounded-5">
      <h1 class = "text-start mb-sm-4">Transaction</h1>
      <!-- <p v-for="tran in transaction" :key="tran">{{tran.amount}}</p> -->
      <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-white" style="background-color:#033495 ;">
                <div class="col fs-6">
                    Primary Agent
                </div>
                <div class="col fs-6" style="border-left: 2px solid #FFFFFF">
                    Agent ID
                </div>
                <div class="col fs-6" style="border-left: 2px solid #FFFFFF">
                    Txn Number
                </div>
                <div class="col-1 fs-6" style="border-left: 2px solid #FFFFFF">
                    Type
                </div>
                <div class="col fs-6" style="border-left: 2px solid #FFFFFF">
                    Amount
                </div>
                <div class="col fs-6" style="border-left: 2px solid #FFFFFF">
                    Description
                </div>
                <div class="col fs-6" style="border-left: 2px solid #FFFFFF">
                    Fee collected
                </div>
                <div class="col fs-6" style="border-left: 2px solid #FFFFFF">
                    Commission to be paid
                </div>
            </div>
            <div class="row my-md-1 bg-white py-2 rounded-4 text-start shadow" v-for="tran in transaction"  v-bind:key="tran.id">
                <div class="col">
                  <p class="pt-3" v-if="tran.agent.leaader == null">{{ tran.agent.id }}</p>  
                  <p class="pt-3" v-else>{{ tran.agent.leader.id }}</p>  
                </div>
                <div class="col" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{tran.agent.id}}</p>
                </div>
                <div class="col" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{ tran.mapTranType.setupFee.id }}</p>
                </div>
                <div class="col-1" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{ tran.mapTranType.type.id }}</p>
                </div>
                <div class="col" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{ tran.amount }}</p>
                </div>
                <div class="col" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{ tran.mapTranType.type.name }}</p>
                </div>
                <div class="col" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{ tran.fee }}</p>
                </div>
                <div class="col" style="border-left: 2px solid #BABABA">
                  <p class="pt-3">{{ tran.commission }}</p>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
import Transaction from '@/service/Transaction'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
  data(){
    return{
      transaction:[]
    }
  },
  methods:{
    getTransaction(){
      Transaction.getTransaction().then((res) => {
        this.transaction = res.data
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.getTransaction();
  }
}
</script>

<style>

</style>