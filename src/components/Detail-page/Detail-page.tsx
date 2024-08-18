import React ,{ useState }from 'react';
import Data from "../..//json-file/example_data.json";
import { useParams, useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Navbar from "../Navbar"

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
    <div>
        <Navbar/>
    <div className='min-w-full min-h-[150vh]  flex justify-center bg-white font-kanit  '>
      <div className='container'>
        
        <div className='flex flex-col my-6 items-cente'>
        <div className='flex justify-start flex-col  max-md:ml-3 max-xl:ml-8'>
        <div className='rounded-[30px]'>
        <button
                className='rounded-[30px] bg-[#134B8A] w-[100px] h-[44px] text-white font-medium '
                onClick={() => navigate('/')} // ฟังก์ชันนำทางกลับไปยังหน้าแรก
              >
                <ArrowBackIosIcon fontSize='small' /> BACK
              </button>
        </div>
        <div className="flex rounded-full bg-white h-11 md:hidden mt-4 mr-3 font-medium  shadow-2xl">
      <button
        className={`flex-1 py-2 px-4 rounded-full ${
          selectedSegment === 'information' ? 'bg-[#134B8A] text-white ' : 'bg-white text-blue-800'
        }`}
        onClick={() => handleSegmentClick('information')}
      >
        INFORMATION
      </button>
      <button
        className={`flex-1 py-2 px-4 rounded-full max-md:${
          selectedSegment === 'image' ? 'bg-[#134B8A] text-white' : 'bg-white text-blue-800 '
        }`}
        onClick={() => handleSegmentClick('image')}
      >
        IMAGE
      </button>
    </div>
        </div>
        <div className='md:bg-[#8fb3e9] max-md:ml-1 max-xl:ml-10 max-xl:pl-5 pl-5   mt-10 rounded-lg flex justify-between h-[1210px] max-xl:mb-14'>

            <div className={` mt-5 mr-5 w-[600px] rounded-lg h-[1150px] rounded-b-xl ${
          selectedSegment === 'image' ? 'max-md:hidden' : ''
        }`}>
              
            <div className='xl:w-[1000px]'>
            <img className='rounded-t-lg h-[380px] max-xl:w-[677px] max-md:h-[250px] xl:w-[800px]'  src={record.profile_image_url}/>
                </div>
                
                <div className='bg-white mb-10 rounded-b-xl text-black font-kanit max-md:shadow-2xl xl:w-[800px]  ' >
                    <div className='flex justify-between md:mx-5 max-md:ml-5 pt-8 pb-7'>
                    <div className='text-2xl  font-semibold'>{record.name}</div>
                    <div className='mr-10 max-md:mr-5 max-md:mt-2 text-[#134B8A] '>
                        <FiberManualRecordIcon fontSize='small' className='mr-1' />
                        {record.rating}
                      </div>
                    </div>
                    <div className='space-y-5'>
                    <div className='flex md:ml-5 text-black font-kanit max-md:flex-wrap max-md:ml-5 '><span className='font-bold mr-20 '>Address:</span><p className='font-medium'>{record.address}</p></div>
                    <div className='flex ml-5 text-black font-kanit max-md:flex-wrap max-md:ml-5  '><span className='font-bold mr-10'>Opening Hour:</span><p className='pb-10 max-md:mt-3 font-medium'>{record.operation_time.map((item, index) => (
        <div key={index} className='flex'>
          <p className=' mr-10 '>
            {item.day}: 
            {item.time_open === 'closed' || item.time_close === 'closed' 
              ? ' Closed'
              : ` ${item.time_open} AM - ${item.time_close} PM`}
          </p>
          
        </div>
      ))}</p></div>
                    
                    </div>
                </div>
                </div>
            <div className={`bg-white mt-5 mr-5 w-[600px] rounded-lg h-[1150px] rounded-b-xl max-md:shadow-2xl max-md:ml-0 xl:w-[670px] max-md:h-[980px] ${
          selectedSegment === 'information' ? 'max-md:hidden' : ''
        }`}>
                <div className='mt-5 ml-8 '>
                    <h1 className='text-black font-kanit text-xl'>Images</h1>
                </div>
                
                <div className="flex flex-col justify-center px-3 pb-1 ml-5 mt-3 max-md:ml-0 ">
                  <img className='w-[540px] h-[418px] xl:w-[610px] max-md:h-[300px] rounded-t-xl' src={record.images[0]} alt="Image 1" />
                  <img className='w-[540px] h-[318px] xl:w-[610px] max-md:h-[300px]' src={record.images[1]} alt="Image 2" />
                  <img className='w-[540px] h-[318px] xl:w-[610px]   max-md:h-[300px] rounded-b-xl' src={record.images[2]} alt="Image 3" />
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
