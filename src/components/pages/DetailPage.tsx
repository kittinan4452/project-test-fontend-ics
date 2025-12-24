import { useState } from 'react';
import Data from "../../data/example_data.json";
import { useParams, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ImageIcon from '@mui/icons-material/Image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from "../layout/Navbar"
import { Place } from '../../types';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const recordId = parseInt(id as string, 10);
  const record = Data.find((item) => item.id === recordId) as Place;
  const navigate = useNavigate();

  const [selectedSegment, setSelectedSegment] = useState<'information' | 'image'>('information');

  const handleSegmentClick = (segment: 'information' | 'image') => {
    setSelectedSegment(segment);
  };

  if (!record) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-kanit">Place Not Found</h2>
          <p className="text-gray-600 font-kanit">The place you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-50 group"
        >
          <ArrowBackIosIcon className="text-blue-600 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-gray-700 font-kanit">Back to Places</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Information */}
          <div className={`${selectedSegment === 'image' ? 'hidden lg:block' : ''}`}>
            {/* Profile Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <img
                src={record.profile_image_url}
                alt={record.name}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2 font-kanit flex items-center gap-2">
                    <StorefrontIcon className="text-blue-600" />
                    {record.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    {record.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-xl shadow-md">
                  <StarIcon />
                  <span className="text-xl font-bold">{record.rating}</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <LocationOnIcon className="text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1 font-kanit">Address</h3>
                    <p className="text-gray-600 font-kanit">{record.address}</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarMonthIcon className="text-blue-600" />
                    <h3 className="font-semibold text-gray-700 font-kanit">Opening Hours</h3>
                  </div>
                  <div className="space-y-2">
                    {record.operation_time.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                      >
                        <span className="font-medium text-gray-700 w-28 font-kanit">{item.day}</span>
                        {item.time_open === 'closed' || item.time_close === 'closed' ? (
                          <span className="text-red-500 font-semibold font-kanit">Closed</span>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-600">
                            <AccessTimeIcon className="text-sm text-blue-500" />
                            <span className="font-kanit">
                              {item.time_open} AM - {item.time_close} PM
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className={`${selectedSegment === 'information' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800 font-kanit">Gallery</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {record.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden shadow-md ${
                      idx === 0 ? 'rounded-t-2xl' : idx === record.images.length - 1 ? 'rounded-b-2xl' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${record.name} ${idx + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Segment Toggle */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex gap-2">
            <button
              onClick={() => handleSegmentClick('information')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 font-kanit ${
                selectedSegment === 'information'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 Information
            </button>
            <button
              onClick={() => handleSegmentClick('image')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 font-kanit ${
                selectedSegment === 'image'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🖼️ Images
            </button>
          </div>
        </div>

        {/* Mobile Bottom Spacer */}
        <div className="lg:hidden h-24"></div>
      </div>
    </div>
  );
}
