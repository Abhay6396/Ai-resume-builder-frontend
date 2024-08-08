import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
    
    const [loading,setLoading] = useState(false)
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
    const params = useParams();
    const [educationalList,setEducatinalList] = useState([{

        universityName : '',
        degree: '',
        major: '',
        startDate : '',
        endDate: '',
        description: ''

    }])

    useEffect(()=>{
        resumeInfo&&setEducatinalList(resumeInfo?.education)
      },[])
    const handleChange = (event,index)=>{
        const newEntries =  educationalList.slice();
        const {name,value} = event.target;
        newEntries[index][name] = value;
        setEducatinalList(newEntries);
    }

    const AddNewEducation = ()=>{
        setEducatinalList([...educationalList,{
        universityName : '',
        degree: '',
        major: '',
        startDate : '',
        endDate: '',
        description: ''
        }])
    }
    const RemoveEducation = ()=>{
        setEducatinalList(educationalList=>educationalList.slice(0,-1));
    }
    const onSave =()=>{
        setLoading(true)
        const data = {
            data:{
                education : educationalList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.updateResumeDetail(params.resumeid,data).then(res=>{
            console.log(res);
            setLoading(false);
            toast("Details Updated !");
        },(err)=>{
            setLoading(false)
            toast('Server error Please try Again !');
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
    },[educationalList])
  return (
    
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-large'>Education</h2>
        <p>Add Your Educational Details</p>

        {educationalList.map((item,index)=>(
            <div key={index}>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div className='col-span-2'>
                        <label>University Name</label>
                        <Input defaultValue={item?.universityName} name="universityName" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div>
                        <label>Degree</label>
                        <Input defaultValue={item?.degree} name="degree" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div>
                        <label>Major</label>
                        <Input name="major" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <Input type="date" name="startDate" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div>
                        <label>End Date</label>
                        <Input type="date" name="endDate" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                    <div className='col-span-2'>
                        <label>Description</label>
                        <Textarea name="description" onChange={(e)=>handleChange(e,index)}/>
                    </div>
                </div>
            </div>
        ))}
        <div className='flex justify-between'>
                <div className='flex gap-2'>
                <Button onClick={AddNewEducation} variant="outline">+ Add More Education</Button>
                <Button onClick={RemoveEducation} variant="outline">Remove</Button>
                </div>
                <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin'/>:'Save'}    
                </Button>
        </div>
    </div>
  )
}

export default Education