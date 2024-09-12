import { Microphone, Video } from "@phosphor-icons/react/dist/ssr"

import { Button } from "apps/easyAccess/libs/ui/Button"

const MockInterviewPage = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold mb-4">AI Video Mock Interview</h2>
        <div className="rounded-lg border p-4 h-[calc(100vh-12rem)] flex flex-col bg-white dark:bg-gray-800">
            <div className="flex-1 mb-4 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Video className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-lg font-semibold mb-2">Video Interview Simulation</p>
                <p className="text-sm text-gray-500 mb-4">Connect your camera and microphone to start</p>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <Button variant="outline" className="flex items-center justify-center">
                        <Video className="h-4 w-4 mr-2" />
                        Enable Camera
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center">
                        <Microphone className="h-4 w-4 mr-2" />
                        Enable Microphone
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                <Button className="w-full">Start Video Interview</Button>
                <p className="text-sm text-center text-gray-500">
                    The AI interviewer will ask you questions. Respond as you would in a real interview.
                </p>
            </div>
        </div>
    </div>
)

export default MockInterviewPage