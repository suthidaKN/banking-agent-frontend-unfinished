<template>
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada', serif;">
    <div class="d-flex row bd-highlight mb-3 " style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
        <!--ข้อมูลทั่วไปของ bank user -->
        <div class="col-sm-2 p-3 bd-highlight">User : <span class="p">{{ this.$cookies.get('username') }}</span></div>
        <div class="col-sm-2 p-3 bd-highlight">Role : <span class="p">{{ this.$cookies.get('role') }}</span></div>
        <div class="col-sm-2 p-3 bd-highlight">Calender : 
            <select class="p1" name="key" id="calender">
                <option value="gregorian">Gregorian</option>
            </select>
        </div>
        <div class="col-sm-2 p-3 bd-highlight ">Time Zone : 
            <select class="p1" name="key" id="timeZone">
                <option value="ict">ICT</option>
                <option value="cst">CST</option>
            </select>
        </div>
        <div class="col-sm-2 p-3 bd-highlight">Solution :
            <select class="p1" name="key" id="solution" v-model="this.fee.tranType">
                <option value=0 disabled>please select</option>
                <option v-for="tran in tranType" :key="tran" v-bind:value=tran.id>{{ tran.name }}</option>
            </select>
        </div>
    </div>

      <div class="container mt-md-5 col-md-10 p-5 ">
        <div class="text-start">
            <h2 style="border-bottom: 3px solid #BABABA">Custom Fee Rules Configuration</h2> <br>
        </div>

        <div class="row">
          <div class="col text-start">

              <!-- function -->
              <div class="col">
                    <h6 class="fw-semibold">function <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                    <div v-if="this.$cookies.get('role') == 'CHECKER'">
                        <select name="" id="" class="form-select" style="width: 30%;" v-model="this.function" v-on:change="onChangeFunction($event)">
                            <option value=0 disabled>please select</option>
                            <option value=4>Cancel</option>
                            <option value=5>Verify</option>
                        </select>
                    </div>
                    <div v-if="this.$cookies.get('role') =='MAKER'">
                        <select name="" id="" class="form-select" style="width: 30%;" v-model="this.function" v-on:change="onChangeFunction($event)">
                            <option value=0 disabled>please select</option>
                            <option value=1>Add</option>
                            <option value=2>Modify</option>
                            <option value=3>Inquire</option>
                        </select>
                    </div>
              </div><br>

              <!-- Rule ID  -->
              <div class="col">
                    <h6 class="fw-semibold">Rule ID <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                     <input class="input col-8" type="text" disabled/><!--:value=-->
                    <!-- <a v-if="this.function != 0" @click="changeCustomer()" data-bs-toggle="tooltip" data-bs-placement="top" title="search" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                    <a v-else data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a> -->
              </div><br>

              <!-- Charge Level -->
              <div class="col">
                    <h6 class="fw-semibold">Charge Level <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                    <select class="form-select" style="width: 66.66666667%;" name="key" id="solution" v-model="this.fee.chargeLevel">
                        <option value=0 disabled>please select</option>
                        <option v-for="level in chargeLevel" :key="level" v-bind:value=level.id>{{ level.name }}</option>
                    </select>
              </div><br>

                <!-- Product -->
              <div class="col">
                  <h6 class="fw-semibold">Product ID </h6>
                  <div class="col fs-6" >
                    <input class="input col-8" type="text" :value=this.productSelect disabled/>
                    <a v-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                    <button v-else type="button" class="btn" data-bs-toggle="modal" data-bs-target="#myModal" title="search">
                      <i class="fa fa-search" style="cursor: pointer;" ></i>
                    </button>
                    <!-- The Modal -->
                    <div class="modal fade" id="myModal">
                      <div class="modal-dialog modal-lg ">
                        <div class="modal-content">
                          <!-- Modal Header -->
                          <div class="modal-header">
                            <h4 class="modal-title">Product ID List</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                          </div>
                          <!-- Modal body -->
                          <div class="modal-body p-5">
                            <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#033495 ;">
                              <div class="col-1"></div>
                              <div class="col fs-6 ps-md-5">
                                Product Code.
                              </div>
                              <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                                Product Desc.
                              </div>
                            </div>
                            <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow"  v-for="pro in product" v-bind:key="pro">
                              <div class="col-1 text-center" >
                                <button v-if="this.productSelect == pro.name" style="border: none; background: none;">
                                  <i class='fa far fa-check-circle' style="cursor: pointer; color: #FF0303;"></i>
                                </button>
                                <button v-else v-on:click="getProduct(pro.name,pro.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                  <i class='fa	far fa-circle' style="cursor: pointer;"></i>
                                </button>
                              </div>
                              <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{pro.name}}
                              </div>
                              <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{ pro.description }}
                              </div>
                            </div>
                          </div>
                          <!-- Modal footer -->
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
              </div><br>

              <!-- Customer -->
              <div class="col">
                  <h6 class="fw-semibold">Customer ID </h6>
                  <div class="col fs-6" >
                    <input class="input col-8" type="text" :value=this.customerSelect disabled/>
                    <a v-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                    <button v-else type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalCus" title="search">
                      <i class="fa fa-search" style="cursor: pointer;" ></i>
                    </button>

                    <!-- The Modal -->
                    <div class="modal fade" id="modalCus">
                      <div class="modal-dialog modal-lg ">
                        <div class="modal-content">
                          <!-- Modal Header showCustomer-->
                          <div class="modal-header" style="background-color:#033495 ; font-size: 18px; color: #FFFFFF;">
                            <h4 class="modal-title">Account ID List</h4>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" style="color: #FFFFFF;"></button>
                          </div>
                          <!-- Modal body -->
                          <div class="modal-body p-5">
                            <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-dark fw-bold fs-6 text-white" style="background-color: #7D7D7D;">
                              <div class="col-1"></div>
                              <div class="col fs-6 ps-md-5">
                                CIF ID
                              </div>
                              <div class="col fs-6 ps-md-5 text-end" style="border-left: 3px solid #FFFFFF;">
                                <input type="text" placeholder="Search..." style="border-radius: 10px; border-top-style: hidden; border-right-style: hidden; border-left-style: hidden;" v-model="authorNameSearchString" />
                                <!-- <i class="fas fa-search" style="color: #b8bfd6;"></i> -->
                              </div>
                            </div>
                            <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow"  v-for="c in filteredCustomer" v-bind:key="c">
                              <div class="col-1 text-center" >
                                <button v-if="this.customerSelect == c.id" style="border: none; background: none;">
                                  <i class=' fa far fa-check-circle' style="cursor: pointer; color: #FF0303;"></i>
                                </button>
                                <button v-else v-on:click="getCustomer(c.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                  <i class='fa	far fa-circle' style="cursor: pointer;"></i>
                                </button>
                              </div>
                              <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                {{c.id}}
                              </div>
                              <div class="col fs-6 ps-md-5"></div>
                            </div>
                          </div>

                          <!-- Modal footer -->
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
              </div><br>

              <!-- Account -->
              <div class="col">
                    <h6 class="fw-semibold">Account ID </h6>
                    <div class="col fs-6" >
                        <input class="input col-8" type="text" :value=this.accSelect disabled/>
                        <!-- <a v-if="this.customerSelect" @click="changeAccount()" data-bs-toggle="tooltip" data-bs-placement="top" title="search" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                        <a v-else-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a> -->
                        <a v-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                        <button v-else-if="this.customerSelect" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalAcc" title="search">
                          <i class="fa fa-search" style="cursor: pointer;" ></i>
                        </button>
                        <a v-else data-bs-toggle="tooltip" data-bs-placement="top" title="please select customer ID" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>

                        <!-- The Modal -->
                        <div class="modal fade" id="modalAcc">
                          <div class="modal-dialog modal-lg ">
                            <div class="modal-content">
                              <!-- Modal Header showCustomer-->
                              <div class="modal-header" style="background-color:#033495 ; font-size: 18px; color: #FFFFFF;">
                                <h4 class="modal-title">A/cs List</h4>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" style="color: #FFFFFF;"></button>
                              </div>
                              <!-- Modal body -->
                              <div class="modal-body p-5">
                                <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-dark fw-bold fs-6 text-white" style="background-color: #7D7D7D;">
                                  <div class="col-1"></div>
                                  <div class="col fs-6 ps-md-5">
                                    A/C Id.
                                  </div>
                                  <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                                    CIF ID.
                                  </div>
                                </div>
                                <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow"  v-for="a in acc" v-bind:key="a" >
                                  <div class="col-1 text-center" >
                                    <button v-if="accSelect == a.id" style="border: none; background: none;">
                                      <i class=' fa far fa-check-circle' style="cursor: pointer; color: #FF0303;"></i>
                                    </button>
                                    <button v-else v-on:click="getAcc(a.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                      <i class='fa	far fa-circle' style="cursor: pointer;"></i>
                                    </button>
                                  </div>
                                  <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                    {{a.id}}
                                  </div>
                                  <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                                    {{ a.customer.id }}
                                  </div>
                                </div>
                              </div>

                              <!-- Modal footer -->
                              <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                              </div>

                            </div>
                          </div>
                        </div>
                    </div>
              </div>

          </div><br>

          <div class="col text-start" style="border-left: 2px solid #5252AB">
              <div class="col">
                    <h6 class="fw-semibold">Create<i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-on:click="createRule(1)" id="flexRadioDefault1" :checked="this.radio=='1'" style="cursor: pointer;">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Rule ID
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" id="flexRadioDefault2" v-on:click="createRule(2)" :checked="this.radio=='2'" style="cursor: pointer;">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Sub Rule ID
                        </label>
                    </div>
              </div><br>

              <div class="col">
                    <h6 class="fw-semibold">Sub Rule ID </h6>
                    <input class="input col-8" type="text" disabled/> <!--:value=this.chargeGroupSelect-->
              </div><br>

                <!-- Charge Group -->
              <div class="col">
                <h6 class="fw-semibold">Charge Group <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                <div class="col fs-6" >
                  <input class="input col-8" type="text" :value=this.chargeGroupSelect disabled/>  
                  <a v-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                  <button v-else type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalGroup" title="search">
                    <i class="fa fa-search" style="cursor: pointer;" ></i>
                  </button>

                  <!-- The Modal -->
                  <div class="modal fade" id="modalGroup">
                    <div class="modal-dialog modal-lg ">
                      <div class="modal-content">
                        <!-- Modal Header showCustomer-->
                        <div class="modal-header" style="background-color:#033495 ; font-size: 18px; color: #FFFFFF;">
                          <h4 class="modal-title">Charge Group ID List</h4>
                          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" style="color: #FFFFFF;"></button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body p-5">
                          <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-dark fw-bold fs-6 text-white" style="background-color: #7D7D7D;">
                            <div class="col-1"></div>
                            <div class="col fs-6 ps-md-5">
                              Charge Code.
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #6B6B6B">
                              Charge Desc.
                            </div>
                          </div>
                          <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="g in chargeGroup" v-bind:key="g" >
                            <div class="col-1 text-center" >
                              <button v-if="chargeGroupSelect == g.name" style="border: none; background: none;">
                                <i class=' fa far fa-check-circle' style="cursor: pointer; color: #FF0303;"></i>
                              </button>
                              <button v-else v-on:click="getChargeGroup(g.name,g.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                <i class='fa	far fa-circle' style="cursor: pointer;"></i>
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
                        <!-- Modal footer -->
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div><br>

              <!-- Charge Event ID -->
              <div class="col">
                <h6 class="fw-semibold">Charge Event ID <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                <div class="col fs-6" >
                  <input class="input col-8" type="text" :value=this.eventIdSelect disabled/>
                  <a v-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                  <button v-else-if="chargeGroupSelect" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalEvent" title="search">
                    <i class="fa fa-search" style="cursor: pointer;" ></i>
                  </button>
                  <a v-else data-bs-toggle="tooltip" data-bs-placement="top" title="please select customer ID" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>

                  <!-- The Modal -->
                  <div class="modal fade" id="modalEvent">
                    <div class="modal-dialog modal-lg ">
                      <div class="modal-content">
                        <!-- Modal Header showCustomer-->
                        <div class="modal-header" style="background-color:#033495 ; font-size: 18px; color: #FFFFFF;">
                          <h4 class="modal-title">Charge Event ID List</h4>
                          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" style="color: #FFFFFF;"></button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body p-5">
                          <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-dark fw-bold fs-6 text-white" style="background-color: #7D7D7D;">
                            <div class="col-1"></div>
                            <div class="col fs-6 ps-md-5">
                              Charge Event ID
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                              Charge Event Description
                            </div>
                          </div>
                          <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="g in chargeEventId" v-bind:key="g" >
                            <div class="col-1 text-center" >
                              <button v-if="eventIdSelect == g.name" style="border: none; background: none;">
                                <i class=' fa far fa-check-circle' style="cursor: pointer; color: #FF0303;"></i>
                              </button>
                              <button v-else v-on:click="getEventId(g.name,g.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                <i class='fa	far fa-circle' style="cursor: pointer;"></i>
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
                        <!-- Modal footer -->
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div><br>

              <!-- Charge Part Event ID -->
              <div class="col">
                <h6 class="fw-semibold">Charge Part Transaction Type <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                <div class="col fs-6" >
                  <input class="input col-8" type="text" :value=this.partEventSelect disabled/>
                  <a v-if="this.function == 0" data-bs-toggle="tooltip" data-bs-placement="top" title="please select function" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>
                  <button v-else-if="eventIdSelect" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#modalPart" title="search">
                    <i class="fa fa-search" style="cursor: pointer;" ></i>
                  </button>
                  <a v-else data-bs-toggle="tooltip" data-bs-placement="top" title="please select customer ID" ><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a>

                  <!-- The Modal -->
                  <div class="modal fade" id="modalPart">
                    <div class="modal-dialog modal-lg ">
                      <div class="modal-content">
                        <!-- Modal Header showCustomer-->
                        <div class="modal-header" style="background-color:#033495 ; font-size: 18px; color: #FFFFFF;">
                          <h4 class="modal-title">Charge Part Event ID List</h4>
                          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" style="color: #FFFFFF;"></button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body p-5">
                          <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-dark fw-bold fs-6 text-white" style="background-color: #7D7D7D;">
                            <div class="col-1"></div>
                            <div class="col fs-6 ps-md-5">
                              Charge Code.
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                              Charge Desc.
                            </div>
                          </div>
                          <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="part in chargePartEventId" v-bind:key="part" >
                            <div class="col-1 text-center" >
                              <button v-if="partEventSelect == part.name" style="border: none; background: none;">
                                <i class=' fa far fa-check-circle' style="cursor: pointer; color: #FF0303;"></i>
                              </button>
                              <button v-else v-on:click="getPartEventID(part.name,part.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                                <i class='fa	far fa-circle' style="cursor: pointer;"></i>
                              </button>
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                              {{part.name}}
                            </div>
                            <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                              {{ part.description }}
                            </div>
                          </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div><br>

              <!-- Transaction Charge Type -->
              <div class="col">
                    <h6 class="fw-semibold">Transaction Charge Type <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                    <select class="form-select" style="width: 50%;" name="key" id="solution" v-model="this.fee.transactionChargeType">
                        <option value=0 disabled>please select</option>
                        <option v-for="txn in txnChargeType" :key="txn" v-bind:value=txn.id>{{ txn.name }}</option>
                    </select>
              </div><br>

          </div>

        </div><br>

        <div class="text-end me-md-5">
          <button class="btn btn-success" v-on:click="getSummary">Go</button>
        </div><br><br>

        <div v-if="showLogic">
          showLogic
        </div>
      </div>
</div>
</template>
<script>
/* eslint-disable */
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import DataService from '@/service/DataService'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
    data(){
        return{
            function : 0,
            radio:0,
            productSelect : null,

            showLogic : null,

            tranType:[],
            chargeLevel:[],
            product:[],

            customer:[],
            customerSelect:null,
            authorNameSearchString: "",

            accSelect:null,
            acc:[],
            accountAll:[],

            chargeGroup:[],
            chargeGroupSelect:null,

            eventIdSelect :'',
            chargeEventId:[],

            chargePartEventId:'',
            partEventSelect:'',

            txnChargeType:[],
            // rule:[],

            fee:{
                userMaker: '',
                userChecker:'',
                tranType : 0,
                chargeLevel:0,
                product:'',
                account:'',
                rule:'',
                transactionChargeType:0,
                chargePartEvent:''
            },
        }

    },
    computed: {
        
        filteredCustomer: function () {
			
            var cus = this.customer;
            console.log("test --> " + cus);
            var authorNameSearchString = this.authorNameSearchString;

            if(!authorNameSearchString){
                return cus;
            }

            console.log("aaa ---> "+authorNameSearchString.trim().toLowerCase())
            // searchString = authorNameSearchString.trim().toLowerCase();

            cus = cus.filter(function(item){
                if(item.id.toString().toLowerCase().indexOf(authorNameSearchString) !== -1){
                    return item;
                }
            })

            return cus;
        },
	  },
    methods:{
        callLogin(){
            if(this.$cookies.get('token') == null){
                this.$router.push({ path: '/login' })
            }
        },
        getData(){
            DataService.getType().then((res) =>{
                this.tranType = res.data
            }).catch(err =>{
                console.log(err)
            }),

            DataService.getChargeLevel().then((res) => {
                this.chargeLevel = res.data
                console.log("level")
                console.log(this.chargeLevel)
            }).catch(err => {
                console.log(err)
            }),

            DataService.getProduct().then((res)=>{
                this.product = res.data
                console.log("Product")
                console.log(this.product)
            }).catch(err =>{
                console.log(err)
            }),

            DataService.getChargeGroup().then((res) =>{
                this.chargeGroup = res.data
                console.log("group")
                console.log(this.chargeGroup)
            }).catch(err => {
                console.log(err)
            }),

            DataService.getChargeType().then((res) =>{
                this.txnChargeType = res.data
                console.log("txn charge type")
                console.log(this.txnChargeType)
            }).catch(err => {
                console.log(err)
            }),

            // DataService.getRule().then((res) => {
            //     this.rule = res.data
            //     console.log("Rule ID")
            //     console.log(this.rule)
            // }).catch(err => {
            //     console.log(err)
            // }),

            DataService.getAllCustomer().then((res) => {
                this.customer = res.data
                console.log("Customer")
                console.log(this.customer)
            }).catch(err => {
                console.log(err)
            })


        },
        onChangeFunction:function(e){
            this.function = e.target.value;
            var name = e.target.options[e.target.options.selectedIndex].text;
            console.log('func.',this.function );
            console.log('name func.',name );
            //   if(this.function == '1'){
            //       this.getProduct(null,null)
            //       this.getChargeGroup('','')
            //       this.getEventId('','')
            //       this.getCustomer('')
            //       this.getAcc('')
            //   }
        },
        getProduct:function(name,id){
            console.log("name --> "+name)
            this.productSelect = name
            this.fee.product = id
        },
        getCustomer:function(id){
            console.log("name --> "+id)
            this.customerSelect = id

            DataService.getAccount().then((res)=>{
                this.acc = []
                this.accountAll = res.data;
                this.accountAll.forEach(element => {
                // console.log(element)
                if(element.customer.id == id){
                    this.acc.push(element);
                }
            });
                        // console.log("test")
                        // console.log(this.acc)
            })
            // this.fee.productid = id
        },
        getAcc : function(id){
            this.accSelect = id
            this.fee.account = id
        },
        getChargeGroup:function(name,id){
            console.log("name --> "+name)
            this.chargeGroupSelect = name

            DataService.getchargeEventByGroupId(id).then((res) =>{
                this.chargeEventId = res.data
                console.log("eventId")
                console.log(res.data)
            }).catch(err =>{
                console.log(err)
            })
        },
        getEventId:function(name,id){
            console.log("name --> "+name)
            this.eventIdSelect = name

            DataService.getChargePartEventIdFromEvent(id).then((res) =>{
                this.chargePartEventId = res.data
                console.log("partEvent ----->  ")
                console.log(res.data)
            }).catch(err =>{
                console.log(err)
            })
        },
        getPartEventID:function(name,id){
          this.fee.chargePartEvent = id
          this.partEventSelect = name

          console.log(this.fee)
        },
        createRule(id){
            this.radio = id
            console.log("Instruc 1 --> " + this.radio)
            if(this.radio == 1){
                this.radio = '1'
                this.fee.rule = 1
                console.log('if')
            }
            else{
                this.fee.rule = 2
                this.radio == '2'
                console.log('else')
            }
            console.log("Instruc 2 --> " + this.radio)
        },
        getSummary(){
          
          this.showLogic = !this.showLogic
          // if(chargeGroupSelect == ""){

          // }
          // else if(chargeGroupSelect == ""){

          // }
          // else if(chargeGroupSelect == ""){

          // }
          // else if(chargeGroupSelect == ""){

          // }
          // else if(chargeGroupSelect == ""){

          // }
          console.log(this.fee)
        }
    },
    created(){
        this.callLogin();
        this.getData();
    }
    
}
</script>
<style lang="scss" scoped>
.col-sm-2{
    color: rgb(106, 106, 106);
    font-weight: 500;
    border-left: 1px solid #CACACA
}
.p{
    color: #919191;
}

.p1{
    color: #919191;
    border-radius: 6px;
}
.input{
  border-radius: 5px;
  padding: 0.2rem;
}

</style>
