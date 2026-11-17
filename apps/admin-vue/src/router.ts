import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import StudioView from "./views/StudioView.vue";
import AppLayout from "./layout/AppLayout.vue";
import NotFoundView from "./views/NotFoundView.vue";

const COOKIE_NAME = "cp_session";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '404',
      path: "/404",
      component: NotFoundView,
    },
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          component: HomeView,
        },
        {
          path: "/studio",
          component: StudioView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (from.path !== "/404" && to.path !== '/404') {
  console.log(document.cookie);
    // const cookie = await cookieStore.get(COOKIE_NAME);
    // if (!cookie) {
    //   return "/404" ;
    // }
  }
});

export { router };
