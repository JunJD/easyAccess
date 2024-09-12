
'use client'
import { useResumeStore } from "apps/easyAccess/src/store/resume/store";
import { Panel, PanelGroup, PanelResizeHandle } from "apps/easyAccess/libs/ui/resizable-panel"
import { cn } from "@easy-access/utils"
import { debounce } from "lodash-es"
import SidebarContent from "../_component/SidebarContent"


const BuilderLayout = ({ children }: { children: React.ReactNode }) => {
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
                        <iframe
                            // ref={setFrameRef}
                            // title={resume.id}
                            src="https://ui.shadcn.com/docs/components/tooltip"
                            className="mt-16 w-screen"
                            style={{ height: `calc(100vh - 64px)` }}
                        />
                    </main>
                </Panel>
                <PanelResizeHandle
                    isDragging={panel.right.isDragging}
                    onDragging={setRightDragging}
                />

                <Panel defaultSize={0} minSize={35} maxSize={45} className={cn("z-10", !panel.right.isDragging && "transition-[flex]")} onResize={debounce(rightSetSize)}>
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