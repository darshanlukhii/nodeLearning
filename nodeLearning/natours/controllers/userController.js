const fs = require("fs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const USERS_FILE = `${__dirname}/../dev-data/data/users.json`;

/** @type {Array<Record<string, unknown>>} */
let users = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));

function persistUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function omitPassword(user) {
  if (!user || typeof user !== "object") return user;
  const { password: _p, ...rest } = user;
  return rest;
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function findUserIndexById(id) {
  return users.findIndex((u) => u._id === id);
}

function emailTaken(email, exceptId) {
  const e = email.trim().toLowerCase();
  return users.some((u) => u.email.toLowerCase() === e && u._id !== exceptId);
}

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    requestedAt: req.requestTime,
    data: {
      users: users.map(omitPassword),
    },
  });
};

exports.getUser = (req, res) => {
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user: omitPassword(user),
    },
  });
};

exports.createUser = (req, res) => {
  const { name, email, password, role, active, photo } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Name is required",
    });
  }
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Valid email is required",
    });
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Password is required (min 8 characters)",
    });
  }
  if (emailTaken(email, null)) {
    return res.status(409).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Email already registered",
    });
  }

  const newUser = {
    _id: crypto.randomBytes(12).toString("hex"),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: typeof role === "string" && role.trim() ? role.trim() : "user",
    active: typeof active === "boolean" ? active : true,
    photo: typeof photo === "string" && photo.trim() ? photo.trim() : "default.jpg",
    password: bcrypt.hashSync(password, 12),
  };

  users.push(newUser);
  persistUsers();

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user: omitPassword(newUser),
    },
  });
};

exports.updateUser = (req, res) => {
  const idx = findUserIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }

  const { name, email, password, role, active, photo } = req.body;
  const current = users[idx];

  if (email !== undefined) {
    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "Valid email is required",
      });
    }
    if (emailTaken(email, current._id)) {
      return res.status(409).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "Email already registered",
      });
    }
    current.email = email.trim().toLowerCase();
  }
  if (name !== undefined) {
    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "Name cannot be empty",
      });
    }
    current.name = name.trim();
  }
  if (password !== undefined) {
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "Password must be at least 8 characters",
      });
    }
    current.password = bcrypt.hashSync(password, 12);
  }
  if (role !== undefined) {
    if (typeof role !== "string" || !role.trim()) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "Role cannot be empty",
      });
    }
    current.role = role.trim();
  }
  if (active !== undefined) {
    if (typeof active !== "boolean") {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "active must be a boolean",
      });
    }
    current.active = active;
  }
  if (photo !== undefined) {
    if (typeof photo !== "string" || !photo.trim()) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "photo cannot be empty",
      });
    }
    current.photo = photo.trim();
  }

  users[idx] = current;
  persistUsers();

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      user: omitPassword(current),
    },
  });
};

exports.deleteUser = (req, res) => {
  const idx = findUserIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid ID",
    });
  }
  users.splice(idx, 1);
  persistUsers();
  res.status(204).send();
};
