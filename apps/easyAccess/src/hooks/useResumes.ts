'use client'
import { useEffect, useState } from "react"
import { useResumeStore } from "apps/easyAccess/src/store/resume/store"


const useResumes = () => {
    const [loading, setLoading] = useState(false)
    const getResumeList = useResumeStore((state) => state.getResumeList)
    const resumes = useResumeStore(s => s.resumeBuilderList)
    useEffect(() => {
        (async () => {
            setLoading(true)
            await getResumeList()
            setLoading(false)
        })()
    }, [])

    return {resumes, loading}
}

export default useResumes