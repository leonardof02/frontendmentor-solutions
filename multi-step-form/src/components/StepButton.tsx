import { MouseEventHandler } from "react";
import "./StepButton.css";

interface StepButtonProps {
    active: boolean,
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    step: Number,
    stepName?: String
}

function StepButton({ active, step, stepName, handleClick }: StepButtonProps) {
    return <div className="step-button">
        <label htmlFor="" className="step-controls">
            <div className="step-info">
                <p>{ `Step #${step}` }</p>
                <h3>{ stepName }</h3>
            </div>
            <button className={ active ? "active" : ""} onClick={ handleClick }>
                { step.toString() }
            </button>
        </label>
    </div>
}

export default StepButton;