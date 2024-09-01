import { ResumeEditor } from "@easy-access/resume-editor"
// import './editor-input.css'
const ResumePage = () => {
    return (
        <div className="w-full flex flex-col h-screen">
            <ResumeEditor content={undefined} preview={false}/>
        </div>
    )
}

export default ResumePage