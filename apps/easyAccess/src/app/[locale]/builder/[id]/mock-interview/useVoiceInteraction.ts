import { useState, useCallback, useEffect } from 'react';
import { useMicVADWrapper } from './useMicVADWrapper';

type InterviewState = 'idle' | 'userSpeaking' | 'aiSpeaking' | 'processing' | 'loading';

interface VoiceInteractionHook {
    interviewState: InterviewState;
    startInterview: () => void;
    stopInterview: () => void;
    aiResponse: string | null;
}

export const useVoiceInteraction = (): VoiceInteractionHook => {
    const [interviewState, setInterviewState] = useState<InterviewState>('idle');
    const [aiResponse, setAiResponse] = useState<string | null>(null);

    const handleLoadingChange = useCallback((loading: boolean) => {
        setInterviewState(loading ? 'loading' : 'idle');
    }, []);



    const handleSpeechStart = useCallback(() => {
        console.log("Speech started");
        setInterviewState('userSpeaking');
    }, []);

    const handleSpeechEnd = useCallback(async (audio: Float32Array) => {
        console.log("Speech ended");
        setInterviewState('processing');
        await processAudio(audio);
    }, []);

    const handleMisfire = useCallback(() => {
        console.log("VAD misfire");
        setInterviewState('idle');
    }, []);

    const micVAD = useMicVADWrapper({
        onLoadingChange: handleLoadingChange,
        onMisfire: handleMisfire,
        onSpeechEnd: handleSpeechEnd,
        onSpeechStart: handleSpeechStart
    });
    const processAudio = async (audio: Float32Array) => {
        try {
            const response = await sendAudioToServer(audio);
            setAiResponse(response);
            setInterviewState('aiSpeaking');

            // Simulate AI speaking time
            setTimeout(() => {
                setInterviewState('idle');
            }, 3000);
        } catch (error) {
            console.error("Error processing audio:", error);
            setInterviewState('idle');
        }
    };

    const sendAudioToServer = async (audio: Float32Array): Promise<string> => {
        // This is a placeholder for the actual server communication
        // In a real implementation, you would send the audio data to your server
        // and receive the AI's response
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating network delay
        return "这是AI的回答。在实际应用中，这里应该是服务器返回的回答。";
    };

    const startInterview = useCallback(() => {
        micVAD.start();
        setInterviewState('idle');
        setAiResponse("欢迎参加面试，请介绍一下你自己。");
    }, [micVAD]);

    const stopInterview = useCallback(() => {
        micVAD.pause();
        setInterviewState('idle');
        setAiResponse(null);
    }, [micVAD]);

    return {
        interviewState,
        startInterview,
        stopInterview,
        aiResponse,
    };
};