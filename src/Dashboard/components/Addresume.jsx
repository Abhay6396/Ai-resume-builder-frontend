import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


function Addresume() {
    const [openDialog , setOpenDialog] = useState(false)
    const [resumeTitle,setResumeTitle] = useState();
    const {user} = useUser();
    const [loading,setLoading]= useState(false);
    const navgation = useNavigate();

    const onCreate=()=>{
        setLoading(true);
        const uuid = uuidv4();
        const data = {
            data:{
                title:resumeTitle,
                resumeid:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName
            }
        }
        GlobalApi.CreateNewResume(data).then(res=>{
            console.log(res.data.data.documentId);
            if(res){
                setLoading(false)
                navgation('/dashboard/resume/'+res.data.data.documentId+"/edit");
            }
        },(err)=>{
            setLoading(false);
        })
    }
    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
            onClick={()=>setOpenDialog(true)}
            >
        <PlusSquare/>
    </div>

        <Dialog open={openDialog}>
        
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Create your Resume</DialogTitle>
            <DialogDescription>
                <p>Add title for your resume</p>
                <Input className="my-2" placeholder="Ex.Web Development resume" 
                    onChange={(e)=>setResumeTitle(e.target.value)}
                />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
                <Button variant="ghost" onClick={()=>setOpenDialog(false)} >Cancel</Button>
                <Button
                disabled={!resumeTitle || loading} 
                onClick={()=>onCreate()}>
                    {loading?
                    <Loader2 className='animation-spin'/>:"Create"   
                }
                    </Button>
            </div>
        </DialogHeader>
        </DialogContent>
        </Dialog>
        </div>
    

    )
}

export default Addresume