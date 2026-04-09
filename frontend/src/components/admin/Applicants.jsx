import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full px-4 sm:px-6 md:px-8 mx-auto py-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
          Applicants ({applicants?.applications?.length || 0})
        </h1>

        <div className="w-full overflow-x-auto rounded-md border">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
