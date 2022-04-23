import { User } from '../../models';
import { successResponse, errorResponse } from '../../helpers';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require("dotenv").config();

export const register = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName, isAdmin
    } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      throw new Error('User already exists with same email');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      isAdmin
    };

    const userData = await User.create(payload);
    const userPayload = {
      id: userData.id,
    }
    const authToken = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    return successResponse(req, res, authToken);
  } catch (error) {
    console.log("======>:: error", error);
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let findUser = await User.findOne(
      {
        where: { email }
      }
    )
    if (!findUser) throw Error("Incorrect Credentials")
    const passwordCompare = await bcrypt.compare(password, findUser.dataValues.password)

    if (!passwordCompare) throw Error("Incorrect Credentials")
    const user = {
      id: findUser.id,
    }
    const authToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '24h'
    })
    return successResponse(req, res, authToken);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const showUsers = async (req, res) => {
  try {
    let findUser = await User.findAll();
    return successResponse(req, res, findUser);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    let findUser = await User.findOne(
      {
        where: { id }
      }
    )
    return successResponse(req, res, findUser);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        id
      },
    });
    if (deletedUser === 0) {
      throw Error("No user data found");
    }
    return successResponse(req, res, deletedUser);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
