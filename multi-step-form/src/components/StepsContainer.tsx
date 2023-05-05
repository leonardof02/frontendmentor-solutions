import { ReactNode } from "react";
import "./StepsContainer.css";

interface StepsContainerProps {
    children: ReactNode | ReactNode[]
}

function StepsContainer({ children }: StepsContainerProps) {
    return <div className="steps-container">
        { children }
    </div>
}

export default StepsContainer;