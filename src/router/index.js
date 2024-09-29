import Vue from "vue"
import VueRouter from "vue-router"
// 注册vue-router中的所有组件
Vue.use(VueRouter)




const Home = () => import("@/App.vue")
const PointInspectionStandard = () => import("@/views/pointInspectionStandard/index.vue")
const router = new VueRouter({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/pointInspectionStandard",
          name: "PointInspectionStandard",
          component: PointInspectionStandard
        }

      ]
    },

  ]
})

export default router


