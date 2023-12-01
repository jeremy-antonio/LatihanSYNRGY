import express, { Application, NextFunction, Request, Response } from "express";
import UsersHandler from "./handlers/users";
import AuthMiddleware from "./middlewares/auth";
import uploadFile from "./utils/uploadFile";
import uploadCloud from "./utils/uploadCloud";

const app: Application = express();
const PORT: number = 8081;

// Add middleware to get the body from the request
// app.use(express.json());

// Init Handlers
const usersHandlers = new UsersHandler();

// Routes
// Get List User
app.get("/api/users", usersHandlers.getUsers);

// Create New User
app.post("/api/users", uploadFile.single("profile_picture_url"), usersHandlers.createUser);

//  Get User by ID
app.get("/api/users/:id", usersHandlers.getUserByID);

// Delete Existing User
app.delete("/api/users/:id", usersHandlers.deleteUser);

// TODO: Endpoint Get User by Id

// TODO: Endpoint Create User
// Create an endpoint for creating user data
// Also need to integrate with cloudinary (please check in PPT)
// What you need to store:
// {
//   "id": 1,
//   "name": "arras",
//   "profile_photo_url": "URL_FROM_CLOUDINARY" // This is the additional data
// }
// Please makesure you can get values from form data

// TODO: Endpoint Get List User
// Change response into new structure
// {
//   "id": 1,
//   "name": "arras",
//   "profile_photo_url": "URL_FROM_CLOUDINARY" // This is the additional data
// }
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
