'use server';

import { RecipeParamsInterface, RecipeDataInterface } from "@/app/App.types";

export const getRecipies = async (params: RecipeParamsInterface) => { 

    const Health = params.health !== '' ? `&health=${params.health}` : '';
    const Diet = params.diet !== '' ? `&diet=${params.diet}` : '';
    const MealType = params.mealType !== '' ? `&mealType=${params.mealType}` : '';
    const DishType = params.dishType !== '' ? `&dishType=${params.dishType}` : '';

    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.RECIPE_CLIENT_ID}&app_key=${process.env.RECIPE_API_KEY}${Diet}${Health}${MealType}${DishType}%20course&random=true`); 
    const data:RecipeDataInterface = await response.json();
    console.log(data, 'the data')
    return data;
}; 