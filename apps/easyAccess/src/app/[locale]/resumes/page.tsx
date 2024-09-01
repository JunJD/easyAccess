import { ResumeEditor } from "@easy-access/resume-editor"
// import './editor-input.css'
const ResumePage = () => {
    return (
        <div className="w-full flex flex-col" spellCheck={false}>
            <ResumeEditor content={undefined} preview={false}/>
        </div>
    )
}

export default ResumePage