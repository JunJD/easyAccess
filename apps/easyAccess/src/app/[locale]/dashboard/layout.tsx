'use client'
import { SidebarSimple } from "@phosphor-icons/react";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar } from "../_components/Sidebar";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "apps/easyAccess/libs/ui/sheet";
import { Button } from "apps/easyAccess/libs/ui/Button";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 pb-0 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="bg-background">
              <SidebarSimple />
            </Button>
          </SheetTrigger>

          <SheetContent aria-describedby={undefined} showClose={false} side="left" className="focus-visible:outline-none">
            <SheetTitle className="hidden" />
            <SheetClose asChild className="absolute left-4 top-4">
              <Button size="icon" variant="ghost">
                <SidebarSimple />
              </Button>
            </SheetClose>

            <Sidebar setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      <motion.div
        initial={{ x: -220 }}
        animate={{ x: 0 }}
        className="bg-secondary hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[220px] lg:flex-col bg-info"
      >
        <div className="h-full rounded p-4">
          <Sidebar />
        </div>
      </motion.div>

      <main className="mx-6 my-4 lg:mx-8 lg:pl-[320px]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout