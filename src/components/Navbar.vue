<template>
        <nav class="navbar navbar-expand-sm navbar-dark">
            <div class="container-fluid">
            <img src="../images/fees.png" style="width: 50px; height: 50px;"/>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mynavbar">
                <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <router-link to="/ChargeCollection" class="nav-link ">Custom Charge Collection</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/Configuration" class="nav-link">Custom Fee Rules Configuration</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/customerProfile" class="nav-link">Customer Payment Profile</router-link>
                </li>
                </ul>
                <a @click="logout" class="nav-link" style="background-color: #FF8C8C; color: #FFFFFF; padding: 6px 18px 6px; border-radius: 15px; font-weight: 600;" >Logout</a>
            </div>
            </div>
        </nav>
</template>

<script>

export default {
  /* eslint-disable */
  name: 'App',
  methods:{
    logout: function () {

      Swal.fire({
        title: 'Are you sure?',
        text:'you want to logout?',
        showCancelButton: true,
        confirmButtonText: 'logout',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Logout!', '', 'success').then(() =>{
            this.$cookies.remove('token');
            this.$cookies.remove('username');
            this.$cookies.remove('role');
            this.$router
              .push({ path: '/login' })
              .then(() => { this.$router.go(0) })
          })
        } 
      })
    },
    
  }
  
}
</script>
<style scoped>

  .navbar{
    background-color: #6374B6; 
    padding: 12px; 
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

</style>