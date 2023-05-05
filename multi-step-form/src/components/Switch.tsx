import { MouseEventHandler } from "react"
import "./Switch.css"

interface SwitchProps {
    left: string,
    right: string
    onRight: boolean
    onClick: MouseEventHandler<HTMLDivElement>
}

function Switch({ left, right, onRight, onClick }: SwitchProps) {
    return <div className="switch-panel">
        <span className={ onRight ? "disabled" : "" }>{ left }</span>
        <div className="switch-container" onClick={ onClick }>
            <div className={ "switch" + (onRight ? " onRight" : " onLeft") }></div>
        </div>
        <span className={ (! onRight ) ? "disabled" : "" }>{ right }</span>
    </div>
}

export default Switch;