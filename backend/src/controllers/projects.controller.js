import Project from "../models/project.model.js";

/**
 * Controller to get all the projects
 * @param {import("express").Response} res - Express response
 * @returns list of all the projects
 */
export const getAllProjects = async (req, res) => {
  try {
    // find projects and sort them from newest to oldest
    const projects = await Project.find().sort({ createdAt: -1 });

    // send message, all projects
    return res.status(200).json({ success: true, projects });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller to get a project from an id
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns project details
 */
export const getProjectById = async (req, res) => {
  try {
    // find project with the id
    const project = await Project.findById(req.params.id);

    // if the project doesn't exists, send message
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // otherwise it does exists, send project details
    return res.status(200).json({ success: true, project });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller to create a project
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns created project
 */
export const createProject = async (req, res) => {
  // get project details from body
  const { image_url, title, description, technologies } = req.body;

  if (!image_url || !title || !description || !technologies?.length) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // create new project data
    const project = new Project({
      image_url,
      title,
      description,
      technologies,
    });

    // save project to the database
    await project.save();

    // send message, project created
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller for deleting a project
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns project deleted
 */
export const deleteProject = async (req, res) => {
  try {
    // get the project from an id
    const project = await Project.findByIdAndDelete(req.params.id);

    // if the project doesn't exists, send message
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // otherwise, the project is deleted
    return res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller to update a project detail
 * @param {import("express").Request} req - Express request
 * @param {import("express").Response} res - Express response
 * @returns updated project
 */
export const updateProject = async (req, res) => {
  // get project detail updates from body
  const { image_url, title, description, technologies } = req.body;

  if (!image_url || !title || !description || !technologies?.length) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    // find the project using an id, and update it with the new details
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        image_url,
        title,
        description,
        technologies,
      },
      { new: true }
    );

    // if project doesn't exists, send message
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // otherwise, project is updated
    return res.status(200).json({ success: true, project });
  } catch (error) {
    // handle errors
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
