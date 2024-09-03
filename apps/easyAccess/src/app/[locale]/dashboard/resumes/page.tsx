
'use client'
import { List, SquaresFour } from "@phosphor-icons/react";

import { motion } from "framer-motion";
import { useState } from "react";

import { GridView } from "./_layouts/grid";
// import { ListView } from "./_layouts/list";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "apps/easyAccess/libs/ui/tabs";
import { ScrollArea } from "apps/easyAccess/libs/ui/scroll-area";

type Layout = "grid" | "list";

const ResumesPage = () => {
    const [layout, setLayout] = useState<Layout>("grid");

    return (
        <Tabs
            value={layout}
            className="space-y-4"
            onValueChange={(value: any) => {
                setLayout(value as Layout);
            }}
        >
            <div className="flex items-center justify-between">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold tracking-tight"
                >
                    Resumes
                </motion.h1>

                <TabsList>
                    <TabsTrigger value="grid" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
                        <SquaresFour />
                        <span className="ml-2 hidden sm:block">Grid</span>
                    </TabsTrigger>
                    <TabsTrigger value="list" className="size-8 p-0 sm:h-8 sm:w-auto sm:px-4">
                        <List />
                        <span className="ml-2 hidden sm:block">List</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)]">
                <TabsContent value="grid">
                    <GridView />
                </TabsContent>
                <TabsContent value="list">
                    <GridView />
                </TabsContent>
            </ScrollArea>
        </Tabs>
    );
};

export default ResumesPage
