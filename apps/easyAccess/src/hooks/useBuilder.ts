'use client'
import { ResumeData } from "apps/easyAccess/libs/schema"
import { useResumeStore } from "apps/easyAccess/src/store/resume/store"
import { useEffect } from "react"

const useBuilder = (id: string) => {

    const setActiveBuilderDataById = useResumeStore(state => state.setActiveBuilderDataById)
    const builderData: ResumeData = useResumeStore(state => state.activeResumeData)
    useEffect(()=>{
        setActiveBuilderDataById(id)
    }, [id])

    return builderData
}

export default useBuilder