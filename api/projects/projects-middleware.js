// add middlewares here related to projects
const Projects = require("./projects-model");

function isValidProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res
          .status(404)
          .json({ message: "Project with specific ID was not found" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({
          message:
            "There was an error retrieving the project from the database",
        });
    });
}

function isValidProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (name && description && completed != null) {
    next();
  } else {
    res.status(400).json({ message: "Please fill out all required fields" });
  }
}

module.exports = {
  isValidProjectId,
  isValidProject,
};
