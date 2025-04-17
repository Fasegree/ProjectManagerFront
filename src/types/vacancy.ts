// types/vacancy.ts

export interface IVacancy {
    id: number;
    project_id: number;
    name: string;
    description: string | null;
    field: string | null;
    country: string | null;
    experience: string;
  }
  