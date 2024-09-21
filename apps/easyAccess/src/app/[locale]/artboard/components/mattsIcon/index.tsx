import { cn } from "@easy-access/utils"
import React from "react"

interface MattsIconProps {
    color: string,
    offset: number | string,
    colNum: number,
    rowNum: number,
    renderText: (p: Partial<Omit<MattsIconProps, 'renderText'>>) => React.ReactNode
    className?: string
}

export const MattsIcon: React.FC<MattsIconProps> = ({ color, renderText, offset, colNum, rowNum, className }) => {
    return (
        <div className={cn("icon-container relative top-0 left-0", className)} style={{
            width: colNum * 2 + 'px',
            height: rowNum * 2 + 'px',
        }}>
            <svg width={colNum * 2} height={rowNum * 2} viewBox={`0 0 ${colNum * 2} ${rowNum * 2}`} className="absolute left-0 top-0">

                {
                    Array.from({ length: rowNum - 1 }).fill(0).map((_, i) => {
                        return (
                            <line key={'row_'+i} x1="0" y1={2 * (i + 1)} x2={colNum * 2} y2={2 * (i + 1)} stroke={color} strokeWidth="0.3" />
                        )
                    })
                }

                {
                    Array.from({ length: colNum - 1 }).fill(0).map((_, i) => {
                        return (
                            <line  key={'col_'+i} x1={2 * (i + 1)} y1="0" x2={2 * (i + 1)} y2={rowNum * 2} stroke={color} strokeWidth="0.3" />
                        )
                    })
                }

                <line x1="0" y1="0" x2={colNum * 2} y2="0" stroke={color} strokeWidth="0.3" />
                <line x1="0" y1="0" x2="0" y2={rowNum * 2} stroke={color} strokeWidth="0.3" />
            </svg>
            <div className={`absolute text-xs`}
                style={{
                    inset: offset
                }}
            >
                {renderText({ color })}
            </div>
        </div>
    )
}