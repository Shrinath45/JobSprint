import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // ✅ FIX: ensure array
  const jobsArray = Array.isArray(allAppliedJobs) ? allAppliedJobs : [];

  const sortedAppliedJobs = [...jobsArray].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="w-full">
      {/* Table view */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedAppliedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  You haven't applied to any job yet.
                </TableCell>
              </TableRow>
            ) : (
              sortedAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>
                    {appliedJob?.createdAt?.split('T')[0]}
                  </TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        appliedJob?.status === 'rejected'
                          ? 'bg-red-400'
                          : appliedJob?.status === 'pending'
                          ? 'bg-gray-400'
                          : 'bg-green-400'
                      }
                    >
                      {appliedJob?.status?.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableCaption>A list of your applied jobs</TableCaption>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4 mt-4">
        {sortedAppliedJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't applied to any job yet.
          </p>
        ) : (
          sortedAppliedJobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Date:</span>
                <span className="text-sm font-medium">
                  {job?.createdAt?.split('T')[0]}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Job Role:</span>
                <span className="text-sm font-medium">
                  {job.job?.title}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Company:</span>
                <span className="text-sm font-medium">
                  {job.job?.company?.name}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status:</span>
                <Badge
                  className={
                    job?.status === 'rejected'
                      ? 'bg-red-400'
                      : job?.status === 'pending'
                      ? 'bg-gray-400'
                      : 'bg-green-400'
                  }
                >
                  {job?.status?.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobTable;