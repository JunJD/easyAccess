'use client'
import { useParams } from "next/navigation"

const SectionPage = () => {
    const params = useParams()
    return (
        <div>section{params.section}</div>
    )
}

export default SectionPage