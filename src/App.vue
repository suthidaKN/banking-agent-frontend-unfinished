<!-- // eslint-disable-next-line
<template>
 <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  /* eslint-disable */
  name: 'App',
  methods:{
    callLogin(){
      if(this.$cookies.get('token') == null){
        this.$router.push({ path: '/login' })
      }
    }
  },
  created(){
    this.callLogin();
  }
 
}
</script> -->
<script>
export default {
  methods:{
    callLogin(){
      if(this.$cookies.get('token') == null){
        this.$router.push({ path: '/login' })
      }
    }
  },
  created(){
    this.callLogin();
  }
}
</script>
<template>
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
