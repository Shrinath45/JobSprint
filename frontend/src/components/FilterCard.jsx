// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import { Checkbox } from './ui/Checkbox';
// import { Label } from './ui/label';

// const filterData = [
//   {
//     filterType: "Location",
//     key: "location",
//     array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
//   },
//   {
//     filterType: "Industry",
//     key: "industry",
//     array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//   },
//   {
//     filterType: "Salary",
//     key: "salary",
//     array: [
//       { label: "Upto 2 LPA", value: { min: 0, max: 2 } },
//       { label: "2 LPA to 4 LPA", value: { min: 2, max: 4 } },
//       { label: "Above 4 LPA", value: { min: 4, max: Infinity } }
//     ]
//   }
// ];

// const FilterCard = () => {
//   const [selectedFilter, setSelectedFilter] = useState({});
//   const dispatch = useDispatch();

//   const changeHandler = (key, value) => {
//     setSelectedFilter(prev => {
//       const updated = { ...prev };
//       if (Array.isArray(prev[key])) {
//         if (prev[key].includes(value)) {
//           updated[key] = prev[key].filter(val => val !== value);
//         } else {
//           updated[key] = [...prev[key], value];
//         }
//       } else {
//         updated[key] = [value];
//       }
//       return updated;
//     });
//   };

//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedFilter));
//   }, [selectedFilter]);

//   return (
//     <div className="w-full bg-white sm:p-4 p-3 rounded-md shadow-sm">
//       <h1 className="font-bold sm:text-lg text-base">Filter Jobs</h1>
//       <hr className="mt-2 mb-3 border-gray-200" />
//       {filterData.map((data, index) => (
//         <div key={index} className="mb-5">
//           <h2 className="font-semibold sm:text-base text-sm text-gray-800">{data.filterType}</h2>
//           <div className="space-y-2 mt-2">
//             {data.array.map((item, idx) => {
//               const itemId = `id${index}-${idx}`;
//               const display = typeof item === 'string' ? item : item.label;
//               const val = typeof item === 'string' ? item : item.value;

//               return (
//                 <div className="flex items-center space-x-2" key={itemId}>
//                   <Checkbox
//                     checked={
//                       Array.isArray(selectedFilter[data.key]) &&
//                       selectedFilter[data.key].some(v =>
//                         typeof v === 'object' ? JSON.stringify(v) === JSON.stringify(val) : v === val
//                       )
//                     }
//                     onChange={() => changeHandler(data.key, val)}
//                     id={itemId}
//                   />
//                   <Label htmlFor={itemId} className="text-sm sm:text-base">{display}</Label>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterCard;


import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Checkbox } from './ui/Checkbox';
import { Label } from './ui/label';
import { X } from 'lucide-react';

const filterData = [
  {
    filterType: "Location",
    key: "location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    key: "industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    key: "salary",
    array: [
      { label: "Upto 2 LPA", value: { min: 0, max: 2 } },
      { label: "2 LPA to 4 LPA", value: { min: 2, max: 4 } },
      { label: "Above 4 LPA", value: { min: 4, max: Infinity } }
    ]
  }
];

const FilterCard = () => {
  const [selectedFilter, setSelectedFilter] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (key, value) => {
    setSelectedFilter(prev => {
      const updated = { ...prev };
      if (Array.isArray(prev[key])) {
        if (prev[key].includes(value)) {
          updated[key] = prev[key].filter(val => val !== value);
        } else {
          updated[key] = [...prev[key], value];
        }
      } else {
        updated[key] = [value];
      }
      return updated;
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilter));
  }, [selectedFilter]);

  // Filter content block
  const renderFilters = (
    <div className="w-full bg-white sm:p-4 p-3 rounded-md">
      <h1 className="font-bold sm:text-lg text-base mb-2">Filter Jobs</h1>
      <hr className="mb-3 border-gray-200" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-5">
          <h2 className="font-semibold sm:text-base text-sm text-gray-800">{data.filterType}</h2>
          <div className="space-y-2 mt-2">
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              const display = typeof item === 'string' ? item : item.label;
              const val = typeof item === 'string' ? item : item.value;

              return (
                <div className="flex items-center space-x-2" key={itemId}>
                  <Checkbox
                    checked={
                      Array.isArray(selectedFilter[data.key]) &&
                      selectedFilter[data.key].some(v =>
                        typeof v === 'object'
                          ? JSON.stringify(v) === JSON.stringify(val)
                          : v === val
                      )
                    }
                    onChange={() => changeHandler(data.key, val)}
                    id={itemId}
                  />
                  <Label htmlFor={itemId} className="text-sm sm:text-base">{display}</Label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Filter Button (Mobile Only) */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
        >
          Filter
        </button>
      </div>

      {/* Desktop filter card */}
      <div className="hidden sm:block">
        {renderFilters}
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          {/* Slide Panel */}
          <div className="relative w-64 max-w-[80%] h-full bg-white shadow-lg p-4 overflow-y-auto transition-transform transform duration-300 translate-x-0">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X size={20} />
            </button>
            {renderFilters}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterCard;
