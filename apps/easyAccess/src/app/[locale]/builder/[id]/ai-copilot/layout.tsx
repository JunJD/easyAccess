
import { PropsWithChildren } from "react"
import CopilotKitProvider from "../../../provider/CopilotProvider"
import { TooltipProvider } from "apps/easyAccess/libs/ui/tooltip"
const CopilotLayout = ({ children }: PropsWithChildren) => {
    return (
        <CopilotKitProvider>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </CopilotKitProvider>
    )
}

export default CopilotLayout