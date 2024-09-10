import React, { useState, useEffect } from 'react';
import { Divider, Pagination, Stack } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar"
import Data from "../../json-file/example_data.json";
import StorefrontIcon from '@mui/icons-material/Storefront';


type Props = {}
 //ประกาศตัวแปร
interface itemType {
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
  const [filteredData, setFilteredData] = useState<itemType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeImageMap, setActiveImageMap] = useState<{ [key: number]: number }>({}); // สถานะของ Carousel
  
  const itemsPerPage = 9;

  useEffect(() => {
    const filtered = Data.filter((item: itemType) => {
      const matchesCategory = selectedCategory === 'All' || item.categories.includes(selectedCategory);
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
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

  const getActiveImage = (itemId: number) => {
    return activeImageMap[itemId] ?? 0;
  };

  const goToSlide = (itemId: number, slideIndex: number) => {
    setActiveImageMap((prev) => ({
      ...prev,
      [itemId]: slideIndex - 1,
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div >
      <Navbar />
      <div className='min-w-full flex justify-center bg-white xl:h-[1390px] max-xl:h-[1800px] max-sm:h-[5000px] max-lg:h-[3300px] '>
        <div className='container '>
          <div className='flex justify-between max-sm:flex-col mt-7 max-sm:space-y-3 xl:items-center max-sm:px-3  max-sm:justify-center xl:px-10 xl:ml-20'>
            <div className='flex justify-start max-xl:ml-7 max-sm:ml-0 max-lg:ml-28'>
              <h1 className='font-kanit text-2xl font-semibold text-black'>Place List</h1>
            </div>
            <div className='flex sm:space-x-3 max-sm:flex-col max-sm:space-y-5 '>
              <div>
                <select 
                  className="select select-bordered w-[200px] max-sm:w-full border-[#134b8a] rounded-full bg-white max-lg:w-[150px] "
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="All">All</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="bakery">Bakery</option>
                  <option value="cafe">Cafe</option>
                </select>
              </div>
              <div className='max-sm:hidden'><Divider orientation="vertical" variant="middle" className='text-black' flexItem /></div>
              <div className=''>
                <label className="input input-bordered flex items-center gap-2 bg-white border-[#134b8a] w-[400px] max-sm:w-full rounded-full max-lg:w-[300px] ">
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
          </div>
        {/*  loop Item แสดงข้อมูล*/}
          <div className='flex flex-wrap justify-between max-sm:justify-center  max-sm:ml-0 max-lg:justify-center max-lg:ml-14  max-xl:ml-8 xl:flex-row xl:ml-28 xl:mr-10'>
            {currentData.map(item => {
              const activeImage = getActiveImage(item.id);  

              return (
                <div className='bg-white w-[492px] max-sm:w-80 max-sm:h-[465px] h-[260px] rounded-xl my-5 shadow-2xl border max-lg:w-[600px] max-lg:h-[300px] xl:w-[450px]' key={item.id}>
                  <Link to={`/detail/${item.id}`} >
                    <div className='flex max-sm:flex-col items-center space-x-5 sm:pt-5 pb-2 text-black font-kanit'>
                      <div className='sm:ml-5 w-20 max-sm:w-80 max-sm:h-[87px] rounded-xl items-center'>
                        <img
                          className="sm:mask sm:mask-square sm:h-[60px] sm:w-[60px] max-sm:w-[320px] max-sm:h-[130px] sm:rounded-xl max-sm:rounded-t-xl"
                          src={item.profile_image_url} 
                          alt={item.name}
                        />
                      </div>
                      <div className='sm:w-full max-sm:w-72 '>
                        <div className='max-sm:mt-11 text-xl'><StorefrontIcon/> {item.name}</div>
                        <div className='flex justify-between mt-1'>
                          <div><CalendarMonthIcon /> {item.operation_time[0].time_open} AM - {item.operation_time[0].time_close} PM</div>
                          <div className='flex mr-7 text-[#134B8A] max-sm:text-white max-sm:w-[67px] max-sm:h-[31px] max-sm:items-center max-sm:justify-center max-sm:mr-2 max-sm:rounded-2xl max-sm:mt-[-50px]  max-sm:bg-[#134B8A]'>
                            <div className='max-sm:hidden'><FiberManualRecordIcon fontSize='small' className='mr-1' /></div>
                            {item.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex rounded-box justify-center px-3 max-sm:hidden pb-3 ">
                      <img className='w-[155px] h-[155px] rounded-l-xl max-lg:w-[200px] max-lg:h-[200px] xl:h-[160px] xl:w-[150px]' src={item.images[0]} alt="Image 1" />
                      <img className='w-[155px] h-[155px] max-lg:w-[200px] max-lg:h-[200px] xl:h-[160px] xl:w-[150px]' src={item.images[1]} alt="Image 2" />
                      <img className='w-[155px] h-[155px] max-lg:w-[200px] max-lg:h-[200px] rounded-r-xl xl:h-[160px] xl:w-[150px]' src={item.images[2]} alt="Image 3" />
                    </div>
                  </Link>
                  
                  {/* Carousel Section */}
                  <div className='flex justify-center'>
                    <div className="carousel w-full sm:hidden mx-3 h-64 rounded-xl">
                      <div
                        className={`carousel-item relative w-full ${activeImage === 0 ? '' : 'hidden'}`}
                        id="slide1"
                      >
                        <img src={item.images[0]} className="w-full" alt="Slide 1" />
                        <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                          <button onClick={() => goToSlide(item.id, 3)} className="btn btn-circle bg-white btn-sm">❮</button>
                          <button onClick={() => goToSlide(item.id, 2)} className="btn btn-circle bg-white btn-sm">❯</button>
                        </div>
                      </div>
                      <div
                        className={`carousel-item relative w-full ${activeImage === 1 ? '' : 'hidden'}`}
                        id="slide2"
                      >
                        <img src={item.images[1]} className="w-full" alt="Slide 2" />
                        <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                          <button onClick={() => goToSlide(item.id, 1)} className="btn btn-circle bg-white btn-sm">❮</button>
                          <button onClick={() => goToSlide(item.id, 3)} className="btn btn-circle bg-white btn-sm">❯</button>
                        </div>
                      </div>
                      <div
                        className={`carousel-item relative w-full ${activeImage === 2 ? '' : 'hidden'}`}
                        id="slide3"
                      >
                        <img src={item.images[2]} className="w-full" alt="Slide 3" />
                        <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                          <button onClick={() => goToSlide(item.id, 2)} className="btn btn-circle bg-white btn-sm">❮</button>
                          <button onClick={() => goToSlide(item.id, 1)} className="btn btn-circle bg-white btn-sm">❯</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Carousel Section */}
                </div>
              );
            })}
          </div>
          <div className='flex justify-center m-10 '>
            <Stack spacing={2}>
              <Pagination 
                
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                variant="outlined" 
                sx={{
                  '.MuiPaginationItem-root': {
                    backgroundColor: '#134b8a', // สีพื้นหลังของปุ่ม
                    color: 'white', // สีข้อความของปุ่ม
                    //'&:hover': {
                      //backgroundColor: 'yourHoverBackgroundColor', // สีพื้นหลังเมื่อชี้เมาส์
                    //},
                  },
                  '.Mui-selected': {
                    backgroundColor: '#C4D3E9', // สีพื้นหลังของปุ่มหน้าปัจจุบัน
                    color: 'white', // สีข้อความของปุ่มหน้าปัจจุบัน
                  },
                  '.MuiPaginationItem-previousNext': {
                    backgroundColor: '#134b8a', // สีพื้นหลังของปุ่มก่อนหน้า/ถัดไป
                    color: 'white', // สีข้อความของปุ่มก่อนหน้า/ถัดไป
                   // '&:hover': {
                     // backgroundColor: 'yourHoverBackgroundColor', // สีพื้นหลังเมื่อชี้เมาส์
                    //},
                  },
                }}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

