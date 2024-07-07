import classes from "@/components/IngredientLines/IngredientLines.module.css";

const IngredientLines = ({props}) => {

    const Ingredients = props.map(item => {
        return (
            <li key={item + Math.random()}><span>{item}</span></li>
        )
    })

    return (
        <ul className={classes["ingredient-list"]}>
            {Ingredients}
        </ul>
    )

}

export default IngredientLines;