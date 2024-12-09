import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
  },
  { collection: "assignments" }
);
export default schema;
