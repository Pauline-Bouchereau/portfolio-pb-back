// Import packages
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// Import model
const Project = require("../models/Project");

// Import middleware isAuthenticated
const isAuthenticated = require("../middelwares/isAuthenticated");

// Route to create a project in BDD
router.post("/project/create", isAuthenticated, async (req, res) => {
  try {
    const {
      name,
      type,
      techno,
      doneAt,
      groupProject,
      frontRepo,
      backRepo,
      liveSite,
      device,
    } = req.fields;

    const { image, video } = req.files;

    // Check if required info has been given
    if (name && type && techno) {
      // Check if value for type is correct
      if (type === "Frontend" || type === "Fullstack") {
        // Create a new project in DB
        const newProject = new Project({
          name: name,
          type: type,
          techno: techno,
        });

        if (doneAt) {
          newProject.doneAt = doneAt;
        }

        if (groupProject) {
          newProject.groupProject = groupProject;
        }

        if (frontRepo) {
          newProject.frontRepo = frontRepo;
        }

        if (backRepo) {
          newProject.backRepo = backRepo;
        }

        if (liveSite) {
          newProject.liveSite = liveSite;
        }

        if (device) {
          newProject.device = device;
        }

        if (image) {
          const imageProject = req.files.image.path;

          // Upload image to Cloudinary
          let result = await cloudinary.uploader.upload(imageProject, {
            folder: `/portfolio/projectsIMG/${name}`,
          });

          newProject.image = result;
        }

        if (video) {
          const videoProject = req.files.video.path;

          // Upload video to Cloudinary
          let result = await cloudinary.uploader.upload(videoProject, {
            folder: `/portfolio/projectsVID/${name}`,
          });

          newProject.video = result;
        }

        // Save project in DB
        await newProject.save();

        // Respond to client
        res.status(201).json(newProject);
      } else {
        res.status(400).json({ error: "Incorrect value for project type" });
      }
    } else {
      res.status(400).json({ error: "Missing mandatory parameter(s)" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete a project from BDD
router.delete("/project/delete", isAuthenticated, async (req, res) => {
  try {
    // Check if ID in params
    if (req.params.id) {
      // Check if ID corresponds to an offer
      const projectToDelete = await Project.findById(req.params.id);

      if (projectToDelete) {
        // Delete picture from Cloudinary
        if (projectToDelete.image) {
          await cloudinary.api.delete_resources_by_prefix(
            `/portfolio/projectsIMG/${projectToDelete.name}`
          );
        }

        // Delete video from Cloudinary
        if (projectToDelete.video) {
          await cloudinary.api.delete_resources_by_prefix(
            `/portfolio/projectsVID/${projectToDelete.name}`
          );
        }

        // Delete project from BDD
        await projectToDelete.delete();

        // Respond to the client
        res.status(200).json({ message: "Project successfully deleted" });
      } else {
        res.status(400).json({ error: "This project doesn't exist" });
      }
    } else {
      res.status(400).json({ error: "Missing project ID" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to modify a project from BDD

// Route to get all projects (with filters)
router.get("/projects", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export the routes
module.exports = router;
