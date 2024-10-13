// app/api/inference.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { transcribe, getCompletion, toSpeech } from '../../path/to/your/aiFunctions'; // 导入你的 AI 函数
// import { Fields, Files, IncomingForm } from "formidable";
import OpenAI from 'openai';

export interface RecordMineType {
    extension: 'webm' | 'mp4';
    mineType: 'audio/webm' | 'audio/mp4';
}

export const getRecordMineType = (): RecordMineType => {
    try {
        return MediaRecorder.isTypeSupported('audio/webm')
            ? {
                extension: 'webm',
                mineType: 'audio/webm',
            }
            : {
                extension: 'mp4',
                mineType: 'audio/mp4',
            };
    } catch {
        return {
            extension: 'webm',
            mineType: 'audio/webm',
        };
    }
};

export interface OpenAISTTPayload {
    options: {
        /**
         * @title 语音文件格式
         */
        mineType: RecordMineType;
        /**
         * @title 语音识别的模型名称
         */
        model: string;
        /**
         * @title 语音识别的prompt 以更好的获得whisper的解析效果
         */
        prompt?: string;
    };
    /**
     * @title 语音识别的文件
     */
    speech: Blob;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_URL,
    maxRetries: 3,
    timeout: 60 * 1000 // 60s
});

export interface CreateOpenaiAudioTranscriptionsOptions {
    openai: OpenAI;
    payload: OpenAISTTPayload;
}

export const transcribe = async ({
    payload,
    openai,
}: CreateOpenaiAudioTranscriptionsOptions) => {
    const { speech, options } = payload;

    const file = new File([speech], `${Date.now()}.${options.mineType.extension}`, {
        type: options.mineType.mineType,
    });

    const response = await openai.audio.transcriptions.create(
        {
            file,
            model: options.model,
            prompt: options.prompt || '',
        },
        { headers: { Accept: '*/*' } },
    );

    return response;
};

export default async function POST(req: Request) {
    try {
        const payload = (await req.json());


        const res = await transcribe({ openai, payload });

        const userPromptText = res.text.replace(/(\r\n|\n|\r)/gm, " ");

        const conversation =
            payload.conversation || [{ role: 'user', content: userPromptText }];


        // 这里你需要根据你的文件系统来设置正确的文件路径
        return new Response(JSON.stringify(conversation), {
            status: 200,
        })
    } catch (error) {
        console.error(error);
        return new Response('Error processing audio file', { status: 500 });
    }
}

// function _constructResponseHeader(userPrompt: string, aiResponse: string) {
//     return Buffer.from(
//         JSON.stringify([
//             { role: 'user', content: userPrompt },
//             { role: 'assistant', content: aiResponse },
//         ])
//     ).toString('base64');
// }