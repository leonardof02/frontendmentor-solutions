import "./PlanCard.css"

interface PlanCardProps {
    imgUrl: string,
    type: string
    price: number,
    selected: boolean,
    frequency: string
    onClick: ( type: string, price: number ) => void
}

function PlanCard({ imgUrl, type, price, selected, frequency, onClick }: PlanCardProps) {

    function handleClick() {
        onClick( type, price );
    }

    const realPrice = ( frequency === "Monthly" ) ? price : price * 10;

    return <div className={ "plan-card" + (selected ? " selected" : "" ) } onClick={ handleClick }>
        <img src={imgUrl} alt="Plan Icon" />
        <div className="card-info">
            <h4 className="type">{ type }</h4>
            <p className="pricing">{ "$" + realPrice + ( (frequency === "Monthly") ? "/mo" : "/ye" ) }</p>
        </div>
    </div>
}

export default PlanCard;