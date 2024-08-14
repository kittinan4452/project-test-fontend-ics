import React from 'react';
import Data from "../..//json-file/example_data.json";
import { useParams, useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Navbar from "../Navbar"
import Button from '@mui/material/Button';
interface RecordType {
  id: number;
  name: string;
  categories: string[]; 
  profile_image_url: string;
  operation_time: { time_open: string; time_close: string;day:string }[];
  images: string[];
  rating: number;
  description: string;
  address: string; // Assuming you have a description field
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const recordId = parseInt(id as string, 10);
  const record = Data.find((item) => item.id === recordId) as RecordType;
  const navigate = useNavigate(); 
  if (!record) {
    return <div>Record not found</div>;
  }

  return (
    <div>
        <Navbar/>
    <div className='min-w-full min-h-[150vh] flex justify-center bg-[#c4d3e9]  '>
      <div className='container'>
        
        <div className='flex flex-col my-6 items-cente'>
        <div className='flex justify-start rounded-full'>
        <Button
                className='rounded-xl'
                variant="contained"
                onClick={() => navigate('/')} // ฟังก์ชันนำทางกลับไปยังหน้าแรก
              >
                <ArrowBackIosIcon fontSize='small' /> BACK
              </Button>
        </div>
        <div className='bg-[#8fb3e9] mt-10 rounded-lg flex justify-between h-[1210px]'>

            <div className='mt-5 ml-5  '>
            
            <div className=''>
            <img className='rounded-t-lg h-[380px] w-[677px]'  src={record.profile_image_url}/>
                </div>
                
                <div className='bg-white mb-10 rounded-b-xl text-black font-kanit' >
                    <div className='flex justify-between mx-5 pt-8 pb-7'>
                    <div className='text-2xl  font-semibold'>{record.name}</div>
                    <div className='mr-10 text-[#134B8A]'>
                        <FiberManualRecordIcon fontSize='small' className='mr-1' />
                        {record.rating}
                      </div>
                    </div>
                    <div className='space-y-5'>
                    <div className='flex ml-5 text-black font-kanit '><span className='font-semibold mr-20'>Address:</span><p>{record.address}</p></div>
                    <div className='flex ml-5 text-black font-kanit '><span className='font-semibold mr-10'>Opening Hour:</span><p className='pb-10'>{record.operation_time.map((item, index) => (
        <div key={index} className='flex'>
          <p className=' mr-10 '>
            {item.day}: 
            {item.time_open === 'closed' || item.time_close === 'closed' 
              ? ' Closed'
              : `${item.time_open} AM - ${item.time_close} PM`}
          </p>
          
        </div>
      ))}</p></div>
                    
                    </div>
                </div>
                </div>
            <div className='bg-white mt-5 mr-5 w-[600px] rounded-lg h-[1150px] rounded-b-xl '>
                <div className='mt-5 ml-8'>
                    <h1 className='text-black font-kanit text-xl'>Images</h1>
                </div>
                
                <div className="flex flex-col justify-center px-3 pb-3 ml-5 mt-3">
                  <img className='w-[540px] h-[418px] rounded-t-xl' src={record.images[0]} alt="Image 1" />
                  <img className='w-[540px] h-[318px]' src={record.images[1]} alt="Image 2" />
                  <img className='w-[540px] h-[318px] rounded-b-xl' src={record.images[2]} alt="Image 3" />
                </div>  
                
                <div/>
        
        </div>

        </div>

        </div>

        </div>
    </div>
    </div>
  );
}
