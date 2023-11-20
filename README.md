
# React Polygons

A polygon drawing app built using React and Next.js

<img width="640" alt="Screenshot 2023-11-20 at 07 34 06" src="https://github.com/panoskouff/technical-assignment-react-polygons/assets/107889674/d544b92c-d7c1-4116-8d06-c0b88f1957b3">

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
