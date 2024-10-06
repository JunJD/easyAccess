import { useRef, useState } from "react";

const useMouseHoverState = (duration: number = 200) => {
    const [isHovering, setIsHovering] = useState(false);
    const durationId = useRef<NodeJS.Timeout>();
    const handleMouseEnter = () => {
        durationId.current = setTimeout(() => {
            setIsHovering(true);
        }, duration);
    };

    const handleMouseLeave = () => {
        if (durationId.current) {
            clearTimeout(durationId.current);
            durationId.current = undefined;
        }
        setIsHovering(false);
    }
    return {
        isHovering,
        handleMouseEnter,
        handleMouseLeave
    }
}

export default useMouseHoverState;