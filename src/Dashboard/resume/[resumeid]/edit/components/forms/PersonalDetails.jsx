import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../../../service/GlobalApi';
import { toast } from "sonner"


function PersonalDetails({enableNext}) {

    const params =useParams();
    useEffect(()=>{
      console.log(params);
    },[])
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);

    const [formData,setFormData] = useState();
    const [loading,setLoading] = useState(false);
    const handleInputChange = (e)=>{
      enableNext(false)
        const {name , value} = e.target;

        setFormData({
          ...formData,
          [name] : value
        })
        setResumeInfo({
          ...resumeInfo,
          [name] : value
        })
    }

    const onSave = (e)=>{
      e.preventDefault();
      setLoading(true)
      const data = {
        data: formData
      }
      GlobalApi.updateResumeDetail(params?.resumeid,data).then(res=>{
        console.log(res)
        enableNext(true);
        setLoading(false);
        toast("Detail Updated")
      },(error)=>{
        console.log(error)
        setLoading(false)
      })

    }
    return(
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-large'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form onSubmit={onSave}>
          <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
                  <label className='text-sm font-bold'>First Name</label>
                  <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
            </div>
            <div>
                  <label className='text-sm font-bold'>Last Name</label>
                  <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
            </div>
            <div className='col-span-2'>
                  <label className='text-sm font-bold'>Job Title</label>
                  <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
            </div>
            <div className='col-span-2'>
                  <label className='text-sm font-bold'>Address</label>
                  <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
            </div>
            <div>
                  <label className='text-sm font-bold'>Phone</label>
                  <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
            </div>
            <div>
                  <label className='text-sm font-bold'>Email</label>
                  <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
            </div>
          </div>
          <div className='mt-3 flex justify-end'>
          <Button type="submit"
          disabled={loading}
          >{loading?<LoaderCircle className='animate-spin'/>:"Save"}</Button>
          </div>
        </form>
    </div>
  )
}

export default PersonalDetails