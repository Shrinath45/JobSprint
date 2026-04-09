// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '../ui/table';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
// import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import { getAdminJobsAction } from '@/redux/jobActions';
// import { toast } from 'sonner';

// const AdminJobsTable = () => {
//   const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
//   const [filterJobs, setFilterJobs] = useState(allAdminJobs);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const filteredJobs = allAdminJobs.filter((job) => {
//       if (!searchJobByText) return true;
//       return (
//         job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
//         job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
//       );
//     });
//     setFilterJobs(filteredJobs);
//   }, [allAdminJobs, searchJobByText]);

//   // ✅ DELETE HANDLER ADDED
//   const deleteJobHandler = async (jobId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this job?");
//     if (!confirmDelete) return;

//     try {
//       const token = sessionStorage.getItem("token");

//       await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success("Job deleted successfully");
//       dispatch(getAdminJobsAction()); // refresh jobs

//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error deleting job");
//     }
//   };

//   return (
//     <div className="w-full overflow-x-auto rounded-md border">
//       <Table className="min-w-[600px]">
//         <TableCaption>A list of your recently posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {filterJobs?.map((job) => (
//             <TableRow key={job._id}>
//               <TableCell>{job?.company?.name}</TableCell>
//               <TableCell>{job?.title}</TableCell>
//               <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
//               <TableCell className="text-right">
//                 <Popover>
//                   <PopoverTrigger className="cursor-pointer">
//                     <MoreHorizontal />
//                   </PopoverTrigger>

//                   <PopoverContent className="w-32">
//                     <div
//                       onClick={() => navigate(`/admin/companies/${job._id}`)}
//                       className="flex items-center gap-2 cursor-pointer"
//                     >
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
//                     </div>

//                     <div
//                       onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
//                       className="flex items-center gap-2 cursor-pointer mt-2"
//                     >
//                       <Eye className="w-4" />
//                       <span>Applicants</span>
//                     </div>

//                     {/* ✅ DELETE OPTION ADDED (UI unchanged style) */}
//                     <div
//                       onClick={() => deleteJobHandler(job._id)}
//                       className="flex items-center gap-2 cursor-pointer mt-2 text-red-600"
//                     >
//                       <Trash2 className="w-4" />
//                       <span>Delete</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;


import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setAllAdminJobs } from '@/redux/jobSlice';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ FETCH JOBS
  const fetchAdminJobs = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(`${JOB_API_END_POINT}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        dispatch(setAllAdminJobs(res.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ LOAD ON PAGE LOAD
  useEffect(() => {
    fetchAdminJobs();
  }, []);

  // ✅ FILTER LOGIC
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // ✅ DELETE HANDLER
  const deleteJobHandler = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const token = sessionStorage.getItem("token");

      await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job deleted successfully");

      fetchAdminJobs(); // ✅ refresh

    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting job");
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="min-w-[600px]">
        <TableCaption>A list of your recently posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>

                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>

                      <div
                        onClick={() => deleteJobHandler(job._id)}
                        className="flex items-center gap-2 cursor-pointer mt-2 text-red-600"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;