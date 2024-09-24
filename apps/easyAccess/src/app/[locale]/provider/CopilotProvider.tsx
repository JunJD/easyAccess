"use client";

import { CopilotKit } from "@copilotkit/react-core";
// import { CopilotSidebar } from "@copilotkit/react-ui";
import { PropsWithChildren } from "react";

export default function CopilotKitProvider({ children }: PropsWithChildren) {
    return (
        <CopilotKit runtimeUrl="/api/copilotkit" >
            {children}
        </CopilotKit>
    );
}