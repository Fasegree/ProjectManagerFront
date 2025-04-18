
// import type { IProject } from "../types/project";
// import type { IVacancy } from "../types/vacancy";

  
//   export const PROJECTS_KEY = 'local_projects';
//   export const VACANCIES_KEY = 'local_vacancies';
  
//   function saveToStorage<T>(key: string, data: T[]): void {
//     localStorage.setItem(key, JSON.stringify(data));
//   }
  
//   function loadFromStorage<T>(key: string): T[] {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : {};
//   }
  
  
//   export function getProjectForm(): IProject {
//     return loadFromStorage<IProject>(PROJECTS_KEY);
//   }
  
//   export function saveProjectForm(projects: IProject[]): void {
//     saveToStorage(PROJECTS_KEY, projects);
//   }
  

  
//   export function getVacancies(): IVacancy[] {
//     return loadFromStorage<IVacancy>(VACANCIES_KEY);
//   }
  
//   export function saveVacancies(vacancies: IVacancy[]): void {
//     saveToStorage(VACANCIES_KEY, vacancies);
//   }
  
//   export function addVacancy(vacancy: IVacancy): void {
//     const vacancies = getVacancies();
//     vacancies.push(vacancy);
//     saveVacancies(vacancies);
//   }
  