// Import packages
const express = require("express");
const router = express.Router();

// Import model
const Project = require("../models/Project");

// Import middleware isAuthenticated
const isAuthenticated = require("../middelwares/isAuthenticated");

// Route to create a project in BDD
router.post("/project/create", isAuthenticated, async (req, res) => {
  try {
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

// Route to gat all projects (with filters)

// Export the routes
module.exports = router;
