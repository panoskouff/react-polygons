
# React Polygons 

https://react-polygons.vercel.app

A polygon drawing app built using React and Next.js

<img width="640" alt="Screenshot 2023-11-20 at 07 34 06" src="https://github.com/panoskouff/technical-assignment-react-polygons/assets/107889674/d544b92c-d7c1-4116-8d06-c0b88f1957b3">

# Getting Started

### Prerequisites

Before setting up "React Polygons," ensure you have the following:
- Node.js (version 18)
- pnpm (or remove pnpm-lock and use your package manager of choice)

### Installation

1. **Clone the Repository**

   Clone the repository to your local machine using Git:

   ```sh
   git clone https://github.com/panoskouff/technical-assignment-react-polygons.git
   ```

2. **Install Dependencies**

   Navigate to the cloned directory and use `pnpm` to install the dependencies:

   ```sh
   cd technical-assignment-react-polygons
   pnpm install
   ```

3. **Setting Up GitHub OAuth for Authentication**

   - Navigate to 'Developer settings' > 'OAuth Apps' in your GitHub account settings.
   - Create a new OAuth App with the following details:
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Note the 'Client ID' and 'Client Secret' after creation.

4. **Configure Environment Variables**

   Add the following to the `.env` file in the root of the project:

   ```env
   GITHUB_ID=<Your GitHub Client ID>
   GITHUB_SECRET=<Your GitHub Generated Secret>
   ```

   Replace placeholders with your GitHub OAuth credentials.

5. **Start the Application**

   Launch the application using:

   ```sh
   pnpm run dev
   ```

   Access the app at `http://localhost:3000`.

### Folder Structure

An overview of the folders within the `src` directory.

- `actions`: Contains our server actions.
- `app`: Includes core application setup and configuration files.
  - `api`: Contains API-related configurations and utilities.
    - `auth`: Holds authentication-related logic, specifically the integration with NextAuth.
- `atoms`: Stores small, reusable components or React hooks that can be used across the application.
- `components`: Contains React components used to build the user interface.
- `context`: Includes React context definitions for global state management, like the polygons context.
- `hooks`: Contains custom React hooks to encapsulate and reuse stateful logic.
- `state`: Manages the application's state.
- `tests`: Includes unit and integration tests to ensure application reliability and stability.
- `theme`: Contains theming configurations and style definitions, typically used across the entire application.
- `types`: Defines TypeScript types and interfaces, especially for state management structures.
- `utils`: A utility folder for common helper functions and tools that can be used throughout the application.

# Implementation Notes

**Summary**: 
The application is an event-driven, MVC-style front-end. It incorporates a reducer pattern for Flux-like state management and uses React for managing presentational state. Operations related to mouse movement leverage React refs, and user authentication is handled via NextAuth. User data is temporarily stored in the server's memory.

**Detailed Description**:

### SVG Elements Positioning

The application features a full-screen SVG element. Within this, polygons are created and modified using `<g>` tags. The full-screen SVG is designed so that the coordinates of SVG elements directly align with the pointer's coordinates, simplifying the translation of mouse position to SVG placement.

### State Management for Our View

SVG elements are managed through React, forming the core of our view. The state, representing our polygons, is managed using the `useReducer` hook within a React context. This allows for easy access to the state and dispatch function across the application, eliminating the need for prop drilling. The application follows the unidirectional data flow pattern of Flux, where user actions lead to dispatch events, state updates, and React re-renders.

### Optimizing Renders

For operations like "move-polygon" and "move-vertex", we optimize performance by bypassing the usual render cycle. Using element references obtained onMouseDown, we perform translations onMouseMove and update the state onMouseUp. This approach prevents unnecessary re-renders during element movement, enhancing app performance.

### Mouse Event Handling

Considering the potential for numerous polygons and SVG elements on-screen, we utilize event delegation rather than individual handlers for each element. Four event handlers are attached to the parent SVG element, covering all polygon mouse interactions. The handlers identify the clicked SVG element by checking `event.target.tagName`.

### Accessing Data in Event Handlers

To identify the specific polygon, line, or circle interacted with, we use two strategies:
- Employing HTML's native data attributes, we assign `data-polygon-id` to every `<g>` element and `data-vertex-index` to each circle.
- Ensuring that all SVG elements forming a polygon are direct children of a `<g>` element.

This approach enables us to determine the relevant polygon or adjacent lines without additional DOM reads, relying on our application's state.

### Authentication

Authentication is handled using NextAuth with a GitHub provider. GitHub was selected for its simplicity in creating new OAuth applications. Additional configuration exposes the GitHub user ID, linking each user's saved work to their account.

### Saving User Work

User progress is saved through a server action, triggered by a button in the UI. This action passes the polygon state to the server, where it's associated with the user's ID and stored in the server's memory. This storage method implies that saved work is not persistent across server restarts or in different server instances, which is an expected limitation.

### Loading User Work

Upon user authentication, the server retrieves the user's ID from the session. If an entry exists in the server's memory, the corresponding polygon state is passed as a prop to the client component. This sets the initial state in our context/useReducer, allowing the user to resume where they left off.
