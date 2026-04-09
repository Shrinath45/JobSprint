import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


// ✅ APPLY JOB
export const applyJob = async (req, res) => {
    try {
        const userId = req.user?.id; // ✅ FIXED
        const jobId = req.params.id;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        // ✅ Check if already applied
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // ✅ Check job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // ✅ Create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // ✅ Push into job
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};



// ✅ GET APPLIED JOBS
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user?.id; // ✅ FIXED

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company"
                }
            });

        if (applications.length === 0) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};



// ✅ GET APPLICANTS (ADMIN)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true // ✅ FIXED TYPO
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};



// ✅ UPDATE STATUS
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};