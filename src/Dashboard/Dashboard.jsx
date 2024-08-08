import React, { useEffect, useState } from 'react'
import Addresume from './components/Addresume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {

  const {user} = useUser();
  const [resumeList,setREsumeList] = useState([]);
  
  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  // use to get user resume list
  const GetResumesList = ()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(res=>{
      setREsumeList(res.data.data)
    })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h1 className='font-bold text-3xl'>My Resume</h1>
      <p className='mt-2'>Start Creating Ai resume to your next Job Role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <Addresume/>
        {resumeList.length>0&&resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard