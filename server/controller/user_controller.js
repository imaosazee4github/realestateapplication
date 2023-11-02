import User from "../models/user-model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const updateUserProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You are not Unauthorized"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUserProfile = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...others } = updateUserProfile._doc;

    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const test = (req, res) => {
  res.send("Hello World!");
};
