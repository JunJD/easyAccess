import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { NextRequest } from "next/server";

const isLocal = process.env.HOSTNAME === 'localhost'

const openai = new OpenAI({
    baseURL: process.env.OPENAI_API_URL,
    apiKey: process.env.OPENAI_API_KEY,
});
const serviceAdapter = new OpenAIAdapter({ 
    openai,
    model: isLocal? "gpt-3.5-turbo": "gpt-4o-mini"
});

const runtime = new CopilotRuntime();

export const POST = async (req: NextRequest) => {

    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime,
        serviceAdapter,
        endpoint: "/api/copilotkit",
    });

    return handleRequest(req);
};