'use server';

import { FilterOptionParamInterface, RecipeDataInterface, RecipeInterface } from "@/app/App.types";

interface RecipeData {
    recipe: RecipeInterface
}

export const getRecipies = async (params:FilterOptionParamInterface) => { 

    console.log(params)

    const Diet = params.Diet.join('');
    const MealType = params.MealType.join('');
    const Health = params.Health.join('');
    const CuisineType = params.CuisineType.join('');
    const DishType = params.DishType.join('');

    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.RECIPE_CLIENT_ID}&app_key=${process.env.RECIPE_API_KEY}${Diet}${MealType}${Health}${CuisineType}${DishType}&random=true`); 
    const data:RecipeDataInterface = await response.json();
    //console.log(data.hits[0].recipe, 'the data')
    return data;
};

export const getRecipe = async (param:string) => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2/${param}?type=public&app_id=${process.env.RECIPE_CLIENT_ID}&app_key=${process.env.RECIPE_API_KEY}`);
    const data:RecipeData = await response.json();
    //console.log(data)
    return data;
}