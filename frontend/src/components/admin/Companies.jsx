import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>

      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-5">
          <Input
            className="w-full sm:w-1/2"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full sm:w-fit"
            onClick={() => navigate('/admin/companies/create')}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
