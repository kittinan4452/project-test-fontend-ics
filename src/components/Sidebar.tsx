import { Box, Divider } from '@mui/material'
import React from 'react'
import Logo from "../../public/images/ics-logo.jpg"
import ListIcon from '@mui/icons-material/List';
type Props = {}

export default function Sidebar({}: Props) {
  return (
    <div className='absolute w-[90px] h-[1456px] max-md:h-0  rounded-r-[50px] md:bg-white md:shadow-2xl md:border  left-0 top-0 ' >
        <div className='flex justify-center'>
        <div className='mt-[25px] mb-[25px] max-xl:mt-4 '>
            <img src={Logo} width={53} height={53} className='max-xl:rounded-xl'/>
        </div>
        </div>
        <Divider className='max-xl:hidden'/>
        <div className='flex justify-center'>
                <div className='w-[36px] h-[58px] my-[25px] max-xl:hidden'>
                <div className='bg-[#0f1d56] flex justify-center w-[36px] h-[36px]  rounded-lg'>
                <div className='border-white border w-[20px] h-[15px] mt-[10px] rounded-sm'>
                <ListIcon  fontSize='small' className='mt-[-16px] ml-[-1px] text-white ' />
                </div>
                
                </div>
                <div>
                    <h1 className='font-kanit text-black'>Place</h1>
                </div>
                
            </div>

        </div>
        <Divider className='max-xl:hidden'/>
        
        <div className='mt-10'></div>
    </div>
  )
}