import { MouseEventHandler } from "react";
import { Plan, Addon } from "../helpers/interfaces";
import "./PricingTable.css";

interface PricingTableProps {
    plan: Plan
    addons: Addon[]
    onClick: MouseEventHandler<HTMLButtonElement>
}

function PricingTable({ plan, addons, onClick }: PricingTableProps ) {

    const realPlanPrice = ( plan.frequency === "Monthly" ) ? plan.price : plan.price * 10;
    const frequency = ( plan.frequency === "Monthly" ) ? "month" : "year";
    let total;

    if( addons.length !== 0 )
        total = plan.price + addons.map( addon => addon.price ).reduce( ( prev, curr ) => curr + prev );
    else
        total = plan.price;

    return <div className="pricing-table">
        <div className="table">
            <div className="plan-info">
                <div>
                    <h4>{ plan.type + " (" + plan.frequency + ")" }</h4>
                    <button onClick={ onClick }>Change</button>
                </div>
                <p className="plan-pricing">{ "$" + realPlanPrice + ( (plan.frequency === "Monthly") ? "/mo" : "/ye" ) }</p>
            </div>
            <div className="divider"></div>
            { addons.map( ( addon: Addon, index ) => 
            <div key={index} className="addon-container">
                <span className="addon-type">{ addon.type }</span>
                <p className="addon-pricing">{ "+$" + ( (plan.frequency === "Monthly") ? addon.price + "/mo" : addon.price * 10 + "/ye" ) }</p>
            </div>)
            }
        </div>
        <div className="total-container">
            <span>{ `Total (per ${frequency})` }</span>
            <span className="total-price">{ "+$" + ( (plan.frequency === "Monthly") ? total + "/mo" :  total * 10 + "/ye" ) }</span>
        </div>
    </div>
}

export default PricingTable;