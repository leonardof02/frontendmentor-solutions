import FormStepContainer from "./components/FormStepContainer";
import StepButton from "./components/StepButton";
import StepsContainer from "./components/StepsContainer";

export default function App() {
    return (
        <div>
            <StepsContainer>
                <StepButton active={false} step={ 1 } stepName="Your Personal Data"/>
                <StepButton active={true}  step={ 2 } stepName="Shit"/>
                <StepButton active={false} step={ 3 } stepName="Shit"/>
                <StepButton active={false} step={ 4 } stepName="Shit"/>
            </StepsContainer>
            <FormStepContainer>
                hdfghdfgh
            </FormStepContainer>
        </div>
    )
}