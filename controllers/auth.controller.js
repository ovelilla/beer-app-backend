import User from "../models/user.model.js";
import validator from "validator";
import generateJWT from "../utils/generateJWT.util.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const errors = {};
  const message = {};

  if (!email) {
    const error = new Error("El email es obligatorio");
    errors.email = error.message;
  } else if (!validator.isEmail(email)) {
    const error = new Error("El email no es válido");
    errors.email = error.message;
  }

  if (!password) {
    const error = new Error("El password es obligatorio");
    errors.password = error.message;
  } else if (password.length < 6) {
    const error = new Error("El password debe contener al menos 6 caracteres");
    errors.password = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      message.text = "El email ya está registrado";
      message.type = "error";
      return res.status(400).json({ message });
    }

    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    message.text = "Usuario creado correctamente";
    message.type = "success";

    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = {};
  const message = {};

  if (!email) {
    const error = new Error("El email es obligatorio");
    errors.email = error.message;
  } else if (!validator.isEmail(email)) {
    const error = new Error("El email no es válido");
    errors.email = error.message;
  }

  if (!password) {
    const error = new Error("El password es obligatorio");
    errors.password = error.message;
  } else if (password.length < 6) {
    const error = new Error("El password debe contener al menos 6 caracteres");
    errors.password = error.message;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      message.text = "Usuario o password incorrectos";
      message.type = "error";
      return res.status(404).json({ message });
    }

    if (!(await findUser.comparePassword(password))) {
      message.text = "Usuario o password incorrectos";
      message.type = "error";
      return res.status(404).json({ message });
    }

    const token = generateJWT(findUser.id);

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      partitioned: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      expires: new Date(0),
      httpOnly: true,
      partitioned: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const auth = async (req, res) => {
  const { user } = req;
  res.status(200).json(user);
};
