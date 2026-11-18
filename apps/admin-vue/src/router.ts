import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import StudioView from "./views/StudioView.vue";
import StudiosView from './views/StudiosView.vue';
import AppLayout from "./layout/AppLayout.vue";
import NotFoundView from "./views/NotFoundView.vue";
import StudioCreateView from './views/StudioCreateView.vue'
import getCookie from "./services/Cookies";

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
          path: "/studios",
          component: StudiosView,
        },
        {
          path: "/studio",
          name: 'StudioCreate',
          component: StudioCreateView,
        },
        {
          path: "/studio/:id",
          name: 'StudioDetails',
          component: StudioView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (from.path !== "/404" && to.path !== '/404') {
    const cookie = getCookie(COOKIE_NAME);
    if (!cookie) {
      window.location.href = import.meta.env.VITE_AUTH_URL+"/login?r="+import.meta.env.VITE_APP_URL;
    }
  }
});

export { router };
