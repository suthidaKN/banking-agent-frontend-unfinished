<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },
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
            this.$cookies.remove('id');
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

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>B</div>
        <div>A</div>
        <!-- <img class="mt-4" src="@/images/bill.png" style="width: 45px; height: 45px;"/> -->
      </span>
      <span v-else>            
        <img src="@/images/fees.png" style="width: 100px; height: 100px;"/>
      </span>
    </h1>

    <!-- <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink> -->
    <SidebarLink to="/ConfigurationList" icon="fas fa-file-invoice">Configuration List</SidebarLink>
    <SidebarLink to="/Configuration" icon="fas fa-file-invoice">Configuration</SidebarLink>
    <SidebarLink to="/ChargeCollectionList" icon="fas fa-columns">Collection List</SidebarLink>
    <SidebarLink to="/ChargeCollection" icon="fas fa-columns">Charge Collection</SidebarLink>
    <SidebarLink to="/customerProfile" icon="fas fa-chart-bar">Customer Profile</SidebarLink>
    <SidebarLink to="/transaction" icon="fas fa-chart-bar">Transaction</SidebarLink>
    <a @click="logout" class="link" > 
      <i class="icon fa-solid fa-right-from-bracket"></i>
      <transition name="fade">
      <span v-if="!collapsed">
        Logout
      </span>
    </transition></a>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2D53BB;
  --sidebar-item-hover: #60a5fa;
  --sidebar-item-active: #153079;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.5em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 2.5em;

  color: white;
  text-decoration: none;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link.active {
  background-color: var(--sidebar-item-active);
}
.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}
</style>
