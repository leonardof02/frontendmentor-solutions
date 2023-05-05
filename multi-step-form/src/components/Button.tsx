import { MouseEventHandler } from "react";
import "./Button.css";

interface ButtonProps {
    text: string,
    type: "next-button" | "back-button" | "confirm-button"
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({ text, type, onClick }: ButtonProps) {
    return <>
        <button className={ "button " + type } onClick={ onClick }>{ text }</button>
    </>
}

export default Button