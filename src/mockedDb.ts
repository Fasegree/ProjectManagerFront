import type { IProject } from "./types/project";
import type { IVacancy } from "./types/vacancy";

const projectMoc: IProject[] = [
  {
  id: 1,
  name: "Новый лендинг",
  description: "Создание посадочной страницы для продукта",
  deadline: "2025-05-01T00:00:00Z",
  experience: "3+ года"
},
];

const vacancyMoc: IVacancy[] = [
  {
  id: 101,
  project_id: 1,
  name: "Frontend-разработчик",
  description: "Работа с Vue 3 и Tailwind CSS",
  field: "разработка",
  country: "Россия",
  experience: "2+ года"
},
];

export {projectMoc, vacancyMoc}