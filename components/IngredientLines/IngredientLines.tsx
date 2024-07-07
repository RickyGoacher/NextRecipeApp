import classes from "@/components/IngredientLines/IngredientLines.module.css";

interface PROPS {
    props: Array<string>
}

const IngredientLines = ({props}:PROPS) => {

    const Ingredients = props.map(item => {
        return (
            <li key={item + Math.random()}><span>{item}</span></li>
        );
    });

    return (
        <ul className={classes["ingredient-list"]}>
            {Ingredients}
        </ul>
    );
}

export default IngredientLines;