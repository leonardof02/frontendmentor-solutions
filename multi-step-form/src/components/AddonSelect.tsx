import "./AddonSelect.css"

interface AddonSelectProps {
    id: string
    type: string,
    info: string,
    price: number,
    selected: boolean,
    frequency: string
    onChange: ( type: string, info: string, price: number ) => void
}

function AddonSelect({ id, type, info, price, selected, frequency, onChange }: AddonSelectProps) {

    function handleChange() {
        onChange( type, info, price );
    }

    const realPrice = ( frequency === "Monthly" ) ? price : price * 10;

    return <div className={ "addon-select" + (selected ? " selected" : "" ) } onClick={ handleChange } >
        <input type="checkbox" id={ id } checked={ selected } onChange={ handleChange }/>
        <div className="addon-info">
            <label className="type">{ type }</label>
            <label className="info">{ info }</label>
        </div>
        <p className="pricing">{ "+$" + realPrice + ( (frequency === "Monthly") ? "/mo" : "/ye" ) }</p>
    </div>
}

export default AddonSelect;