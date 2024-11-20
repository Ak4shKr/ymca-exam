import Report from "../../Models/Report.js";

export const reportFeedback = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    if (!name || !email || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newReport = new Report({
      name,
      email,
      comment,
    });
    await newReport.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
