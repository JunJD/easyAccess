'use client'
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { ResumeType } from "apps/easyAccess/src/types/resume/resumes";
import { useParams } from "next/navigation";
import { useEffect } from "react";
const BuilderPage = () => {
    // 获取next文件动态路由参数
    const { id } = useParams()

    const [setActiveBuilderById, resumeBuilder] = useResumeStore(s => [s.setActiveBuilderById,s.activeResumeBuilder])

    useEffect(() => {
        setActiveBuilderById(id as ResumeType['builderId'])
    }, [id])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Builder Page</h1>
            <p className="text-lg">{
                resumeBuilder.basics.email
            }</p>
        </div>
    )
}

export default BuilderPage