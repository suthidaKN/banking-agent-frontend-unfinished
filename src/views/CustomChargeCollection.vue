<template>
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada',serif;">
        <div class="d-flex row bd-highlight mb-3 " style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
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
                    <option v-for="tran in tranType" :key="tran" v-bind:value=tran.id>{{ tran.name }}</option>
                </select>
            </div>
        </div>
        
        <!-- bg-light -->
        <div class="container mt-md-5 col-md-10 p-5 ">
          <div class="text-start">
            <h2 style="border-bottom: 3px solid #BABABA">Custom Charge Collection</h2> <br>
          </div>

          <div class="row">
            <div class="col text-start" >
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

              <!-- Ref ID -->
              <div class="col" v-if="this.function == '2' || this.function == '4' || this.function == '5'">
                <h6 class="fw-semibold">Ref. ID</h6>
                <input  class="input col-5" type="text" v-model=this.id />
                <a @click="getFee(this.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="search"><i class="fa fa-search ms-2" style="cursor: pointer;" ></i></a><br><br>
              </div>

              <!-- Product -->
              <div class="col">
                <h6 class="fw-semibold">Product ID</h6>
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
                            <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow"  v-for="pro in products" v-bind:key="pro">
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
                        <!-- Modal Header -->
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
                        <!-- Modal Header -->
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

            </div>
            <div class="col text-start" style="border-left: 2px solid #5252AB">
              
              <!-- Customer -->
              <div class="col">
                <h6 class="fw-semibold">Customer ID <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
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
                          <!-- Modal Header -->
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
                <h6 class="fw-semibold">Account ID <i class="fa fa-asterisk" style="color:red; font-size: 8px;"></i></h6>
                <div class="col fs-6" >
                  <input class="input col-8" type="text" :value=this.accSelect disabled/>
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
              </div><br>

            </div>
          </div><br>

          <div v-if="showCollection" class="text-end me-md-5">
            <button class="btn btn-success" v-on:click="getCollection" disabled>Go</button>
          </div>
          
          <div v-else class="text-end me-md-5">
            <button class="btn btn-success" v-on:click="getCollection">Go</button>
          </div><br><br>

          <!-- Collection -->
          <br><div v-if="showCollection">
            <h4 class = "text-start" style="border-bottom: 3px solid #BABABA">One Time Charge Collection</h4><br>
            <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white p-3" style="background-color:#033495 ;">Charge Collection</div>
                <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#9E9E9E ;">
                    <div class="col-1 text-center"></div>
                    <div class="col-3 ps-md-2" style="border-left: 3px solid #FFFFFF">
                      Part Tran Desc.
                    </div>
                    <div class="col ps-md-2" style="border-left: 3px solid #FFFFFF">
                      Charge Amount.
                    </div>
                    <div class="col ps-md-2" style="border-left: 3px solid #FFFFFF">
                      Collection Amount.
                    </div>
                    <div class="col-4 ps-md-2" style="border-left: 3px solid #FFFFFF">
                      Charge Narration.
                    </div>
                </div>
                <div v-if="fee.collectionRequests != ''">
                    <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="col in fee.collectionRequests" :key="col">
                      <div class="col-1 text-center ">
                        <a @click="edit(col)"><i class="fa fa-regular fa-pen-to-square fa-xl" style="cursor: pointer; color: #FF8C8C;"></i></a>
                      </div>
                      <div class="col-3 ps-md-2" style="border-left: 3px solid #BABABA" >
                        {{col.description}}
                      </div>
                      <div class="col ps-md-2" style="border-left: 3px solid #BABABA">
                        {{ col.chargeAmt}}
                      </div>
                      <div class="col ps-md-2" style="border-left: 3px solid #BABABA" >
                        {{col.collectionAmt}}
                      </div>
                      <div class="col-4 ps-md-2" style="border-left: 3px solid #BABABA">
                        {{  col.description +" - "+  col.name }}
                      </div>
                        
                    </div>
                </div>
                <div v-else class="row my-md-2 bg-white py-md-3 rounded-4 text-center shadow p-4">
                    <h6>Please Select Charge Collection.</h6>
                </div>
                <div class="text-end mt-3">
                    <button v-on:click="showAddCollection" class="btn btn-primary">Add Recode</button>
                </div>
            <br>
            <div v-if="showPartEvent">
              <h6 class = "mt-4 text-start fw-semibold">Charge Part Event ID List</h6>
              <div class="row my-md-2 py-md-2 rounded-3 text-start shadow text-white" style="background-color:#033495 ;">
                <div class="col-1"></div>
                <div class="col fs-6 ps-md-5">
                  Charge Code.
                </div>
                <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                  Charge Desc.
                </div>
              </div>

              <div v-if="chargePartEventId != ''">
                <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="part in chargePartEventId" v-bind:key="part">
                  <div class="col-1 text-center" >
                    <button v-on:click="getPartEventID(part.name,part.id,part.description)" data-bs-toggle="tooltip" data-bs-placement="top" title="select" style="border: none; background: none;">
                      <i class='fa fas fa-angle-down' style="cursor: pointer;"></i>
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
              <div v-else class="row my-md-2 bg-white py-md-3 rounded-4 text-center shadow p-4">
                <h6>Event Part Id is empty.</h6>
              </div>
            
            </div>


            <div class="container py-md-3 rounded-5 p-4" style="background-color: #E8E8E8;" v-if="showEdit">
              <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-white ps-md-4" style="background-color:#033495 ; font-size: 18px;">Charge</div>
              <div class="row text-start">
                <div class="row ps-md-3 pt-md-3"><h5 class="fw-semibold">Charge Collection Details</h5></div>
                <div class="col">
                  <div class="col p-md-2 my-md-1">
                    <h6 class="fw-semibold">Part Tran Desc.</h6>
                    <input class="col-10 p-1 bg-white rounded-4 shadow ps-md-2" style="border: none;" type="text" :value=this.collection.description disabled/>
                  </div>
                  <div class="col p-md-2 my-md-1">
                    <h6 class="fw-semibold">Collection Amount.</h6>
                    <input class="col-10 p-1 bg-white rounded-4 shadow ps-md-2" style="border: none;" type="text" v-model=this.collection.collectionAmt />
                  </div>
                </div>
                <div class="col">
                  <div class="col p-md-2 my-md-1">
                    <h6 class="fw-semibold">Charge Amount.</h6>
                    <input class="col-10 p-1 bg-white rounded-4 shadow ps-md-2" style="border: none;" type="text" v-model=this.collection.chargeAmt disabled/>
                  </div>
                  <div class="col p-md-2 my-md-1">
                    <h6 class="fw-semibold">Charge Narration.</h6>
                    <input class="col-10 p-1 bg-white rounded-4 shadow ps-md-2" style="border: none;" type="text" :value=this.collection.description disabled/>
                  </div>
                </div>
              </div>
              <div class="text-end">
                <button class="btn" @click="editCollection(this.collection.chargePartEventId)" style="cursor: pointer; background-color: #8599E2; color: #fff;">done</button>
              </div>
            </div><br>

            <div class="text-end" v-if="fee.collectionRequests!=''">
              <div v-if="this.function == '2' || this.function == '5'">
                <button class="btn " v-on:click="onClickCancel" style="cursor: pointer; background-color: #FF8C8C; color: #fff;">Cancel</button>
                <button class="btn ms-md-2" v-on:click="onClickSubmit" style="cursor: pointer; background-color: #74F380; color: #fff;">update</button>
              </div>
              <div v-else-if="this.function == '4'">
                <button class="btn " v-on:click="onClickCancel" style="cursor: pointer; background-color: #8599E2; color: #fff;">Cancel</button>
                <button class="btn ms-md-2" v-on:click="onClickSubmit" style="cursor: pointer; background-color: #FF8C8C; color: #fff;">delete</button>
              </div>
              <div v-else>
                <button class="btn " v-on:click="onClickCancel" style="cursor: pointer; background-color: #FF8C8C; color: #fff;">Cancel</button>
                <button class="btn ms-md-2" v-on:click="onClickSubmit" style="cursor: pointer; background-color: #74F380; color: #fff;">Submit</button>
              </div>

            </div>
          </div>

        </div><br><br>
    </div>

</template>
<script>
/* eslint-disable */
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
import DataService from '@/service/DataService'
import SetupService from '@/service/SetupFeeService'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
    data(){
        return{
          function:0,
          id:'',

          productSelect:null,
          products:'',

          showchargeGroup:null,
          chargeGroupSelect:null,
          chargeGroup:[],

          eventIdSelect:null,
          showEventId:null,
          chargeEventId:'',
          partEvent:'',
          

          customer:'',
          customerSelect:null,
          authorNameSearchString: "",

          showAccount:null,
          accSelect:null,
          acc:[],
          accountAll:[],
          
          showCollection:null,
          
          chargePartEventId:'',
          showPartEvent:null,

          showEdit:null,
          collection:[],
          collections:[],

          tranType:[],
          
          fee:{
            userMaker: '',
            userChecker:'',
            productid: '',
            accountid: '',
            collectionRequests: [],
            tranType : '',
            verify:''
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
        this.$router
                        .push({ path: '/login' })
      }
    },
    getData(){
      DataService.getProduct().then((res) =>{
        this.products = res.data
        console.log("product")
        console.log(res.data)
      }).catch(err =>{
        console.log(err)
      }),
      DataService.getAllCustomer().then((res) =>{
        this.customer = res.data
        console.log("customer")
        console.log(res.data)
      }).catch(err =>{
        console.log(err)
      }),
      DataService.getChargeGroup().then((res)=>{
        res.data.forEach(element => {
          if(element.id == 3 || element.id == 5 || element.id == 6){
            this.chargeGroup.push(element)
          }
        });
        
        console.log("chargeGroup")
        console.log(res.data)
      }).catch(err =>{
        console.log(err)
      }),

      DataService.getType().then((res) =>{
        this.tranType = res.data
      }).catch(err =>{
        console.log(err)
      })
    },
    onChangeFunction:function(e){
      this.function = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      console.log('func.',this.function );
      console.log('name func.',name );
      if(this.function == '1'){
          this.productSelect = null
          this.chargeGroupSelect = null
          this.eventIdSelect = null
          this.customerSelect = null
          this.accSelect = null
          this.showAccount = null
          this.showEventId = null
          this.showchargeGroup = null
          this.showCollection = false
          this.fee.collectionRequests = []
          let func = 'add'
          this.$router
            .push({ path: '/ChargeCollection/'+func })
      }
    },
    getProduct:function(name,id){
      console.log("name --> "+name)
      this.productSelect = name
      this.fee.productid = id
    },
    changeChargeGroup(){
      this.showchargeGroup = !this.showchargeGroup
    },
    getChargeGroupNew:function(name,id){
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'เลือก Charge Group ใหม่ จะลบ Charge Collection ที่บันทึกไว้ทั้งหมด',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#FF8C8C',
        cancelButtonColor:'#74F380',
        cancelButtonText:'No'
      }).then((result) => {
        this.showchargeGroup = !this.showchargeGroup
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log("name --> "+name)
          if(this.chargeGroupSelect != name){
            this.fee.collectionRequests.forEach(element => {
              console.log("part id --> "+element.id)
              DataService.deleteCollection(element.id).then((res)=>{
                console.log("delete --> "+res.data.delete)
              }).catch(err =>{
                console.log(err)
              })
            });
            this.fee.collectionRequests = []
            this.eventIdSelect = ''
            this.showCollection = null
          }
          this.chargeGroupSelect = name

          DataService.getchargeEventByGroupId(id).then((res) =>{
            this.chargeEventId = res.data
            console.log("eventId")
            console.log(res.data)
          }).catch(err =>{
            console.log(err)
          })
        } 
      })
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

        console.log("list")
        console.log(this.fee.collectionRequests)
      }).catch(err =>{
        console.log(err)
      })
     
    },

    getEvent:function(name,id){
      this.showEventId = !this.showEventId
      console.log("name --> "+name)
      this.eventIdSelect = name

      let body = []
      this.fee.collectionRequests.forEach(element => {
        body.push(element.chargePartEventId)
      });
      console.log("body --> "+id)
      console.log(body)
      DataService.getPartEvent(id,body).then((res) =>{
        this.chargePartEventId = res.data
        console.log("partEvent ----->  ")
        console.log(res.data)

        console.log("list")
        console.log(this.fee.collectionRequests)
      }).catch(err =>{
        console.log(err)
      })
     
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
    changeAccount:function(){
      this.showAccount = !this.showAccount
    },
    getAcc : function(id){
      this.showAccount = !this.showAccount
      this.accSelect = id
      this.fee.accountid = id
    },


    getCollection(){
      if(!this.chargeGroupSelect){
        console.log("group");
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Plese Select Charge Group',
        })
      }
      else if(!this.eventIdSelect){
        console.log("event");
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Plese Select Charge Event ID',
        })

      }
      else if(!this.customerSelect){
        console.log("cus");
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Plese Select Customer ID',
        })
        
      }
      else if(!this.accSelect){
        console.log("acc");
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Plese Select Account ID',
        })
        
      }
      else
      {
        this.showCollection = !this.showCollection
        
       
      }
    },
    showAddCollection:function(){ 
      this.showPartEvent = !this.showPartEvent
    },

    getPartEventID:function(name,id,des){
      this.showPartEvent = !this.showPartEvent
      this.partEvent = id
      this.fee.collectionRequests.push({
        chargePartEventId: id,
        chargeAmt: '0.0',
        collectionAmt: '0.0' ,
        name:name,
        description:des
      })

      let arr = this.chargePartEventId
      let array = []

      // console.log("arr")
      console.log(arr)

      arr.forEach(element => {
        if(element.id != id){
          array.push(element)
        }
      });

      this.chargePartEventId = array
      
      console.log("array")
      console.log(array)


      console.log("fee")
      console.log(this.fee)
    },

    edit :function(collection){
      this.showEdit =!this.showEdit
      this.collection = collection
      console.log(collection)
    },
    editCollection:function(id){
      this.fee.collectionRequests.forEach(element => {
        if(element.chargePartEventId == id){
          console.log(element)
          element.collectionAmt = this.collection.collectionAmt
          console.log(this.collection)
          console.log(element)
        }
      });

      console.log(this.fee)

      this.showEdit =!this.showEdit
    },
    onClickCancel(){
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
          this.$router.go(0) 
        } 
      })
    },
    onClickSubmit(){
      console.log("tranType -- > " +this.fee.tranType)
      let title = ''
      let text = ''

      
      // <option value=1>Add</option>
      // <option value=2>Modify</option>
      // <option value=3>Inquire</option>
      // <option value=4>Cancel</option>
      // <option value=5>Verify</option>

      if(this.function == 1){
        title = 'Are you sure?'
        text = 'you want to save?'
      }
      else if(this.function == 2 || this.function == 5){
        title = 'Are you sure?'
        text = 'you want to update?'
      }
      else if(this.function == 3){
        title = ''
        text = ''
      }
      else if(this.function == 4){
        title = 'Are you sure?'
        text = 'you want to delete'
      }


      if(this.fee.tranType == ''){
        console.log("empty")
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Plese Select Solution!',
        })
      }
      else{
        Swal.fire({
          title: title,
          text:text,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          confirmButtonColor: '#FF8C8C',
          cancelButtonColor:'#74F380',
          cancelButtonText:'No'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            if(this.function == 1){
              this.fee.userMaker = this.$cookies.get('id')
              SetupService.newOneFee(this.fee).then((res) =>{
              Swal.fire({
                icon: 'success',
                title: 'Successfully!!',
                text: res.data.message,
              }).then(() => {
                /* Read more about isConfirmed, isDenied below */
                  this.id='',
                  this.productSelect=null,
                  this.chargeGroupSelect=null,
                  this.eventIdSelect=null,
                  this.customerSelect=null,
                  this.accSelect=null,
                  this.$router
                      .push({ path: '/ChargeCollectionList' })
                      // .then(() => { this.$router.go(0) })
                })
              }).catch(err =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data.message,
                })
              })
            }

            else if(this.function == 5){
              this.fee.verify = true
              this.fee.userChecker = this.$cookies.get('id')
              SetupService.updateOneFee(this.id,this.fee).then((res) =>{
              Swal.fire({
                icon: 'success',
                title: 'update Successfully!!',
                text: res.data.message,
              }).then(() => {
                /* Read more about isConfirmed, isDenied below */
                  this.id='',
                  this.productSelect=null,
                  this.chargeGroupSelect=null,
                  this.eventIdSelect=null,
                  this.customerSelect=null,
                  this.accSelect=null
                  this.$router.go(0) 
                  // this.$router
                  //     .push({ path: '/ChargeCollectionList' })
                  //     .then(() => { this.$router.go(0) })
                })
              }).catch(err =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data.message,
                })
              })
            }

            else if(this.function == 2){
              this.fee.userChecker = this.$cookies.get('id')
              SetupService.updateOneFee(this.id,this.fee).then((res) =>{
              Swal.fire({
                icon: 'success',
                title: 'update Successfully!!',
                text: res.data.message,
              }).then(() => {
                /* Read more about isConfirmed, isDenied below */
                  this.id='',
                  this.productSelect=null,
                  this.chargeGroupSelect=null,
                  this.eventIdSelect=null,
                  this.customerSelect=null,
                  this.accSelect=null,
                  this.$router.go(0) 
                  // this.$router
                  //     .push({ path: '/ChargeCollectionList' })
                  //     .then(() => { this.$router.go(0) })
                })
              }).catch(err =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data.message,
                })
              })
            }

            else if(this.function == 4){
              SetupService.deleteOneFee(this.id).then((res) =>{
                console.log("delete")
                console.log(res.data)
                Swal.fire({
                  icon: 'success',
                  title: 'delete Successfully!!',
                  // text: res.data,
                }).then(() => {
                  /* Read more about isConfirmed, isDenied below */
                    this.id='',
                    this.productSelect=null,
                    this.chargeGroupSelect=null,
                    this.eventIdSelect=null,
                    this.customerSelect=null,
                    this.accSelect=null,
                    this.$router
                      .push({ path: '/ChargeCollectionList' })
                      // .then(() => { this.$router.go(0) })
                  })
              }).catch(err =>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response,
                })
              })
            }
            
          } 
        })
      }
     
    },

    getFee:function(id){
      console.log("id --> "+id )
      // this.fee.collectionRequests = [,,,]
      SetupService.getOneFee(id).then((res) =>{
        console.log(res.data)
        if(res.data.type == 'ONEFE'){
          if(res.data.product != null){
            this.getProduct(res.data.product.name,res.data.product.id)
          }
          else{
            this.getProduct(null,null)
          }
          this.fee.collectionRequests = []
          this.collections = res.data.collections

          
          this.collections.forEach(element => {
            console.log("parttttt ---->  ")
            this.fee.collectionRequests.push({
              id : element.id,
              chargePartEventId: element.chargePartEventId.id,
              chargeAmt: element.chargeAmt,
              collectionAmt: element.collectionAmt ,
              name:element.chargePartEventId.name,
              description:element.chargePartEventId.description
            })
          });
          this.getChargeGroup(res.data.collections[0].chargePartEventId.chargeEventId.chargeGroup.name,res.data.collections[0].chargePartEventId.chargeEventId.chargeGroup.id)
          this.getEvent(res.data.collections[0].chargePartEventId.chargeEventId.name,res.data.collections[0].chargePartEventId.chargeEventId.id) 
          this.getCustomer(res.data.account.customer.id)
          this.getAcc(res.data.account.id)
          this.fee.tranType = res.data.tranType
          

        
          this.showAccount = null
          this.showEventId = null
          this.showchargeGroup = null
          this.showCollection = true
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'transaction ID ' + res.data.id + ' ไม่สามารถเรียกข้อมูลได้ เนื่องจากไม่ใช่ประเภทสำหรับการตั้งค่านี้',
          })
        }
        
      }).catch(err =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
      })

      

    },
    callRouteParams(){
      if(this.$route.params.id != null && this.$route.params.function != null){
        console.log("not null have paramssssss")
        if(this.$route.params.function == 'modify'){
          this.function = 2
        }
        else if(this.$route.params.function == 'verify'){
          this.function = 5
        }
        this.id = this.$route.params.id
        this.getFee(this.$route.params.id)
      }
      else if(this.$route.params.function != null){
        console.log("not null have paramssssss")
         if(this.$route.params.function == 'add'){
          console.log("hiii Addd")
          this.function = 1
        }
        this.id = this.$route.params.id
      }
      else{
        console.log("nulllllllllllllll")
      }
    }


    
  },
  created(){
    this.callLogin();
    this.getData();
    this.callRouteParams();
  }
    
}
</script>
<style lang="scss" scoped>
.col-sm-2{
    color: rgb(106, 106, 106);
    font-size: 15px;
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