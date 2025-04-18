import type { IProject } from "../types/project";
import type { IVacancy } from "../types/vacancy";

const BASE_URL = "https://projectmanagerbackend-pxfz.onrender.com";

export const getProjects = async (): Promise<IProject[]> => {
  const response = await fetch(`${BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
};

export const getProjectById = async (id: number): Promise<IProject> => {
  const response = await fetch(`${BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await response.json();
};

export const fetchCreateProject = async (project: IProject) => {
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchUpdateProject = async (project: IProject) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
export const fetchDeleteProject = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const getVacancies = async (projectId:number): Promise<IVacancy[]> => {
  const response = await fetch(`${BASE_URL}/projects/${projectId}/vacancies`);
  if (!response.ok) {
    throw new Error("Failed to fetch vacancies");
  }
  return await response.json();
};

export const fetchCreateVacancy = async (vacancy:IVacancy) => {
  try {
    const response = await fetch(`${BASE_URL}/projects/${vacancy.project_id}/vacancies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vacancy),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
  }
}

export const fetchUpdateVacancy = async (vacancy: IVacancy) => {
  try {
    const response = await fetch(`${BASE_URL}/vacancies/${vacancy.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vacancy),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const fetchDeleteVacancy = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/vacancies/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
