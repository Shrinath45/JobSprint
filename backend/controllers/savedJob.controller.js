import SavedJob from "../models/savedJob.model.js";

export const saveJob = async (req, res) => {
  const userId = req.user.id; // ✅ FIXED
  const { jobId } = req.body;

  console.log("Received userId:", userId, "jobId:", jobId);

  if (!jobId) {
    return res.status(400).json({
      message: "JobId is required",
      success: false,
    });
  }

  try {
    const alreadySaved = await SavedJob.findOne({ user: userId, job: jobId });

    if (alreadySaved) {
      return res.status(400).json({
        message: "Job already saved",
        success: false
      });
    }

    const newSavedJob = new SavedJob({
      user: userId,
      job: jobId
    });

    await newSavedJob.save();

    res.status(201).json({
      message: "Job saved successfully",
      success: true,
      savedJob: newSavedJob,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to save job",
      error: error.message,
      success: false,
    });
  }
};

export const getSavedJobsByUser = async (req, res) => {
  const userId = req.user.id; // ✅ FIXED

  try {
    const savedJobs = await SavedJob.find({ user: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
          model: "Company"
        }
      });

    res.status(200).json({
      success: true,
      jobs: savedJobs
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch saved jobs",
      error: error.message,
      success: false,
    });
  }
};

export const removeSavedJob = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await SavedJob.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "Saved job not found",
        success: false
      });
    }

    res.status(200).json({
      message: "Saved job removed",
      success: true
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove job",
      error: error.message,
      success: false,
    });
  }
};