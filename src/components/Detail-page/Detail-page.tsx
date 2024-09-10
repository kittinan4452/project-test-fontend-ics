import React ,{ useState }from 'react';
import Data from "../..//json-file/example_data.json";
import { useParams, useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Navbar from "../Navbar"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ImageIcon from '@mui/icons-material/Image';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
  const [selectedSegment, setSelectedSegment] = useState<'information' | 'image'>('information');

  const handleSegmentClick = (segment: 'information' | 'image') => {
    setSelectedSegment(segment);
  };

  return (
    <div className=''>
        <Navbar/>
    <div className='min-w-full min-h-[150vh]  max-sm:h-96  flex justify-center bg-white font-kanit max-lg:h-[1500px]  '>
      <div className='container'>
        
        <div className='flex flex-col my-6 items-cente'>
        <div className='flex justify-start flex-col  max-sm:ml-3 max-xl:ml-8'>
        <div >
        <button
                className='rounded-[30px] bg-[#134B8A] w-[100px] h-[44px] text-white font-medium max-sm:ml-1 max-lg:ml-12  xl:ml-28'
                onClick={() => navigate('/')} // ฟังก์ชันนำทางกลับไปยังหน้าแรก
              >
                <ArrowBackIosIcon fontSize='small' /> BACK
              </button>
        </div>
        <div className="flex rounded-full bg-white h-11 lg:hidden mt-4 mr-3 font-medium max-lg:ml-12 max-sm:ml-1  shadow-2xl">
          {/* ปุ่มแสดงโหมดรูปภาพ */} 
      <button
        className={`flex-1 py-2 max-sm:px-4 max-lg:px-10 rounded-full ${
          selectedSegment === 'information' ? 'bg-[#134B8A] text-white ' : 'bg-white text-blue-800'
        }`}
        onClick={() => handleSegmentClick('information')}
      >
        INFORMATION
      </button>
      {/* ปุ่มแสดงโหมดรูปภาพ */}
      <button
        className={`flex-1 py-2 px-4 rounded-full ${
          selectedSegment === 'image' ? 'bg-[#134B8A] text-white' : 'bg-white text-blue-800 '
        }`}
        onClick={() => handleSegmentClick('image')}
      >
        IMAGE
      </button>
    </div>
        </div>
        <div className='lg:bg-[#8fb3e9] max-xl:rounded-lg   rounded-lg max-xl:h-[1410px] max-xl:ml-10 xl:ml-28 xl:mr-10  sm:mb-14 sm:shadow-2xl max-sm:ml-1 max-lg:ml-20 max-xl:pl-5 pl-5   mt-10  flex justify-between xl:h-[1400px]  max-sm:h-48 max-xl:mb-14 max-lg:justify-center max-lg:h-0'>
          
          {/*แสดง Detail ข้อมูลวันเวลาที่เปิดร้าน และ ที่อยู่ข้องร้านอาหารต่างๆ */}
            <div className={` mt-5 mr-5 sm:w-[600px] max-lg:w-[1000px] lg:w-[500px] rounded-lg  max-sm:h-48  max-lg:mr-20 max-sm:mr-0  rounded-b-xl  ${
          selectedSegment === 'image' ? 'max-lg:hidden' : ''
        }`}>
              
            <div className='2xl:w-[1000px] max-xl:w-[510px] max-lg:w-[650px]  max-sm:w-[315px]  '>
            <img className='rounded-t-lg h-[450px] max-xl:w-[677px] max-sm:h-[250px] xl:w-[700px] lg:w-[1000px] 2xl:w-[680px] '  src={record.profile_image_url}/>
                </div>
                
                <div className='bg-white mb-10 rounded-b-xl text-black font-kanit max-sm:w-[315px] 2xl:w-[680px] max-sm:shadow-2xl xl:w-[700px]  max-xl:w-[510px] max-lg:rounded-lg max-lg:shadow-xl max-lg:w-[650px]' >
                    <div className='flex justify-between sm:mx-5 max-sm:ml-5 pt-8 pb-7'>
                    <div className='text-2xl  font-semibold'><StorefrontIcon/>  {record.name}</div>
                    <div className='mr-10 max-sm:mr-5 max-sm:mt-2 text-[#134B8A] '>
                        <FiberManualRecordIcon fontSize='small' className='mr-1' />
                        {record.rating}
                      </div>
                    </div>
                    <div className='space-y-5'>
                    <div className='flex sm:ml-5 text-black font-kanit max-sm:flex-wrap max-sm:ml-5 '><span className='font-bold mr-20 '><FmdGoodIcon/> Address: </span><p className='font-medium'>{record.address}</p></div>
                    <div className='flex ml-5 text-black font-kanit max-sm:flex-wrap max-sm:ml-5  '><span className='font-bold mr-10'><CalendarMonthIcon /> Opening Hour: </span><p className='pb-10 max-sm:mt-3 font-medium'>{record.operation_time.map((item, index) => (
        <div key={index} className='flex'>
          <div className=' mr-10 grid grid-cols-3 max-sm:mr-0  space-x-6 max-sm:text-sm max-lg:text-base max-xl:text-xs'>
            
            <div className=' col-span-1 w-28'><p>{item.day}: </p> </div>   
            <div className='col-span-2 text-center max-sm:pr-10 max-xl:w-full '><p>{item.time_open === 'closed' || item.time_close === 'closed' 
              ? <p>Closed</p>
              : <p><AccessTimeIcon/> {item.time_open} AM - {item.time_close} PM</p>}</p></div>
          </div>
          
        </div>
      ))}</p></div>
                    
                    </div>
                </div>
                </div>
                {/*แสดงรูปภาพของ Detail Image*/}
            <div className={`bg-white mt-5 mr-5 xl:w-[630px]  rounded-lg h-[1340px]  rounded-b-xl  max-sm:shadow-2xl max-sm:ml-0 max-xl:w-[600px] max-sm:h-[670px] max-lg:pl-2  max-lg:w-[800px] ${
          selectedSegment === 'information' ? 'max-lg:hidden' : ''
        }`}>
                <div className='mt-5 max-sm:ml-2 xl:ml-2 max-xl:ml-2  '>
                    <h1 className='text-black font-kanit text-xl '><ImageIcon/>Images</h1>
                </div>
                
                <div className="flex flex-col justify-center px-3 pb-1 ml-5 max-lg:ml-0 mt-3 max-sm:ml-0  max-xl:px-0 max-xl:mr-2  xl:ml-2 max-xl:ml-2  ">
                  <img className='w-[540px] h-[418px] xl:w-[610px] max-sm:h-[200px] max-lg:w-full  rounded-t-xl' src={record.images[0]} alt="Image 1" />
                  <img className='w-[540px] h-[418px] xl:w-[610px] max-sm:h-[200px] max-lg:w-full' src={record.images[1]} alt="Image 2" />
                  <img className='w-[540px] h-[418px] xl:w-[610px] max-sm:h-[200px] max-lg:w-full rounded-b-xl' src={record.images[2]} alt="Image 3" />
                </div>  
                
                
        
        </div>

        </div>

        </div>

        </div>
    </div>
    </div>
  );
}
