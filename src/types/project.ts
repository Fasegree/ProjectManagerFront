import type { IVacancy } from "./vacancy";

export interface IProjectWithVacancy extends IProject {
  vacancies: IVacancy[]
}
export interface IProject {
    id: number;
    name: string;
    description: string | null;
    deadline: string; 
    experience: string;
  }