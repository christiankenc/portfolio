import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    image_url: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: {
      type: [String],
      required: true,
    },

    demo_url: {
      type: String,
      default: "",
    },

    repo_url: {
      type: String,
      default: "",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
