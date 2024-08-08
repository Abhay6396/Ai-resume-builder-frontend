import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../../../service/GlobalApi';
import { toast } from "sonner"
import { Brain, LoaderCircleIcon } from 'lucide-react'
import { AIChatSession } from '../../../../../../../service/AIModal'

const prompt ="Job Title:{jobTitle},Depends on job title given me summery for my resume within 4-5 lines";
function Summery({enableNext}) {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)
    const [summery , setSummery] = useState();
    const [loading ,setLoading] = useState(false);
    const params =useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList] = useState();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummaryFromAI = async()=>{
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}',resumeInfo?.jobTitle)
        console.log(PROMPT)
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(result.response.text());
        setSummery(result.response.text())
        setLoading(false)
    }

    const onSave = (e)=>{
      e.preventDefault();
      setLoading(true)
      const data = {
        data: {
            summery:summery
        }
      }
      GlobalApi.updateResumeDetail(params?.resumeid,data).then(res=>{
        console.log(res)
        console.log(summery)
        enableNext(true);
        setLoading(false);
        toast("Detail Updated")
      },(error)=>{
        console.log(error)
        setLoading(false)
      })

    }
    
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-large'>Summery</h2>
        <p>Add Summery for your job Title</p>
        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} type="button" size="sm" className="border-primary text-primary flex gap-2"> <Brain/>Generate From Ai</Button>
            </div>
            <Textarea className="mt-5" defaultValue={resumeInfo.summery}
            onChange={(e)=>setSummery(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
          disabled={loading}
          >{loading?<LoaderCircleIcon className='animate-spin'/>:"Save"}</Button>
            </div>
        </form>
        </div>    
    </div>
  )
}

export default Summery