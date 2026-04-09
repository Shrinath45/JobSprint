import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm text-left table-auto">
          <caption className="p-4 text-sm text-gray-500 text-center">
            A list of your recently applied users
          </caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Resume</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.applications?.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2 whitespace-nowrap">{item?.applicant?.fullname}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item?.applicant?.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item?.applicant?.phoneNumber}</td>
                <td className="px-4 py-2">
                  {item.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item?.applicant?.createdAt?.split('T')[0]}
                </td>
                <td className="px-4 py-2 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
