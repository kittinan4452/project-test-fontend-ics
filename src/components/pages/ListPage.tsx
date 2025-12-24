import React, { useState, useEffect } from 'react';
import { Pagination, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Navbar from "../layout/Navbar"
import Data from "../../data/example_data.json";
import { Place } from '../../types';

export default function ListPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredData, setFilteredData] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeImageMap, setActiveImageMap] = useState<{ [key: number]: number }>({});

  const itemsPerPage = 9;

  useEffect(() => {
    const filtered = Data.filter((item: Place) => {
      const matchesCategory = selectedCategory === 'All' || item.categories.includes(selectedCategory);
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const categories = [
    { value: 'All', label: '🌟 All Places' },
    { value: 'restaurant', label: '🍽️ Restaurant' },
    { value: 'bakery', label: '🧁 Bakery' },
    { value: 'cafe', label: '☕ Cafe' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-kanit">
            ✨ Discover Amazing Places
          </h1>
          <p className="text-gray-600 font-kanit">
            Found {filteredData.length} {filteredData.length === 1 ? 'place' : 'places'}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-kanit">
                Category
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-white font-kanist cursor-pointer hover:border-blue-300"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-96">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-kanit">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none font-kanit"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {currentData.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2 font-kanit">No places found</h3>
            <p className="text-gray-500 font-kanit">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {currentData.map((item) => {
                const activeImage = getActiveImage(item.id);

                return (
                  <Link
                    to={`/detail/${item.id}`}
                    key={item.id}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1">
                      {/* Profile Image & Info */}
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <img
                            className="w-20 h-20 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
                            src={item.profile_image_url}
                            alt={item.name}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 font-kanit truncate group-hover:text-blue-600 transition-colors">
                              <StorefrontIcon className="text-blue-500 mr-1" />
                              {item.name}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <CalendarMonthIcon className="text-blue-400" fontSize="small" />
                                <span className="font-kanit">
                                  {item.operation_time[0].time_open} - {item.operation_time[0].time_close}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-lg">
                                <StarIcon className="text-xs" />
                                <span className="font-bold text-sm">{item.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Images Grid - Desktop */}
                      <div className="hidden sm:grid grid-cols-3 gap-1 px-5 pb-5">
                        {item.images.map((img, idx) => (
                          <div
                            key={idx}
                            className={`aspect-square rounded-lg overflow-hidden ${
                              idx === 0 ? 'rounded-tl-xl' : idx === 2 ? 'rounded-tr-xl' : ''
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${item.name} ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Carousel - Mobile */}
                      <div className="sm:hidden px-5 pb-5">
                        <div className="carousel w-full rounded-xl overflow-hidden aspect-video">
                          {item.images.map((img, idx) => (
                            <div
                              key={idx}
                              className={`carousel-item relative w-full ${activeImage === idx ? '' : 'hidden'}`}
                            >
                              <img src={img} className="w-full h-full object-cover" alt={`Slide ${idx + 1}`} />
                              <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 flex justify-between">
                                <button
                                  onClick={(e) => { e.preventDefault(); goToSlide(item.id, idx === 0 ? 3 : idx); }}
                                  className="btn btn-circle btn-sm bg-white/90 hover:bg-white border-0 shadow-lg"
                                >
                                  ❮
                                </button>
                                <button
                                  onClick={(e) => { e.preventDefault(); goToSlide(item.id, idx === 2 ? 1 : idx + 2); }}
                                  className="btn btn-circle btn-sm bg-white/90 hover:bg-white border-0 shadow-lg"
                                >
                                  ❯
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    size="large"
                    sx={{
                      '.MuiPaginationItem-root': {
                        backgroundColor: '#fff',
                        border: '2px solid #e2e8f0',
                        color: '#475569',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                          borderColor: '#cbd5e1',
                        },
                      },
                      '.Mui-selected': {
                        backgroundColor: '#3b82f6',
                        color: '#fff',
                        borderColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#2563eb',
                          borderColor: '#2563eb',
                        },
                      },
                      '.MuiPaginationItem-previousNext': {
                        backgroundColor: '#fff',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                        },
                      },
                    }}
                  />
                </Stack>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
