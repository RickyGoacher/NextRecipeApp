'use client';

import { useEffect, useState } from "react";
import { getRecipies } from "@/api/recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import classes from "@/components/RecipeFilter/RecipeFilter.module.css";
import { RecipeDataInterface, RecipeParamsInterface, RecipeInterface } from "@/app/App.types";

const RecipeFilterSelect = () => {

    const [getRecipeParams, setRecipeParams] = useState<RecipeParamsInterface>({
        diet: 'balanced',
        mealType: 'Dinner',
        dishType: 'Main',
        health: ''
    });

    const getRecipiesCall = async () => {
        setData( await getRecipies(getRecipeParams));
    }

    useEffect(() => {
        if(getLoader) {
            getRecipiesCall();
        }
        setLoader(false);
        console.log('runs')
    }, [getRecipeParams, getRecipiesCall]);

    const [getData, setData] = useState<RecipeDataInterface>();

    const [getLoader, setLoader] = useState<Boolean>(true);

    function onFilterChange(value: {[KEY: string]: String}) {
        console.log(getRecipeParams, 'test')
        setRecipeParams(
            (oldState => {
                return {...oldState, ...value}
            })
        );
        setLoader(true)
    }

    const RecipeList = getData?.hits?.map((recipe, index) => {
        return (           
           <RecipeCard key={index} props={recipe}/>
        );
    });

    return (
        <>
            <span>Meal Type:</span>
            <ul className={classes["filter-list"]}>
                <li onClick={() => onFilterChange({'mealType': 'breakfast'})}>Breakfast</li>
                <li onClick={() => onFilterChange({'mealType': 'Dinner'})}>Dinner</li>
                <li onClick={() => onFilterChange({'mealType': 'Lunch'})}>Lunch</li>
                <li onClick={() => onFilterChange({'mealType': 'Snack'})}>Snack</li>
                <li onClick={() => onFilterChange({'mealType': 'Teatime'})}>TeaTime</li>
            </ul>
            <span>Diet</span>
            <ul className={classes["filter-list"]}>
                <li onClick={() => onFilterChange({'diet': 'balanced'})}>Balanced</li>
                <li onClick={() => onFilterChange({'diet': 'high-fiber'})}>High Fiber</li>
                <li onClick={() => onFilterChange({'diet': 'high-protein'})}>High Protein</li>
                <li onClick={() => onFilterChange({'diet': 'low-carb'})}>Low Carb</li>
                <li onClick={() => onFilterChange({'diet': 'low-fat'})}>Low Fat</li>
                <li onClick={() => onFilterChange({'diet': 'low-sodium'})}>Low Sodium</li>
            </ul>
            <span>Health</span>
            <ul className={classes["filter-list"]}>
                <li onClick={() => onFilterChange({'health': 'alchohol-cocktail'})}>Alchohol Cocktail</li>
                <li onClick={() => onFilterChange({'health': 'alchohol-free'})}>Alchohol Free</li>
                <li onClick={() => onFilterChange({'health': 'celery-free'})}>Celery Free</li>
            </ul>
            <section className={classes["recipe-card-list"]} >
                {RecipeList}
            </section>
        </>
    );
}

export default RecipeFilterSelect;