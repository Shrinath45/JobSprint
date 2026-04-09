import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { getCompanyAction } from '@/redux/companyActions';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filtering companies by name
  useEffect(() => {
    const filtered = companies?.filter((company) =>
      company?.name?.toLowerCase().includes(searchCompanyByText?.toLowerCase() || '')
    );
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  // Delete handler
  const deleteHandler = async (companyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this company?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
        withCredentials: true,
      });
      toast.success('Company deleted successfully!');
      dispatch(getCompanyAction()); // Refresh list
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error deleting company');
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[600px]">
        <TableCaption>A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || '/default-logo.png'} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 space-y-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => deleteHandler(company._id)}
                        className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-100 p-1 rounded"
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
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
