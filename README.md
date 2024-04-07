# Quik-Note. A Notes taking Application

Welcome to the Quik-Note! This application allows users to create accounts, manage collections, and organize notes within those collections and can download the notes in PDF format as well. Whether you're a student, professional, or someone who loves to keep things organized, this app will help you stay on top of your notes effortlessly.

## Features

- User authentication: Users can create accounts and securely log in to manage their collections and notes.
- Collection management: Users can create, edit, and delete collections to organize their notes efficiently.
- Note creation: Within each collection, users can create, edit, and delete notes with ease.
- Download PDF of notes: Users can download the notes that they have written and share it to their teachers or friends.

## Technologies Used

### Frontend

- **Next.js**: React framework for building server-side rendered (SSR) and static web applications.
- **Tailwind CSS**: A utility-first CSS framework for quickly building custom designs.
- **Tanstack Query**: A powerful and versatile data-fetching library for React applications.
- **React Hook Form**: A library for flexible and efficient form validation in React.
- **Jotai**: State management library for React applications.
- **TypeScript**: A statically typed superset of JavaScript that enhances code quality and developer productivity.

### Backend

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma**: A modern database toolkit for TypeScript and Node.js that simplifies database access with type safety.
- **SQLite**: A lightweight, serverless, and self-contained SQL database engine.
- **PassportJS**: Authentication middleware for Node.js that provides various authentication strategies.

## Getting Started

To run the project on your local machine, follow these steps:

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/NxtNinja/Quik-Note.git <Folder_name>
   ```
2. Navigate to the backend directory:
   ```
   cd <Folder_name>/notes-app-server
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up the SQLite database:
   ```
   npm run prisma:apply
   ```
5. Navigate to the frontend directory:
   ```
   cd ../notes-app-client
   ```
6. Install dependencies:
   ```
   npm install
   ```

### Running the Development Servers

1. Start the backend server:
   ```
   npm run start:dev
   ```
2. Start the frontend server:
   ```
   npm run dev
   ```

Now you can access the application in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

---
