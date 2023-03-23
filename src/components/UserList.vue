<template>
    <div class = "container">
            
            <h1 class = "text-center"> Users List</h1>

            <table class = "table table-striped">
            <thead>
                <th>User ID</th>
                <th>User Name</th>
                <th>Role</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr v-for="user in users" v-bind:key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.roles[0].name }}</td>
                    <td>
                        <button class="btn btn-primary" style="margin-right: 10px;">edit</button>
                        <button class="btn btn-danger">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/* eslint-disable */
import UserService from '@/service/UserService';


export default {
    name: 'User',
    data(){
        return{
            users: []
        }
    },
    
    methods:{
        getUsers(){
            UserService.getUser().then((response) =>{
                this.users = response.data;
                console.log(response.data[0].roles[0].name)
            })
            // AccountService.getAccount().then((response) =>{
            //     this.users = response.data;
            // })
        }
    },
    created(){
        this.getUsers();
    }
}
</script>
