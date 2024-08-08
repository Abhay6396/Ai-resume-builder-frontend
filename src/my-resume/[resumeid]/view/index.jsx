import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/Dashboard/resume/[resumeid]/edit/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeid } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeid).then(
      (res) => {
        console.log(res);
        setResumeInfo(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const HandleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Your Resume Is Ready !
          </h2>
          <p className="text-center text-gray-400">
            Now your resume is ready you can download and share{" "}
          </p>
          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            
            <RWebShare
              data={{
                text: "Hey! click here to open my resume",
                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeid+"/view",
                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
             <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
