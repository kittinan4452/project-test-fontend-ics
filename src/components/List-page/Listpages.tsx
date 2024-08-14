import React, { useState, useEffect } from 'react';
import { Divider, Pagination, Stack } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar"
import Data from "../../json-file/example_data.json";

type Props = {}

interface RecordType {
  id: number;
  name: string;
  categories: string[]; 
  profile_image_url: string;
  operation_time: { time_open: string; time_close: string }[];
  images: string[];
  rating: number;
}

export default function Listpages({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredData, setFilteredData] = useState<RecordType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const filtered = Data.filter((record: RecordType) => {
      const matchesCategory = selectedCategory === 'All' || record.categories.includes(selectedCategory);
      const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredData(filtered);
    setCurrentPage(1);  // Reset to the first page whenever search or category changes
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    
    <div >
        <Navbar/>
    <div className='min-w-full min-h-[100vh] flex justify-center  bg-[#c4d3e9]'>
      <div className='container'>
        <div className='flex justify-between my-6 items-center '>
          <div>
            <h1 className='font-kanit text-2xl font-bold text-black'>Place List</h1>
          </div>
          <div className='flex space-x-3'>
            <select 
              className="select select-bordered w-[200px] border-[#134b8a] rounded-full bg-white max-w-xs"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>
                <option value="restaurant">Restaurant</option>
                <option value="bakery">Bakery</option>
                <option value="cafe">Cafe</option>
            </select>
            <Divider orientation="vertical" variant="middle" className='text-black' flexItem />
            <label className="input input-bordered flex items-center gap-2 bg-white border-[#134b8a] w-[400px] rounded-full">
              <input 
                type="text" 
                className="grow" 
                placeholder="Search name..." 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
          </div>
        </div>

        <div className='flex flex-wrap justify-between'>
          {currentData.map(record => {
            return (
              <Link to={`/detail/${record.id}`} key={record.id} className='bg-white w-[492px] max-xl:w-[300px] h-[260px] rounded-lg my-5'>
                <div className='flex items-center space-x-5 pt-5 pb-2 text-black font-kanit'>
                  <div className='ml-5 w-20 items-center'>
                    <img
                      className="mask mask-square h-[60px] w-[60px] rounded-xl"
                      src={record.profile_image_url} 
                    />
                  </div>
                  <div className='w-full'>
                    <div>{record.name}</div>
                    <div className='flex justify-between mt-1'>
                      <div>เวลา {record.operation_time[0].time_open} AM - {record.operation_time[0].time_close} PM</div>
                      <div className='mr-10 text-[#134B8A]'>
                        <FiberManualRecordIcon fontSize='small' className='mr-1' />
                        {record.rating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex rounded-box justify-center px-3 pb-3">
                  <img className='w-[155px] h-[155px] rounded-l-xl' src={record.images[0]} alt="Image 1" />
                  <img className='w-[155px] h-[155px]' src={record.images[1]} alt="Image 2" />
                  <img className='w-[155px] h-[155px] rounded-r-xl' src={record.images[2]} alt="Image 3" />
                </div>  
              </Link>
            );
          })}
        </div>
        
        <div className='flex justify-center m-10 mb-96'>
          <Stack spacing={2}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              variant="outlined" 
              className='' 
            />
          </Stack>
        </div>
      </div>
    </div>
    </div>
  );
}
