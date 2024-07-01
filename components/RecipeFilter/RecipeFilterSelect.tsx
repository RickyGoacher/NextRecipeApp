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
        dishType: 'Main'
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
        setRecipeParams(
            (oldState => {
                return {...oldState, ...value}
            })
        );
    }

    const RecipeList = getData?.hits.map((recipe, index) => {
        return (           
           <RecipeCard key={index} props={recipe}/>
        );
    });

    return (
        <>
            <ul className={classes["filter-list"]}>
                <li onClick={() => onFilterChange({'diet': 'balanced'})}>Balanced</li>
                <li onClick={() => onFilterChange({'diet': 'high-fiber'})}>High Fiber</li>
                <li onClick={() => onFilterChange({'mealType': 'breakfast'})}>Breakfast</li>
                <li onClick={() => onFilterChange({'mealType': 'Dinner'})}>Dinner</li>
                <li onClick={() => onFilterChange({'mealType': 'Snack'})}>Snack</li>
            </ul>
            <section className={classes["recipe-card-list"]} >
            {RecipeList}
             </section>
        </>
    );
}

export default RecipeFilterSelect;