import {useEffect, useRef} from "react";

const Canvas = (props: any) => {
    const {draw, ...rest} = props;
    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} {...rest}/>
}

const useCanvas = (draw: any) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas!.getContext('2d')
        const displayWidth = canvas!.width
        const displayHeight = canvas!.height

        // projection center coordinates sets location of origin
        const projCenterX = displayWidth / 2
        const projCenterY = displayHeight / 2

        let animationFrameId: number | null = null

        const render = () => {
            draw(context, displayWidth, displayHeight, projCenterX, projCenterY)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            animationFrameId && window.cancelAnimationFrame(animationFrameId!)
        }
    }, [draw])

    return canvasRef
}

export default Canvas