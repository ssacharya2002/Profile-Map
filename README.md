# Profile-Map Application

**Description**

Profile-Map is a web application built with React.js for the frontend and Node.js with Express for the backend. 

The application maps and displays user profiles with associated details. This repository contains the code for both the frontend and backend components, organized into separate directories.

**Getting Started**

Follow these steps to set up and run the application on your local machine.

**Prerequisites**

Ensure you have the following tools installed:

*   Node.js (v16 or later)
*   npm or pnpm

**Installation Steps**

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/ssacharya2002/Profile-Map
    cd Profile-Map
    ```

2.  **Create .env Files:**

    *   Create a `.env` file in the root folder for the frontend environment variables.
    *   Create a `.env` file inside the `server` folder for the backend environment variables.

    **Example structure for env files:**

    *   **Root .env (Frontend):**

        ```
        VITE_API_URL=http://localhost:3000
        VITE_MAPBOX_TOKEN= Your-Mapbox-Token 
        ```

    *   **Server .env (Backend):**

        ```
        DATABASE_URL=postgres-database-url
        ```

3.  **Install Dependencies:**

    *   **Frontend (Root Folder):**

        ```bash
        npm install
        ```

    *   **Backend (Server Folder):**

        ```bash
        cd server
        npm install

        cd src
        npx prisma generate
        npx prisma db push

        ```

4.  **Run the Application:**

    *   **Backend: Start the Node.js server.**

        ```bash
        cd server
        npm run dev
        ```

    *   **Frontend: Start the React development server:**

        ```bash
        npm run dev
        ```

5.  **Access the Application:** Open your browser and navigate to `http://localhost:5173` to view the application.