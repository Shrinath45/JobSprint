// import React, { useEffect, useState } from 'react';
// import { Button } from './ui/button';
// import { Avatar, AvatarImage } from './ui/avatar';
// import { Badge } from './ui/badge';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './shared/Navbar';
// import { APPLICATION_API_END_POINT } from '@/utils/constant';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Chip,
//   Box,
// } from '@mui/material';
// import axios from 'axios';

// const Saved = () => {
//   const [savedJobs, setSavedJobs] = useState([]);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null); // new
//   const userId = localStorage.getItem('userId');
//   const [isApplied, setIsApplied] = useState(false);

//   const fetchSavedJobs = async () => {
//     try {
//       const token = sessionStorage.getItem("token");

//       const res = await fetch(`https://jobportal-backend-5rv2.onrender.com/api/saved-jobs`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const data = await res.json();
//       const filtered = data.filter((item) => item.job !== null); // only valid jobs
//       setSavedJobs(filtered);
//     } catch (err) {
//       console.error('Failed to fetch saved jobs:', err);
//     }
//   };

//   const handleApply = async (jobId) => {
//     try {
//       const res = await fetch(`https://jobportal-backend-5rv2.onrender.com/api/v1/application`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ userId, jobId }),
//       });
//       if (res.ok) {
//         alert("Application submitted successfully!");
//         setIsApplied(true);
//       }
//     } catch (err) {
//       console.error("Failed to apply:", err);
//     }
//   };

//   const handleRemove = async (savedJobId) => {
//     try {
//       const res = await fetch(`https://jobportal-backend-5rv2.onrender.com/api/saved-jobs/${savedJobId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       if (res.ok) fetchSavedJobs();
//     } catch (err) {
//       console.error('Failed to remove job:', err);
//     }
//   };

//   const handleOpenDialog = (job) => {
//     setSelectedJob(job);
//     setOpen(true);
//   };

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${selectedJob._id}`, {
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         setIsApplied(true);
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Error while applying.");
//     }
//   };

//   useEffect(() => {
//     fetchSavedJobs();
//   }, []);

//   return (
//     <div className="max-w-100 mx-auto">
//       <Navbar />
//       <div className='max-w-7xl mx-auto p-6'>
//         <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
//         {savedJobs.length === 0 ? (
//           <p className="text-gray-600">You haven't saved any jobs yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {savedJobs.map(({ _id, job }) => {
//               if (!job) return null;

//               return (
//                 <div key={_id} className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
//                   <div className="flex items-center justify-between mb-2">
//                     <p className="text-sm text-gray-500">
//                       {job.createdAt ? new Date(job.createdAt).toDateString() : 'Unknown Date'}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-3 my-2">
//                     <Button variant="outline" size="icon" className="p-4">
//                       <Avatar>
//                         <AvatarImage src={job?.company?.logo || 'default-logo.png'} />
//                       </Avatar>
//                     </Button>
//                     <div>
//                       <h1 className="font-medium text-lg">
//                         {job?.company?.name || 'Unknown Company'}
//                       </h1>
//                       <p className="text-sm text-gray-500">India</p>
//                     </div>
//                   </div>

//                   <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//                   <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>

//                   <div className="flex flex-wrap gap-2 mt-4">
//                     <Badge className="text-blue-700 font-bold" variant="ghost">
//                       {job?.position} Positions
//                     </Badge>
//                     <Badge className="text-[#F83002] font-bold" variant="ghost">
//                       {job?.jobType}
//                     </Badge>
//                     <Badge className="text-[#7209b7] font-bold" variant="ghost">
//                       {job?.salary} LPA
//                     </Badge>
//                   </div>

//                   <div className="flex items-center gap-3 mt-5">
//                     <Button variant="destructive" onClick={() => handleRemove(_id)}>
//                       Remove
//                     </Button>
//                     <Button className='bg-[#7209b7]' onClick={() => handleOpenDialog(job)}>
//                       Details
//                     </Button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Job Details Dialog */}
//       {selectedJob && (
//         <Dialog open={open} onClose={() => setOpen(false)} maxWidth='md' fullWidth>
//           <DialogTitle>
//             <Typography variant='h5' fontWeight='bold'>
//               {selectedJob?.title}
//             </Typography>
//           </DialogTitle>
//           <DialogContent dividers>
//             <Box display='flex' gap={2} mb={2} flexWrap='wrap'>
//               <Chip label={`${selectedJob?.position} Positions`} color='primary' />
//               <Chip label={selectedJob?.jobType} color='error' />
//               <Chip label={`${selectedJob?.salary} LPA`} color='secondary' />
//             </Box>
//             <Box my={2}>
//               <Typography><strong>Company:</strong> {selectedJob?.company?.name}</Typography>
//               <Typography><strong>Description:</strong> {selectedJob?.description}</Typography>
//               <Typography><strong>Location:</strong> {selectedJob?.location}</Typography>
//               <Typography><strong>Experience:</strong> {selectedJob?.experience} yrs</Typography>
//               <Typography><strong>Total Applicants:</strong> {selectedJob?.applications?.length || 0}</Typography>
//               <Typography><strong>Posted Date:</strong> {selectedJob?.createdAt?.split('T')[0]}</Typography>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpen(false)} className='bg-gray-600'>
//               Close
//             </Button>
//             <Button
//               onClick={!isApplied ? applyJobHandler : null}
//               disabled={isApplied}
//               className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
//             >
//               {isApplied ? 'Already Applied' : 'Apply Now'}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default Saved;


import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import Navbar from './shared/Navbar';

const Saved = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const fetchSavedJobs = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(`http://localhost:3001/api/saved-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        const filtered = data.jobs.filter(item => item.job !== null);
        setSavedJobs(filtered);
      }

    } catch (err) {
      console.error('Failed to fetch saved jobs:', err);
    }
  };

  const handleRemove = async (savedJobId) => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(`http://localhost:3001/api/saved-jobs/${savedJobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        fetchSavedJobs();
      }

    } catch (err) {
      console.error('Failed to remove job:', err);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div>

      <div className='max-w-7xl mx-auto p-6'>
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <p className="text-gray-600">You haven't saved any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map(({ _id, job }) => {
              if (!job) return null;

              return (
                <div key={_id} className="p-5 rounded-xl shadow-md bg-white border">
                  
                  <p className="text-sm text-gray-500 mb-2">
                    {job.createdAt ? new Date(job.createdAt).toDateString() : 'Unknown'}
                  </p>

                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={job?.company?.logo || 'default.png'} />
                    </Avatar>
                    <div>
                      <h1 className="font-semibold">{job?.company?.name}</h1>
                      <p className="text-xs text-gray-500">India</p>
                    </div>
                  </div>

                  <h2 className="font-bold text-lg">{job?.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {job?.description}
                  </p>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge>{job?.position} Positions</Badge>
                    <Badge>{job?.jobType}</Badge>
                    <Badge>{job?.salary} LPA</Badge>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(_id)}
                    >
                      Remove
                    </Button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;