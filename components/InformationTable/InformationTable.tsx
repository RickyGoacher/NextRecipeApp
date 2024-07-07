import classes from "@/components/InformationTable/InformationTable.module.css";
import { TotalDailyInterface, TotalNutrientsInterface } from "@/app/App.types";

interface PROPS {
    props: TotalNutrientsInterface | TotalDailyInterface;
}

const InformationTable = ({props}:PROPS) => {

    const TableEntries = Object.entries(props);
    const GenerateTable = TableEntries.map((item) => {
        return (
            <div key={item[1].label} className={classes["table-row"]}>
                <span>{item[1].label}</span>
                <span>{item[1].quantity} {item[1].unit}</span>
            </div>
        );
    });

    return (
        <div className={classes["table-container"]}>
            {GenerateTable}
        </div>
    );
}

export default InformationTable;

