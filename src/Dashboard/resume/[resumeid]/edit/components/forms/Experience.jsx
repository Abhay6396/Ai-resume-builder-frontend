import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../service/GlobalApi'
import { toast } from 'sonner';
import { data } from 'autoprefixer';

const formField={
    title : '',
    companyName :'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:''
}
function Experience() {
    const [experienceList,setExperienceList] = useState([]);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);

    
    useEffect(()=>{
        resumeInfo?.experience.length>0&&setExperienceList(resumeInfo?.experience)
        
    },[resumeInfo])

    const handleChange =(index,event)=>{
        const newEntries =  experienceList.slice();
        const {name,value} = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }
    const AddNewExperience =()=>{
        setExperienceList([...experienceList,{
            title : '',
            companyName :'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummery:''
        }])
    }
    const RemoveExperience =()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }
    const handleRichTextEditor=(e,name,index)=>{
        const newEntries =  experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }
    useEffect(()=>{
        console.log(experienceList)
        setResumeInfo({
            ...resumeInfo,
            experience : experienceList
        })
},[experienceList])

const onSave=()=>{
    setLoading(true)
    const data={
        data:{
            experience:experienceList.map(({ id, ...rest }) => rest)
        }
    }
    console.log(data)

     console.log(experienceList)

    GlobalApi.updateResumeDetail(params?.resumeid,data).then(res=>{
        console.log(res);
        setLoading(false);
        toast('Details updated !')
    },(error)=>{
        setLoading(false);
    })

}
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-large'>Professional Experience</h2>
        <p>Add Your Job Experience</p>
        <div>
            {experienceList.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input defaultValue={item?.title} name = "title" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input defaultValue={item?.companyName} name = "companyName" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input defaultValue={item?.city} name = "city" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input defaultValue={item?.state} name = "state" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input defaultValue={item?.startDate} type="date" name = "startDate" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input defaultValue={item?.endDate} type="date" name = "endDate" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div className='col-span-2'>
                            {/* {work Summery} */}
                            <RichTextEditor
                            defaultValue={item.workSummery}
                            index={index}
                            onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button onClick={AddNewExperience} variant="outline">+ Add More Experience</Button>
            <Button onClick={RemoveExperience} variant="outline">Remove</Button>
            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin'/>:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Experience