import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProjectsPage from "../views/Projects/ProjectsPage.vue";
import EditProjectPage from "../views/Projects/EditProjectPage.vue";
import HomePage from "@/views/Other/HomePage.vue";
import CreateProjectPage from "@/views/Projects/CreateProjectPage.vue";
import CreateVacancyPage from "@/views/Vacancies/CreateVacancyPage.vue";
import VacanciesPage from "@/views/Vacancies/VacanciesPage.vue";
import VacancyCardDetail from "@/components/Vacancy/VacancyCardDetail.vue";
import EditVacancyPage from "@/views/Vacancies/EditVacancyPage.vue";
import LoginPage from "@/views/Other/LoginPage.vue";
import NotFFound404Page from "@/views/Other/NotFFound404Page.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects",
    name: "ProjectsPage",
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
    name: "CreateProjectsPage",
    component: CreateProjectPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:projectId/create-vacancy",
    name: "CreateVacancyPage",
    component: CreateVacancyPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/vacancies",
    name: "Vacancies",
    component: VacanciesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:projectId/vacancy/:vacancyId",
    name: "VacancyCardDetail",
    component: VacancyCardDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:projectId/edit-vacancy/:vacancyId",
    name: "EditVacancyPage",
    component: EditVacancyPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/people",
    name: "People",
    component: NotFFound404Page,
    meta: { requiresAuth: true },
  },
  {
    path: "/tests",
    name: "Tests",
    component: NotFFound404Page,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: NotFFound404Page,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function getCurrentUser(): Promise<any> {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
}

router.beforeEach(async (to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next("/login");
  } else if (to.path === "/login" && user) {
    next("/");
  } else {
    next();
  }
});

export default router;
