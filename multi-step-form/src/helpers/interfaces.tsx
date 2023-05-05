export interface Plan {
    type: string,
    price: number,
    frequency: string
}

export interface Addon {
    type: string
    info: string
    price: number,
}

export interface MultiStepFormState {
    name: string,
    email: string,
    phone: string,
    plan: Plan,
    addOns: Addon[]
}

export interface FormErrorsState {
    name?: string,
    email?: string,
    phone?: string,
    noPlan?: boolean,
    stepWithErrors?: number
}

export const DEFAULT_STATE = {
    name: "",
    email: "",
    phone: "",
    plan: {
        type: "",
        price: 10,
        frequency: "Monthly"
    },
    addOns: []
}