const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

const isUserAlreadyRegister = async (username) => {
  const user = await User.findOne({ username });
  return !!user;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

const login = async (_, { username, password }) => {
  const { errors, valid } = validateLoginInput(username, password);

  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  const user = await User.findOne({ username });
  if (!user) {
    errors.general = "User not found";
    throw new UserInputError("User not found", { errors });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    errors.general = "Wrong credentials";
    throw new UserInputError("Wrong credentials", { errors });
  }

  const token = generateToken(user);
  return {
    ...user._doc,
    id: user._id,
    token,
  };
};

const register = async (
  _,
  { registerInput: { username, email, password, confirmPassword } }
) => {
  // validate user data
  const { errors, valid } = validateRegisterInput(
    username,
    email,
    password,
    confirmPassword
  );
  if (!valid) {
    throw new UserInputError("Errors", { errors });
  }

  // Make sure user doesn't already exist
  if (await isUserAlreadyRegister(username)) {
    throw new UserInputError("username is taken", {
      errors: { username: "This username is taken" },
    });
  }

  //  hash the password and create an auth token
  password = await bcrypt.hash(password, 12);

  const newUser = new User({
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
  });

  const res = await newUser.save();

  const token = generateToken(res);

  return {
    ...res._doc,
    id: res._id,
    token,
  };
};

module.exports = {
  Mutation: {
    login,
    register,
  },
};
