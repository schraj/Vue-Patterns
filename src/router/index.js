import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Survey from "@/components/Survey";

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/survey",
      name: "Survey",
      component: Survey
    },
    {
      path: "/",
      redirect: '/home'
    },
  ]
});