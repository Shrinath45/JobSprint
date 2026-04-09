// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const JobDescription = () => {
//     const {singleJob} = useSelector(store => store.job);
//     const {user} = useSelector(store=>store.auth);
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
//             if(res.data.success){
//                 setIsApplied(true); // Update the local state
//                 const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
//                 dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
//                 toast.success(res.data.message);

//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }

//     useEffect(()=>{
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
//                 if(res.data.success){
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob(); 
//     },[jobId,dispatch, user?._id]);

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
//                         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
//                         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                 onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                 <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MUIButton,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(application => application.applicant === user?._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className='text-center my-10'>
      <MUIButton variant="contained" color="primary" onClick={() => setOpen(true)}>
        View Job Description
      </MUIButton>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">{singleJob?.title}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            <Chip label={`${singleJob?.postion} Positions`} color="primary" />
            <Chip label={singleJob?.jobType} color="error" />
            <Chip label={`${singleJob?.salary} LPA`} color="secondary" />
          </Box>
          <Box my={2}>
            <Typography><strong>Role:</strong> {singleJob?.title}</Typography>
            <Typography><strong>Location:</strong> {singleJob?.location}</Typography>
            <Typography><strong>Description:</strong> {singleJob?.description}</Typography>
            <Typography><strong>Experience:</strong> {singleJob?.experience} yrs</Typography>
            <Typography><strong>Salary:</strong> {singleJob?.salary} LPA</Typography>
            <Typography><strong>Total Applicants:</strong> {singleJob?.applications?.length}</Typography>
            <Typography><strong>Posted Date:</strong> {singleJob?.createdAt?.split("T")[0]}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={() => setOpen(false)} color="secondary">
            Close
          </MUIButton>
          <MUIButton
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            sx={{
              backgroundColor: isApplied ? '#9e9e9e' : '#7209b7',
              color: 'white',
              '&:hover': {
                backgroundColor: isApplied ? '#9e9e9e' : '#5f32ad',
              },
            }}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </MUIButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobDescription;
