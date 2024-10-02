
'use client'
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { Panel, PanelGroup, PanelResizeHandle } from "apps/easyAccess/libs/ui/resizable-panel"
import { cn } from "@easy-access/utils"
import { debounce } from "lodash-es"
import SidebarContent from "../_component/SidebarContent"

import { NotIframeProviders } from "../../artboard/providers/notIframe";
import ArtboardPage from "../../artboard/page";
import { useParams } from "next/navigation";
import useBuilder from "apps/easyAccess/src/hooks/useBuilder";
import { ScrollArea } from "apps/easyAccess/libs/ui/scroll-area";

const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
    const params = useParams()
    const id = params.id
    const builderData = useBuilder(id as string)

    const panel = useResumeStore((state) => state.panel);
    const leftSetSize = useResumeStore((state) => (size: number) => state.setPanelSize("left", size));
    const rightSetSize = useResumeStore((state) => (size: number) => state.setPanelSize("right", size));

    const setLeftDragging = useResumeStore((state) => (dragging: boolean) => state.setPaneDragging("left", dragging));
    const setRightDragging = useResumeStore((state) => (dragging: boolean) => state.setPaneDragging("right", dragging));

    return (
        <div className="relative size-full overflow-hidden">
            <PanelGroup direction="horizontal">
                <Panel
                    collapsedSize={panel.left.size}
                    minSize={25}
                    maxSize={45}
                    defaultSize={0}
                    className={cn("z-10", !panel.left.isDragging && "transition-[flex]")}
                    onResize={debounce(leftSetSize)}
                >
                    <SidebarContent />
                </Panel>

                <PanelResizeHandle
                    isDragging={panel.left.isDragging}
                    onDragging={setLeftDragging}
                />
                <Panel >
                    <main className="w-full absolute inset-0">
                        <NotIframeProviders resume={builderData}>
                            <ArtboardPage/>
                        </NotIframeProviders>
                    </main>
                </Panel>
                <PanelResizeHandle
                    isDragging={panel.right.isDragging}
                    onDragging={setRightDragging}
                />

                <Panel defaultSize={0} minSize={25} maxSize={45} className={cn("z-10", !panel.right.isDragging && "transition-[flex]")} onResize={debounce(rightSetSize)}>
                    <ScrollArea className="h-screen border-l bg-background" hideScrollbar>
                        {children}
                    </ScrollArea>
                </Panel>

            </PanelGroup>
        </div >
    )
}

export default BuilderLayout