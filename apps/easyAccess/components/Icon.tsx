import { cn } from "@easy-access/utils";
import { useTheme } from "next-themes";
// import { useTheme } from "@reactive-resume/hooks";


type Props = {
  size?: number;
  className?: string;
};

export const Icon = ({ size = 32, className }: Props) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark';

  let src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  switch (isDarkMode) {
    case false: {
      src = "/icon/dark.svg";
      break;
    }
    case true: {
      src = "/icon/light.svg";
      break;
    }
  }

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="Reactive Resume"
      className={cn("rounded-sm", className)}
    />
  );
};
