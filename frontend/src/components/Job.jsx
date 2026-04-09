import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Chip,
  Box,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setSingleJob } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // ✅ FIXED: ObjectId comparison
  useEffect(() => {
    const hasApplied = job?.applications?.some(
      (application) =>
        application.applicant?.toString() === user?._id?.toString()
    );
    setIsApplied(hasApplied);
  }, [job, user]);

  // ✅ FIXED: Use token auth instead of cookies
  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${job._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedJob = {
          ...job,
          applications: [
            ...(job.applications || []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while applying.");
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  // ✅ FIXED: send userId also
  const handleSaveJob = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      setSaving(true);

      const res = await fetch(
        "http://localhost:3001/api/saved-jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: job._id,
            userId: user._id, // ✅ FIXED
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setSaved(true);
        toast.success("Job saved successfully!");
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Server error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 rounded-md shadow-xl bg-white border border-gray-100 w-full">

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {daysAgoFunction(job?.createdAt) === 0
              ? 'Today'
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 my-4">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage src={job?.company?.logo} />
            </Avatar>
          </Button>

          <div className="text-center sm:text-left">
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
        </div>

        <div>
          <h1 className="font-bold text-lg my-2 text-center sm:text-left">
            {job?.title}
          </h1>

          <p className="text-sm text-gray-600 text-justify">
            {job?.description?.length > 150
              ? job.description.slice(0, 150) + '...'
              : job.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center sm:justify-start">

          <Button
            className="w-full sm:w-fit bg-[#7209b7]"
            onClick={() => setOpen(true)}
          >
            Details
          </Button>

          <Button
            className="w-full sm:w-fit bg-[#3182ce]"
            onClick={handleSaveJob}
            disabled={saving || saved}
          >
            {!user
              ? "Login to Save"
              : saving
              ? "Saving..."
              : saved
              ? "Saved ✅"
              : "Save For Later"}
          </Button>

        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            {job?.title}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            <Chip label={`${job?.position} Positions`} color="primary" />
            <Chip label={job?.jobType} color="error" />
            <Chip label={`${job?.salary} LPA`} color="secondary" />
          </Box>

          <Box my={2}>
            <Typography><strong>Company:</strong> {job?.company?.name}</Typography>
            <Typography><strong>Description:</strong> {job?.description}</Typography>
            <Typography><strong>Location:</strong> {job?.location}</Typography>

            <Typography>
              <strong>Experience:</strong>{" "}
              {job?.experienceLevel !== undefined
                ? `${job.experienceLevel} yrs`
                : "Not specified"}
            </Typography>

            <Typography>
              <strong>Total Applicants:</strong>{" "}
              {Array.isArray(job?.applications)
                ? job.applications.length
                : "Unknown"}
            </Typography>

            <Typography>
              <strong>Posted Date:</strong>{" "}
              {job?.createdAt?.split("T")?.[0]}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} className="bg-gray-600">
            Close
          </Button>

          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
          >
            {!user
              ? "Login to Apply"
              : isApplied
              ? "Already Applied"
              : "Apply Now"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Job;