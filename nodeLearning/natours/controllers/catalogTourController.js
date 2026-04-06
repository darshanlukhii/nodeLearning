const fs = require("fs");
const crypto = require("crypto");

const CATALOG_FILE = `${__dirname}/../dev-data/data/tours.json`;

/** @type {Array<Record<string, unknown>>} */
let catalogTours = JSON.parse(fs.readFileSync(CATALOG_FILE, "utf-8"));

function persistCatalog() {
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(catalogTours, null, 2), "utf-8");
}

function findIndexById(id) {
  return catalogTours.findIndex((t) => t._id === id);
}

function applyFiltersAndSort(list, query) {
  let out = [...list];
  const { difficulty, minPrice, maxPrice, sort } = query;

  if (difficulty && typeof difficulty === "string") {
    out = out.filter((t) => t.difficulty === difficulty);
  }
  if (minPrice !== undefined && minPrice !== "") {
    const n = Number(minPrice);
    if (!Number.isNaN(n)) out = out.filter((t) => Number(t.price) >= n);
  }
  if (maxPrice !== undefined && maxPrice !== "") {
    const n = Number(maxPrice);
    if (!Number.isNaN(n)) out = out.filter((t) => Number(t.price) <= n);
  }

  if (sort && typeof sort === "string") {
    const desc = sort.startsWith("-");
    const key = desc ? sort.slice(1) : sort;
    const allowed = ["name", "price", "duration", "ratingsAverage"];
    if (allowed.includes(key)) {
      out.sort((a, b) => {
        const va = a[key];
        const vb = b[key];
        if (va < vb) return desc ? 1 : -1;
        if (va > vb) return desc ? -1 : 1;
        return 0;
      });
    }
  }

  return out;
}

exports.getAllCatalogTours = (req, res) => {
  const filtered = applyFiltersAndSort(catalogTours, req.query);

  res.status(200).json({
    status: "success",
    results: filtered.length,
    requestedAt: req.requestTime,
    data: {
      catalogTours: filtered,
    },
  });
};

exports.getCatalogTour = (req, res) => {
  const tour = catalogTours.find((t) => t._id === req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid tour ID",
    });
  }
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      catalogTour: tour,
    },
  });
};

exports.createCatalogTour = (req, res) => {
  const b = req.body;
  const required = ["name", "duration", "maxGroupSize", "difficulty", "price", "summary", "description", "imageCover"];
  for (const k of required) {
    if (b[k] === undefined || b[k] === null || (typeof b[k] === "string" && !String(b[k]).trim())) {
      return res.status(400).json({
        status: "fail",
        requestedAt: req.requestTime,
        message: `Field "${k}" is required`,
      });
    }
  }

  const newTour = {
    _id: crypto.randomBytes(12).toString("hex"),
    name: String(b.name).trim(),
    duration: Number(b.duration),
    maxGroupSize: Number(b.maxGroupSize),
    difficulty: String(b.difficulty).trim(),
    price: Number(b.price),
    summary: String(b.summary).trim(),
    description: String(b.description).trim(),
    imageCover: String(b.imageCover).trim(),
    ratingsAverage: b.ratingsAverage !== undefined ? Number(b.ratingsAverage) : 4.5,
    ratingsQuantity: b.ratingsQuantity !== undefined ? Number(b.ratingsQuantity) : 0,
    images: Array.isArray(b.images) ? b.images : [],
    startDates: Array.isArray(b.startDates) ? b.startDates : [],
    guides: Array.isArray(b.guides) ? b.guides : [],
    locations: Array.isArray(b.locations) ? b.locations : [],
    startLocation:
      b.startLocation && typeof b.startLocation === "object"
        ? b.startLocation
        : {
            description: "TBD",
            type: "Point",
            coordinates: [0, 0],
            address: "TBD",
          },
  };

  if (Number.isNaN(newTour.duration) || Number.isNaN(newTour.price)) {
    return res.status(400).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "duration and price must be numbers",
    });
  }

  catalogTours.push(newTour);
  try {
    persistCatalog();
  } catch (err) {
    catalogTours.pop();
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save catalog tour",
    });
  }

  res.status(201).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      catalogTour: newTour,
    },
  });
};

exports.updateCatalogTour = (req, res) => {
  const idx = findIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid tour ID",
    });
  }

  const id = catalogTours[idx]._id;
  Object.assign(catalogTours[idx], req.body, { _id: id });

  try {
    persistCatalog();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save catalog tour",
    });
  }

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      catalogTour: catalogTours[idx],
    },
  });
};

exports.deleteCatalogTour = (req, res) => {
  const idx = findIndexById(req.params.id);
  if (idx === -1) {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      message: "Invalid tour ID",
    });
  }

  catalogTours.splice(idx, 1);

  try {
    persistCatalog();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      requestedAt: req.requestTime,
      message: "Could not save catalog tour",
    });
  }

  res.status(204).send();
};
