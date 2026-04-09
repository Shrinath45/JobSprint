import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const isQueryEmpty =
      !searchedQuery ||
      (typeof searchedQuery === 'object' &&
        Object.keys(searchedQuery).length === 0);

    if (isQueryEmpty) {
      setFilterJobs(allJobs);
    } else {
      const { location = [], industry = [], salary = [] } = searchedQuery;

      const filteredJobs = allJobs.filter((job) => {
        const jobLocation = job.location?.toLowerCase() || '';
        const jobIndustry = job.title?.toLowerCase() || '';
        const jobSalary = parseFloat(job.salary);

        const matchLocation =
          location.length === 0 ||
          location.some((loc) =>
            jobLocation.includes(loc.toLowerCase())
          );

        const matchIndustry =
          industry.length === 0 ||
          industry.some((ind) =>
            jobIndustry.includes(ind.toLowerCase())
          );

        const matchSalary =
          salary.length === 0 ||
          salary.some(
            ({ min, max }) =>
              jobSalary >= min && jobSalary <= max
          );

        return matchLocation && matchIndustry && matchSalary;
      });

      setFilterJobs(filteredJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          <div className="w-full lg:w-3/4">
            {filterJobs.length === 0 ? (
              <p className="text-lg font-semibold text-gray-600">
                Job not found
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;