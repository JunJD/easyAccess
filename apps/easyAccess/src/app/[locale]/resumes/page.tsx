import { ResumeEditor } from "@easy-access/resume-editor"
import './editor-input.css'
const ResumePage = () => {
    return (
        <div className="w-full flex flex-col h-screen">
            <h1 className="text-4xl font-bold mb-4">Resume</h1>
            <ResumeEditor content={undefined} preview={false}/>
        </div>
    )
}

export default ResumePage