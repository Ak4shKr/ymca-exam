import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  exam: {
    type: String,
    required: true,
  },
  dates: [
    {
      type: String,
      required: true,
    },
  ],
});

const DateModel = mongoose.model("DateModel", dateSchema);
export default DateModel;
