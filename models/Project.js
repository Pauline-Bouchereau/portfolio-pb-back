const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  name: {
    type: String,
    required: true,
  },
  type: {
    // Frontend or fullstack
    type: String,
    required: true,
  },
  techno: {
    type: Array,
    required: true,
  },
  doneAt: {
    // Personnal, Reacteur, Pro
    type: String,
    default: "",
  },
  groupProject: {
    type: Boolean,
  },
  frontRepo: {
    type: String,
    default: "",
  },
  backRepo: {
    type: String,
    default: "",
  },
  liveSite: {
    type: String,
    default: "",
  },
  device: {
    // desktop or mobile
    type: String,
  },
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  video: { type: mongoose.Schema.Types.Mixed, default: {} },
});

module.exports = Project;
