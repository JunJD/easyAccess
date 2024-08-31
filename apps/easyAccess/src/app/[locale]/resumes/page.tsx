import { ResumeEditor } from "@easy-access/resume-editor"

const ResumePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Resume</h1>
            <ResumeEditor content={undefined} preview={false}/>
        </div>
    )
}

export default ResumePage