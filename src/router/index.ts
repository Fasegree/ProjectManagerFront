import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Projects from "../views/Projects/Projects.vue";
import CreateProject from "../views/Projects/CreateProject.vue";
import CreatedVacancy from "../views/Projects/CreatedVacancy.vue";
import CreateVacancy from "../views/Projects/CreateVacancy.vue";
import ReadyProject from "../views/Projects/ReadyProject.vue";

const routes = [

  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:id",
    name: "ReadyProject",
    component: ReadyProject,
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
    path: "/projects/:projectId/created-vacancy",
    name: "Created-vacancy",
    component: CreatedVacancy,
    meta: { requiresAuth: true },
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
      next("/");
    } else {
      next();
    }
  });
});

export default router;
