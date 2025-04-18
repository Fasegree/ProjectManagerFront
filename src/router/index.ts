import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProjectsPage from "../views/Projects/ProjectsPage.vue";
import CreateProject from "../views/Projects/CreateProject.vue";
import CreateVacancy from "../views/Projects/CreateVacancy.vue";
import EditProjectPage from "../views/Projects/EditProjectPage.vue";
import HomePage from "../views/Projects/HomePage.vue";

const routes = [

  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:id",
    name: "EditProjectPage",
    component: EditProjectPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/create-project",
    name: "CreateProjects",
    component: CreateProject,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:projectId/create-vacancy",
    name: "CreateVacancy",
    component: CreateVacancy,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: CreateVacancy,
    meta: { requiresAuth: false },
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user: any) => {
    unsubscribe();

    if (requiresAuth && !user) {
      next("/login");
    } else {
      next();
    }
  });
});

export default router;
