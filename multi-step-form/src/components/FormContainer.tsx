import { ReactNode } from "react";
import "./FormContainer.css";

interface FormContainerProps {
    children: ReactNode | ReactNode[]
}

function FormContainer({ children }: FormContainerProps) {
    return <div className="form-container">
        { children }
    </div>
}

export default FormContainer;