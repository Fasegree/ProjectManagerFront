# Used stack:

Vue 3 + TypeScript + Vite + TailWind + UI: shadcn/Vue

# About project:

This repository contains a test task Web App for simple project management. Developed for company "Trood Comunity".

# Features:

## Technologies Used

This application leverages the following technologies to provide a seamless and efficient user experience:

**1. Local Storage for Form Data Persistence:**

   - **Description:** Input data entered by users in all form fields is automatically saved locally within their browser's Local Storage.
   - **Benefit:** This feature enhances user convenience by preserving entered information even if the page is accidentally closed, the internet connection is interrupted, or the user wishes to complete the form later. It prevents data loss and saves time by eliminating the need for re-entry.

**2. CRUD Operations for Projects & Vacancies:**

   - **Description:** The application implements full Create, Read, Update, and Delete (CRUD) functionality for managing both Projects and Vacancies.
   - **Functionality:** This allows users to:
     - **Create:** Add new projects with relevant details and post new job vacancies with specific requirements.
     - **Read:** View comprehensive lists and detailed information about existing projects and vacancies.
     - **Update:** Edit and modify the details of existing projects and vacancies as needed.
     - **Delete:** Remove projects and vacancies from the system.

**3. Gmail Authorisation via Firebase Realtime Database (RTDB):**

   - **Description:** User authentication is securely handled through Gmail using Firebase Authentication, with user data stored in the Firebase Realtime Database.
   - **Process:** Users can easily and securely sign in using their Google accounts. Firebase Authentication manages the authentication flow, and user profiles are stored and managed in the real-time, cloud-based Firebase Realtime Database. This provides a robust and scalable solution for user identity management.

**4. Mobile Adaptive Interface:**

   - **Description:** The user interface is designed to be fully responsive and adapt seamlessly to various mobile devices, screen sizes, and orientations.
   - **Implementation:** Utilizing modern web development techniques such as fluid layouts, media queries, and flexible images, the application ensures an optimal viewing and interaction experience across smartphones and tablets. This guarantees usability and accessibility regardless of the device being used.

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
