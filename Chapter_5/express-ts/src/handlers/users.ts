import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { User } from "../models/entity/user";
import listUser from "../../data/users.json";
import { UserRequest } from "../models/dto/user";
import fs from "fs";

class UsersHandler {
  // Get List User
  async getUsers(req: Request, res: Response) {
    const nameQuery: string = req.query.name as string;

    let filteredUsers: User[] = listUser.map((user: User) => ({
      id: user.id,
      name: user.name || "",
    }));

    if (nameQuery) {
      filteredUsers = filteredUsers.filter((user: User) => user.name?.toLowerCase().includes(nameQuery.toLowerCase()));
    }

    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        users: filteredUsers,
      },
    };

    res.status(200).send(response);
  }

  // Create User
  async createUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    payload.profile_piture_url = (req as any)["uploaded_profile_picture_url"];

    // Payload validation
    if (!payload.name) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "Name cannot be empty",
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

    const userToCreate: User = {
      id: listUser[listUser.length - 1].id + 1,
      name: payload.name,
      profilePictureUrl: payload.profile_piture_url,
    };

    const users: User[] = listUser;
    users.push(userToCreate);

    fs.writeFileSync("./data/users.json", JSON.stringify(users));

    const response: DefaultResponse = {
      status: "CREATED",
      message: "User succesfully created",
      data: {
        created_user: userToCreate,
      },
    };

    res.status(201).send(response);
  }

  // Get User By ID
  async getUserByID(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const user = listUser.find((user) => user.id === id);

    if (!user) {
      const response: DefaultResponse = {
        status: "NOT_FOUND",
        message: "Data not found",
        data: {
          user: null,
        },
      };

      res.status(404).send(response);
    }

    const response = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        user: user,
      },
    };

    res.status(200).send(response);
  }

  // Delete by ID
  async deleteUser(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const filteredUsers: User[] = listUser.filter((user) => user.id !== id);

    fs.writeFileSync("./data/users.json", JSON.stringify(filteredUsers));

    const response: DefaultResponse = {
      status: "OK",
      message: "Success deleting data",
      data: {
        deleted_user: listUser.find((user) => user.id === id),
      },
    };

    res.status(200).send(response);
  }
}

export default UsersHandler;
