<template>
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada', serif;">
    <div class = "container col-md-8 p-5 bg-light my-md-5 rounded-5">
            
            <h2 class = "text-start"> Customer Payment Profile</h2>
            <div class="input-container row">
                <input type="text" placeholder="Search..." v-model="authorNameSearchString" />
                <!-- <i class="fas fa-search" style="color: #b8bfd6;"></i> -->
            </div>
            <div class="row my-md-2 py-md-2 rounded-4 text-start shadow text-white" style="background-color:#033495 ;">
                <div class="col fs-6 ps-md-5">
                    ID
                </div>
                <div class="col fs-6 ps-md-5" style="border-left: 3px solid #FFFFFF">
                    Name
                </div>
                <div class="col-2 text-center" style="border-left: 3px solid #FFFFFF">
                    Actions
                </div>
            </div>
            <div class="row my-md-1 bg-white py-md-3 rounded-4 text-start shadow" v-for="cus in filteredCustomer"  v-bind:key="cus.id">
                <div class="col fs-6 ps-md-5">
                    {{cus.id}}
                </div>
                <div class="col fs-6 ps-md-5" style="border-left: 3px solid #BABABA">
                    {{ cus.firstName +"\t"+cus.lastName }}
                </div>
                <div class="col-2 text-center " style="border-left: 3px solid #BABABA">
                    <a @click="edit(cus.id)" style="cursor: pointer;"><i class="fa fa-regular fa-pen-to-square fa-xl"></i></a>
                </div>
            </div>
    </div>
    </div>
</template>
<script>
/* eslint-disable */
import DataService from '@/service/DataService';
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  },
    name: 'User',
    data(){
        return{
            authorNameSearchString: "",
		    customer: null
        }
    },
    mounted() {
		    DataService.getAllCustomer()
			.then(response => {
				this.customer = response.data;
			})
			.catch(error => console.log(error))
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
        }
	 },
    
    methods:{
        edit(id){
            // this.$router.push('/modify/'+id )
            this.$router
            .push({ path: '/modify/'+id })
            // .then(() => { this.$router.go(0) })
        },
        callLogin(){
            if(this.$cookies.get('token') == null){
                this.$router.push('/login' )
            }
        },
    },
    created(){
        this.callLogin();
    }
}

</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@300&family=Noto+Sans+JP:wght@300&family=Noto+Serif+Kannada:wght@300;400&family=Quicksand&display=swap');
    .fa:hover {
        color: rgb(148, 148, 148);
    }
</style>
<style scoped>
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

.input-container {
	border-radius: 10px;
	background: #FFFFFF;
	padding: 5px;
    margin:1.5rem  0.25rem;
    border-style: solid ;
    border-color:#697a98
}

.input-container input {
	border: none;
	background: transparent;
	color: rgb(3, 0, 96);
	padding: 4px 12px;
	font-size: 15px;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #b8bfd6;
  opacity: 1; /* Firefox */
}



</style>
