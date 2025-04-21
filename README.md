# Used stack:

Vue 3 + TypeScript + Vite + TailWind + UI: shadcn/Vue

# About project:

This repository contains a test task Web App for simple project management. Developed for company "Trood Comunity".

# Features:

1. LS saved input data in all fields of the forms;
2. CRUD Projects & Vacancies;
3. Authorisation with Gmail;

## Setup Instructions:

1. Clone the Repository:

````bash

git clone git@github.com:Fasegree/ProjectManagerFront.git
git clone git@github.com:Fasegree/ProjectManagerBackend.git

2. Install Dependencies:

```bash
npm install

3. Run the Application:

```bash
npm run dev

````

The server will start on http://localhost:5173.

App
https://project-manager-front-eta.vercel.app/login

backend
https://projectmanagerbackend-pxfz.onrender.com

fix Баг
При изменении даты Passed проекта, он не переходит в категорию Активный. Проверять с текущей датой и емит родителю на фетч проектов. или в компоненте вызывать глобальный фетч на useProjectsStore
