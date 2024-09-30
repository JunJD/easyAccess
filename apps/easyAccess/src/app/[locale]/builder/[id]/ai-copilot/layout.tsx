
import { PropsWithChildren } from "react"
import CopilotKitProvider from "../../../provider/CopilotProvider"
const CopilotLayout = ({ children }: PropsWithChildren) => {
    return (
        <CopilotKitProvider>
                {children}
        </CopilotKitProvider>
    )
}

export default CopilotLayout