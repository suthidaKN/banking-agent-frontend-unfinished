<template>
    <sidebar/>
    <div :style="{ 'margin-left': sidebarWidth }" style="font-family: 'Noto Serif Kannada', serif;">
        <div class="container col-md-10 p-5 bg-light my-md-5 rounded-5">
            <h1>Custom Configuration List</h1>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { sidebarWidth } from '@/components/sidebar/state'
export default {

    setup() {
        return { sidebarWidth }
    },
    components: { Sidebar },

}
</script>

<style>

</style>