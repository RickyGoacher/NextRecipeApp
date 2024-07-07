import classes from "@/components/InformationTable/InformationTable.module.css";

const InformationTable = ({props}) => {
    const TableEntries = Object.entries(props);
    console.log(TableEntries, 'keys');

    

    const GenerateTable = TableEntries.map((item) => {
        return (
            <div key={item[1].label} className={classes["table-row"]}>
                <span>{item[1].label}</span>
                <span>{item[1].quantity} {item[1].unit}</span>
            </div>
        )
    })

    return (
        <div className={classes["table-container"]}>
            {GenerateTable}
        </div>
    )
}

export default InformationTable;

