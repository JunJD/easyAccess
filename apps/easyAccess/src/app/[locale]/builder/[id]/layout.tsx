
'use client'
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { Panel, PanelGroup, PanelResizeHandle } from "apps/easyAccess/libs/ui/resizable-panel"
import { cn } from "@easy-access/utils"
import { debounce } from "lodash-es"
import SidebarContent from "../_component/SidebarContent"
import { LegacyRef, useCallback, useEffect, useRef } from "react";


const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
    const panel = useResumeStore((state) => state.panel);
    const builder = useResumeStore(state => state.activeResumeBuilder)
    const leftSetSize = useResumeStore((state) => (size: number) => state.setPanelSize("left", size));
    const rightSetSize = useResumeStore((state) => (size: number) => state.setPanelSize("right", size));

    const setLeftDragging = useResumeStore((state) => (dragging: boolean) => state.setPaneDragging("left", dragging));
    const setRightDragging = useResumeStore((state) => (dragging: boolean) => state.setPaneDragging("right", dragging));

    const frameRef = useRef<HTMLIFrameElement | null>(null)


    const updateResumeInFrame = useCallback(() => {
        console.log('frameRef.current!.contentWindow', frameRef.current!.contentWindow)
        if (!frameRef.current!.contentWindow) return;
        const message = { type: "SET_RESUME", payload: builder };
        console.log(builder, 'resume.data');

        (() => {
            frameRef.current!.contentWindow.postMessage(message, "*");
        })();
    }, [frameRef, builder]);


    // 在初始加载时向iframe发送恢复数据
    useEffect(() => {
        if (!frameRef.current) return;
        frameRef.current!.addEventListener("load", updateResumeInFrame);
        return () => {
            frameRef.current!.removeEventListener("load", updateResumeInFrame);
        };
    }, [frameRef]);

    useEffect(updateResumeInFrame, [builder]);

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
                        <iframe
                            ref={(frameRef)}
                            src="/zh/artboard"
                            className="w-screen"
                            style={{ height: '100%' }}
                        />
                    </main>
                </Panel>
                <PanelResizeHandle
                    isDragging={panel.right.isDragging}
                    onDragging={setRightDragging}
                />

                <Panel defaultSize={0} minSize={25} maxSize={45} className={cn("z-10", !panel.right.isDragging && "transition-[flex]")} onResize={debounce(rightSetSize)}>
                    <div className="p-4 h-full border-l bg-background overflow-auto">
                        {children}
                        {/* {activeTab === "content" && <EditContent />} */}
                    </div>
                </Panel>

            </PanelGroup>
        </div >
    )
}

export default BuilderLayout