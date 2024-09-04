
import { cn } from "@easy-access/utils";
import { FadersHorizontal, ReadCvLogo } from "@phosphor-icons/react";
import { Icon } from "apps/easyAccess/components/Icon";
import { Button } from "apps/easyAccess/libs/ui/Button";
import { Separator } from "apps/easyAccess/libs/ui/Separator";
import { KeyboardShortcut } from "apps/easyAccess/libs/ui/shortcut";
import { Link, useRouter, getPathname, usePathname } from "apps/easyAccess/src/navigation";
import { LocaleMode } from "apps/easyAccess/src/types/locale";
// import { Button, KeyboardShortcut, Separator } from "@reactive-resume/ui";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";


import useKeyboardShortcut from "use-keyboard-shortcut";

type Props = {
    className?: string;
};

const ActiveIndicator = ({ className }: Props) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
            "size-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info",
            className,
        )}
    />
);

type SidebarItem = {
    path: string;
    name: string;
    shortcut?: string;
    icon: React.ReactNode;
};

type SidebarItemProps = SidebarItem & {
    onClick?: () => void;
};

const SidebarItem = ({ path, name, shortcut, icon, onClick }: SidebarItemProps) => {
    const pathname = usePathname()
    const isActive = pathname === path;
    return (
        <Button
            asChild
            size="lg"
            variant="ghost"
            className={cn(
                "h-auto justify-start px-4 py-3 hover:text-primary",
                isActive && "pointer-events-none bg-secondary/50 text-primary",
            )}
            onClick={onClick}
        >
            <Link href={path}>
                <div className="mr-3">{icon}</div>
                <span>{name}</span>
                {!isActive && <KeyboardShortcut className="ml-auto">{shortcut}</KeyboardShortcut>}
                {isActive && <ActiveIndicator className="ml-auto" />}
            </Link>
        </Button>
    );
};

type SidebarProps = {
    setOpen?: (open: boolean) => void;
};

export const Sidebar = ({ setOpen }: SidebarProps) => {
    //   const { user } = useUser();
    //   const navigate = useNavigate();

    const router = useRouter()
    
    useKeyboardShortcut(["shift", "r"], () => {
        router.push("/resumes")
        setOpen?.(false);
    });
    
    useKeyboardShortcut(["shift", "s"], () => {
        router.push("/resumes")
        setOpen?.(false);
    });

    const sidebarItems: SidebarItem[] = [
        {
            path: "/dashboard/resumes",
            name: `Resumes`,
            shortcut: "⇧R",
            icon: <ReadCvLogo />,
        },
        {
            path: "/dashboard/settings",
            name: `Settings`,
            shortcut: "⇧S",
            icon: <FadersHorizontal />,
        },
    ];

    return (
        <div className="flex h-full flex-col gap-y-4">
            <div className="ml-12 flex justify-center lg:ml-0">
                <Button asChild size="icon" variant="ghost" className="size-10 p-0">
                    <Link href="/">
                        <Icon size={24} className="mx-auto hidden lg:block" />
                    </Link>
                </Button>
            </div>

            <Separator className="opacity-50" />

            <div className="grid gap-y-2">
                {sidebarItems.map((item) => (
                    <SidebarItem {...item} key={item.path} onClick={() => setOpen?.(false)} />
                ))}
            </div>

            <div className="flex-1" />

            <Separator className="opacity-50" />

            {/* <UserOptions>
        <Button size="lg" variant="ghost" className="w-full justify-start px-3">
          <UserAvatar size={24} className="mr-3" />
          <span>{user?.name}</span>
        </Button>
      </UserOptions>

      <Copyright className="ml-2" /> */}
        </div>
    );
};
