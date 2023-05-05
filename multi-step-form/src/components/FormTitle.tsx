import "./FormTitle.css";

interface FormTitleProps {
    title: String
    subtitle: String
}

function FormTitle({ title, subtitle }: FormTitleProps) {
    return <div className="form-title">
        <h2>{ title }</h2>
        <h3>{ subtitle }</h3>
    </div>
}

export default FormTitle;