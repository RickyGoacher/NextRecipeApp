import Image from "next/image";
import classes from "@/components/RecipeCard/RecipeCard.module.css";
import { RecipeInterface } from "@/app/App.types";

interface PROPS {
    props: {
        recipe: RecipeInterface;
    }
}

const RecipeCard = ({props: {recipe: {label, image, totalTime, mealType, dishType}}}: PROPS) => {
    return (
        <div className={classes["recipe-card"]}>
            <Image alt={label} width={100} height={100} src={image} />
            <div className={classes["recipe-card-info"]}>
                <h3>{label}</h3>
                {totalTime > 0 && <span>{totalTime} Minutes</span>}
                <span>Meal Type: {mealType[0]}</span>
                <span>Dish Type: {dishType[0]}</span>
            </div>
        </div>
    );
}

export default RecipeCard;