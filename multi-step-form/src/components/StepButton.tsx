import { MouseEventHandler } from "react";
import "./StepButton.css";

interface StepButtonProps {
    active: boolean,
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    step: Number,
    stepName?: String
}

function StepButton({ active, step, /* stepName */  }: StepButtonProps) {
    return <div className="step-button">
        <label htmlFor="">
            {/* <div className="step-info">
                <p>Step #{ step.toString() }</p>
                <h3>{ stepName }</h3>
            </div> */}
            <button className={ active ? "active" : ""}>
                { step.toString() }
            </button>
        </label>
    </div>
}

export default StepButton;