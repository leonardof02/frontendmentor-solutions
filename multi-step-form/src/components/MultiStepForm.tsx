import { ChangeEvent, useState } from "react"
import Input from "./Input"
import FormContainer from "./FormContainer"
import FormTitle from "./FormTitle"
import StepButton from "./StepButton"
import StepsContainer from "./StepsContainer"
import Button from "./Button"

import "./MultiStepForm.css";
import Switch from "./Switch"
import PlanCard from "./PlanCard"
import AddonSelect from "./AddonSelect"

// import interfaces
import { Addon, MultiStepFormState, FormErrorsState, DEFAULT_STATE } from "../helpers/interfaces"
import PricingTable from "./ServiceTable"
import ThankYou from "./ThankYou"

const steps = [ "Your info", "Select Plan", "Add-ons", "Summary" ];
const plans = [
    {
        type: "Arcade",
        price: 9,
        imgUrl: "../src/assets/images/icon-arcade.svg"
    },
    {
        type: "Advanced",
        price: 12,
        imgUrl: "../src/assets/images/icon-advanced.svg"
    },
    {
        type: "Pro",
        price: 15,
        imgUrl: "../src/assets/images/icon-pro.svg"
    }
]

const addons = [
    { 
        type: "Online service",
        info: "Access to multiplayer games",
        price: 1,
    },
    { 
        type: "Larger storage",
        info: "Extra 1TB of cloud save",
        price: 2,
    },
    {
        type: "Customizable Profile",
        info: "Custom theme on your profile",
        price: 2,
    }
]

// Regex
const phoneRegex = /^\+?\d{1,3}?\d{3,14}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

function MultiStepForm() {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [ data, setData ] = useState<MultiStepFormState>(DEFAULT_STATE);
    const [errors, setErrors] = useState<FormErrorsState>({});

    
    function handleInputChange( e: ChangeEvent<HTMLInputElement>) {
        setData({...data, [e.target.name]: e.target.value });
    }

    function handleSwitch() {
        const newFrequency: "Monthly" | "Yearly" = (data.plan.frequency === "Monthly") ? "Yearly" : "Monthly";
        const newPlan = { ...data.plan, frequency: newFrequency };
        setData({...data, plan: newPlan });
    }

    function handlePlanChange( type: string, price: number ) {
        const newPlan = { ...data.plan, type, price };
        setData({ ...data, plan: newPlan });
    }

    function handleCheck( type: string, info: string, price: number ) {
        let newAddons = [];
        if( data.addOns.some( a => a.type === type ) ) {
            newAddons = data.addOns.filter( a => a.type !== type );
            setData({ ...data, addOns: newAddons });
            return;
        }
        const newAddon: Addon = { type, info, price };
        newAddons = [...data.addOns, newAddon ];
        setData({ ...data, addOns: newAddons });
    }

    function validateInputs(): FormErrorsState {

        const errors: FormErrorsState = {}

        // Validate Name
        if( data.name.trim().length === 0 ) {
            errors.name = "Name is required";
            errors.stepWithErrors = 1;
        }
        else if( ! nameRegex.test( data.name.trim() ) ) {
            errors.name = "Invalid Name";
            errors.stepWithErrors = 1;
        }

        // Validate Email
        if( data.email.trim().length === 0 ) {
            errors.email = "Email is required";
            errors.stepWithErrors = 1;
        }
        else if( ! emailRegex.test( data.email.trim() ) ) {
            errors.email = "Invalid email";
            errors.stepWithErrors = 1;
        }

        // Validate Phone
        if( data.phone.trim().length === 0 ) {
            errors.phone = "Phone is required";
            errors.stepWithErrors = 1;
        }
        else if( ! phoneRegex.test( data.phone.trim() ) ) {
            errors.phone = "Invalid phone";
            errors.stepWithErrors = 1;
        }

        return errors;
    }

    function validatePlan(): FormErrorsState {
        const errors: FormErrorsState = {};
        if( data.plan.type.length === 0 ) {
            errors.noPlan = true;
            errors.stepWithErrors = 2;
        }
        return errors;
    }

    function changeStep( step: number ) {

        if( currentStep === 5 )
            return;

        let errors;
        if( currentStep === 1 ) {
            errors = validateInputs();
            if( errors )
                setErrors( errors );
        }
        else if( currentStep === 2 ) {
            errors = validatePlan();
            if( errors )
                setErrors( errors )
        }

        if( ! errors || Object.keys(errors as Object).length === 0 )
            setCurrentStep( step );
    }

    return <div className="main-container">
        <div className="multi-step-form-container">
            <StepsContainer>
                { steps.map((step, index) =>
                    <StepButton
                        key={ index + 1 }
                        active={(index + 1) === (currentStep)}
                        stepName={step}
                        step={index + 1}
                        handleClick={() => { changeStep( index + 1 ) }}
                    />)
                }
            </StepsContainer>
            <FormContainer>
                { currentStep === 1 && // Step #1
                    <>
                        <FormTitle title="Personal Info" subtitle="Please provide your name, email address, and phone number." />
                        <Input name="name" fieldName="Name"
                            type="text" placeholder="e.g. Stephen King"
                            handleChange={ handleInputChange }
                            value={ data.name } error={ errors.name }
                        />
                        <Input name="email" fieldName="Email Address"
                            type="email" placeholder="e.g. stephenking@lorem.com"
                            handleChange={ handleInputChange }
                            value={ data.email } error={ errors.email }
                            />
                        <Input name="phone" fieldName="Phone Number"
                            type="tel" placeholder="e.g. +1 234 567 890"
                            handleChange={ handleInputChange }
                            value={ data.phone } error={ errors.phone }
                            />
                    </> }
                { currentStep === 2 && // Step #2
                    <>
                        <FormTitle title="Select Your Plan" subtitle="You have the option of monthly or yearly billing." />
                        { plans.map( (plan, index) =>
                            <PlanCard
                                onClick={ handlePlanChange }
                                type={ (plan.type as "Arcade" | "Advanced" | "Pro") }
                                imgUrl={ plan.imgUrl }
                                price={ plan.price }
                                selected={ plan.type === data.plan.type }
                                key={index}
                                frequency={ data.plan.frequency }
                                /> 
                        )}
                        <Switch left="Monthly" right="Yearly"
                            onRight={ (data.plan.frequency === "Yearly") }
                            onClick={ handleSwitch }
                        />
                    </> }
                { currentStep === 3 &&
                <>    
                    <FormTitle title="Pick add-ons" subtitle="Add-ons help enhance your gaming experience." />
                    { addons.map( ( addon, index ) => 
                        <AddonSelect id={ "addon" + index } type={ addon.type }
                            info={ addon.info } price={ addon.price }
                            selected={ data.addOns.some( a => a.type === addon.type) }
                            frequency={ data.plan.frequency }
                            onChange={ handleCheck }
                            key={index}
                        />
                    )

                    }
                </> 
                }
                { currentStep === 4 &&
                <>    
                    <FormTitle title="Finishing up" subtitle="Double-check everything looks OK before confirming." />
                    <PricingTable plan={ data.plan } addons={ data.addOns }
                        onClick={ () => { setCurrentStep( 2 ) } }
                    />
                </> 
                }
                { currentStep === 5 &&
                    <ThankYou />
                }
                <div>
                { currentStep <= 4 && <div className="navigation-button-container">
                    { currentStep < 4 ?
                        <>
                            <Button text="Next Step" type="next-button" onClick={ () => { changeStep( currentStep + 1 ) } } />
                            {
                            ( currentStep > 1 ) &&
                                <Button text="Go Back" type="back-button"
                                    onClick={ () => { changeStep( currentStep - 1 ) } }
                                />
                            }
                        </>
                        :
                        <>
                            <Button text="Confirm" type="confirm-button" onClick={ () => { changeStep( 5 ) }}/>
                            <Button text="Go Back" type="back-button" onClick={() => { changeStep( currentStep - 1 ) } } />
                        </>
                    }
                </div> }
                </div>
            </FormContainer>
        </div>
    </div>
}

export default MultiStepForm