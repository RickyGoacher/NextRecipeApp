import Image from "next/image";
import classes from "@/components/RecipeCard/RecipeCard.module.css";
import { RecipeInterface } from "@/app/App.types";
import Link from "next/link";

interface PROPS {
    props: {
        recipe: RecipeInterface;
    }
}

const RecipeCard = ({props: {recipe: {label, image, totalTime, mealType, dishType, cautions, uri}}}: PROPS) => {
    const recipeId = uri.split('#')[1]
    return (
        <div className={classes["recipe-card"]}>
            <Link href={`recipes/${recipeId}`}>
            <Image alt={label} width={150} height={150} src={image} />
            <div className={classes["recipe-card-info"]}>
                <h3>{label}</h3>
                {totalTime > 0 && <span>{totalTime} Minutes</span>}
                <span>Meal Type: {mealType && mealType[0]}</span>
                <span>Dish Type: {dishType && dishType[0]}</span>
                <div className={classes['health-labels']}>
                {cautions.map(label => <span key={label}>{label}</span>)}
                </div>
            </div>
            </Link>
        </div>
    );
}

export default RecipeCard;