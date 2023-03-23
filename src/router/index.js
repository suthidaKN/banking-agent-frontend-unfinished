import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/LoginForm.vue";
import Configuration from "@/views/CustomFeeRulesConfiguration.vue";
import ChargeCollection from "@/views/CustomChargeCollection.vue";
import modifyCus from "@/views/ModifyCustomerPaymentProfile.vue"
// import profile from "@/components/CustomerPaymentProfileAll.vue";

const routes = [
    /* eslint-disable */
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Configuration",
    name: "Configuration",
    component: Configuration,
  },
  {
    path: "/ConfigurationList",
    name: "ConfigurationList",
    component: () => import('@/views/CustomFeeRulesConfigurationList.vue'),
  },
  {
    path: "/ChargeCollection",
    name: "Collection",
    component: ChargeCollection,
  },
  {
    path: "/ChargeCollection/:function/:id",
    name: "ChargeCollection",
    component: ChargeCollection,
  },
  {
    path: "/ChargeCollection/:function",
    name: "AddChargeCollection",
    component: ChargeCollection,
  },
  {
    path: "/ChargeCollectionList",
    name: "ChargeCollectionList",
    component: () => import('@/views/CustomChargeCollectionList.vue'),
  },
  {
    path: "/customerProfile",
    name: "CustomerPaymentProfile",
    component: () => import('@/views/CustomerPaymentProfileAll.vue')
    // component:profile
  },
  {
    path:"/modify/:id",
    name: "ModifyCustomerPaymentProfile",
    component:modifyCus
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;