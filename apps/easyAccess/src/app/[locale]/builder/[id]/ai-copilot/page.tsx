import { Button } from "apps/easyAccess/libs/ui/Button"
import { Input } from "apps/easyAccess/libs/ui/input"
import { ScrollArea } from "apps/easyAccess/libs/ui/scroll-area"
import IconWithFallback from "../../_component/IconWithFallback"
import {
    SortAscending as Send,
} from "@phosphor-icons/react/dist/ssr"

const AICopilotPage = () => {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">AI Copilot</h2>
            <div className="rounded-lg border p-4 h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-gray-800">
                <ScrollArea className="flex-1 mb-4">
                    <div className="space-y-4">
                        <div className="bg-muted p-3 rounded-lg">
                            <p className="font-semibold">AI Copilot</p>
                            <p>Hello! I'm your AI Copilot. How can I assist you with your resume today?</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg">
                            <p className="font-semibold">You</p>
                            <p>Can you help me improve my professional summary?</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                            <p className="font-semibold">AI Copilot</p>
                            <p>I'd be happy to help you improve your professional summary. Could you please share your current summary or tell me about your professional background, key skills, and career goals?</p>
                        </div>
                    </div>
                </ScrollArea>
                <div className="flex items-center space-x-2">
                    <Input placeholder="Type your message here..." />
                    <Button size="icon">
                        <IconWithFallback icon={Send} className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AICopilotPage