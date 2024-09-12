import { type Icon } from "@phosphor-icons/react"
// Helper function to render icon with fallback

const IconWithFallback = ({ icon: Icon, ...props }: { icon: Icon } & React.ComponentPropsWithoutRef<"svg">) => {
    if (!Icon) return null
    return <Icon {...props} />
}

export default IconWithFallback