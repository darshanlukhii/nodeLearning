const fs = require("fs");
const crypto = require("crypto");

const REVIEWS_FILE = `${__dirname}/../dev-data/data/reviews.json`;
const USERS_FILE = `${__dirname}/../dev-data/data/users.json`;

/** @type {Array<Record<string, unknown>>} */
let reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf-8"));

function loadUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function persistReviews() {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
}

function userExists(userId) {
  return loadUsers().some((u) => u._id === userId);
}

function findReviewIndexById(id) {
  return reviews.findIndex((r) => r._id === id);
}

function filterReviews({ tourId, userId }) {
  let list = reviews;
  if (tourId) list = list.filter((r) => r.tour === tourId);
  if (userId) list = list.filter((r) => r.user === userId);
  return list;
}

exports.getAllReviews = (req, res) => {
  const { tour, user } = req.query;
  const data = filterReviews({ tourId: tour, userId: user });

  res.status(200).json({
    status: "success",
    results: data.length,
    requestedAt: req.requestTime,
    data: {
      reviews: data,
    },
  });
};

exports.getReviewsByTour = (req, res) => {
  const { tourId } = req.params;
  const data = reviews.filter((r) => r.tour === tourId);

  res.status(200).json({
    status: "success",
    results: data.length,
    requestedAt: req.requestTime,
    data: {
      reviews: data,
    },
  });
};

exports.getReview = (req, res) => {
  const review = reviews.find((r) => r._id === req.params.id);
  if (!review) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid review ID",
    });
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: { review },
  });
};

exports.createReview = (req, res) => {
  const { review: text, rating, user, tour } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Review text is required",
    });
  }
  const r = Number(rating);
  if (!Number.isInteger(r) || r < 1 || r > 5) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "rating must be an integer from 1 to 5",
    });
  }
  if (!user || typeof user !== "string") {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "user (id) is required",
    });
  }
  if (!userExists(user)) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "user does not exist",
    });
  }
  if (!tour || typeof tour !== "string" || !tour.trim()) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "tour (id) is required",
    });
  }

  const newReview = {
    _id: crypto.randomBytes(12).toString("hex"),
    review: text.trim(),
    rating: r,
    user,
    tour: tour.trim(),
  };

  reviews.push(newReview);
  try {
    persistReviews();
  } catch (err) {
    reviews.pop();
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save review",
    });
  }

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: { review: newReview },
  });
};

exports.updateReview = (req, res) => {
  const idx = findReviewIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid review ID",
    });
  }

  const current = reviews[idx];
  const { review: text, rating, user, tour } = req.body;

  if (text !== undefined) {
    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "Review text cannot be empty",
      });
    }
    current.review = text.trim();
  }
  if (rating !== undefined) {
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "rating must be an integer from 1 to 5",
      });
    }
    current.rating = r;
  }
  if (user !== undefined) {
    if (typeof user !== "string" || !userExists(user)) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "user does not exist",
      });
    }
    current.user = user;
  }
  if (tour !== undefined) {
    if (typeof tour !== "string" || !tour.trim()) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: "tour cannot be empty",
      });
    }
    current.tour = tour.trim();
  }

  reviews[idx] = current;
  try {
    persistReviews();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save review",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: { review: current },
  });
};

exports.deleteReview = (req, res) => {
  const idx = findReviewIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid review ID",
    });
  }
  reviews.splice(idx, 1);
  try {
    persistReviews();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save review",
    });
  }
  res.status(204).send();
};
