import { ReactNode } from "react";
import "./FormStepContainer.css";

interface FormStepContainer {
    children: ReactNode | ReactNode[]
}

function FormStepContainer({ children }: FormStepContainer) {
    return <div className="form-step-container">
        { children }
    </div>
}

export default FormStepContainer;