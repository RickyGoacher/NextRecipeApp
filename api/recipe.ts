'use server';

import { RecipeParamsInterface, RecipeDataInterface } from "@/app/App.types";

export const getRecipies = async (params: RecipeParamsInterface) => { 
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.RECIPE_CLIENT_ID}&app_key=${process.env.RECIPE_API_KEY}&diet=${params.diet}&mealType=${params.mealType}&dishType=${params.dishType}%20course&random=true`); 
    const data:RecipeDataInterface = await response.json();
    return data;
}; 