import { ChangeEventHandler, FocusEventHandler } from "react";
import "./Input.css";

interface InputProps {
    name: string,
    fieldName: string,
    type: "tel" | "email" | "text",
    value: string,
    placeholder?: string,
    handleChange?: ChangeEventHandler<HTMLInputElement>,
    validate?: FocusEventHandler<HTMLInputElement>,
    error?: string,
}

function Input({ name, fieldName, placeholder, type, handleChange, value, error, validate }: InputProps) {
    return <div className="input">
        <div className="info-input">
            <label htmlFor={ name }>{ fieldName }</label>
            { error && <span className="error">{ `(!) ${error}` }</span> }
        </div>
        <input type={ type } id={ name } placeholder={ placeholder }
            onChange={ handleChange } value={value} name={ name }
            className={ (error) ? "error" : "" } onBlur={ validate }/>
    </div>
}

export default Input;