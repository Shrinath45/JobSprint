import React, { useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Input } from '@/components/ui/input'; // Or use HTML <input> if not using Shadcn

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter jobs based on the job title
    const filteredJobs = allJobs?.filter(job =>
        job?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='max-w-7xl mx-auto my-20'>
            {/* Search Bar */}
            <div className='flex justify-center mb-8'>
                <Input
                    type="text"
                    placeholder="Search jobs by title..."
                    className="w-[90%] md:w-[50%]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Section Heading */}
            <h1 className='text-4xl font-bold mb-4'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>

            {/* Job Listings */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    filteredJobs?.length <= 0
                        ? <span className='text-gray-500'>No Job Available</span>
                        : filteredJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                }
            </div>
        </div>
    );
}

export default LatestJobs;
