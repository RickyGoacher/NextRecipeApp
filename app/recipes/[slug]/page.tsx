import { getRecipe } from "@/api/recipe";
import Image from "next/image";
import Link from "next/link";
import Labels from "@/components/Labels/Labels";
import IngredientLines from "@/components/IngredientLines/IngredientLines";
import InformationTable from "@/components/InformationTable/InformationTable";
import classes from "@/app/recipes/[slug]/Page.module.css";
import { TotalDailyInterface, TotalNutrientsInterface } from "@/app/App.types";

interface Params {
    params: {
        slug: string;
    }
}

const fetchRecipe = async (slug:string) => {
    const data = await getRecipe(slug);
    return data;
}

const Page = async ({params}:Params) => {
    const Slug = params.slug; 
    const data = await fetchRecipe(Slug);
    const GetTitle = data.recipe.label;
    const GetBannerImage = data.recipe.images.REGULAR.url;
    const GetHealthLabel = data.recipe.healthLabels;
    const GetDietLabels = data.recipe.dietLabels;
    const GetCautions = data.recipe.cautions;
    const GetIngredientLines = data.recipe.ingredientLines;
    const GetIngredients = data.recipe.ingredients;
    const GetCuisineType = data.recipe.cuisineType;
    const GetMealType = data.recipe.mealType;
    const GetDishType = data.recipe.dishType;
    const GetUrl = data.recipe.url;
    const GetCalories = data.recipe.calories;
    const GetYield = data.recipe.yield;
    const GetTotalTime = data.recipe.totalTime;
    const GetTotalNutrients:TotalNutrientsInterface = data.recipe.totalNutrients;
    const GetTotalDaily:TotalDailyInterface = data.recipe.totalDaily;
    let GetHours = Math.floor(GetTotalTime / 60);;
    let GetMinutes = GetTotalTime % 60;

    return (
        <main>
            <section className={classes["recipe-header-container"]}>
                <div className={classes["image-container"]}>
                    <Image 
                        alt={GetTitle} 
                        width={data.recipe.images.REGULAR.width}
                        height={data.recipe.images.REGULAR.height}
                        src={GetBannerImage}
                    />
                </div>
                <div className={classes["text-container"]}>
                    <h1>{GetTitle}</h1>
                    {GetDietLabels.length > 0 && <Labels props={GetDietLabels} />}
                    {GetCautions.length > 0 && <Labels props={GetCautions} />}
                </div>
            </section>
            <section className={classes["filter-container"]}>
                <h2>Original Recipe (Preparation click here): <Link className={classes["recipe-link"]} href={GetUrl}>{GetTitle}</Link></h2>
                <strong>Time: {GetHours > 0 && GetHours + 'h'} {GetMinutes > 0 && GetMinutes + 'm'}</strong>
                <strong>Servings: {GetYield}</strong>
                <strong>Calories / Serving: {Math.round(GetCalories / GetYield)}</strong>
                <div className={classes["options"]}>
                    {GetCuisineType.length > 0 && <Labels props={GetCuisineType}/>}
                    {GetMealType.length > 0 && <Labels props={GetMealType}/>}
                    {GetDishType.length > 0 && <Labels props={GetDishType}/>}
                </div>
            </section>
            <section className={classes["content-section"]}>
                <div className={classes["content"]}>
                    <h2>Ingredients</h2>
                    <IngredientLines props={GetIngredientLines} />
                </div>
                <div className={classes["content"]}>
                    <h2>Health Labels</h2>
                    <Labels props={GetHealthLabel} />
                </div>
            </section>
            <section className={classes["nutrient-content-section"]}>
                <div className={classes["nutrient-content"]}>
                    <h2>Total Nutrients</h2>
                    <InformationTable props={GetTotalNutrients}/>
                </div>
                <div className={classes["nutrient-content"]}>
                    <h2>Total Daily</h2>
                    <InformationTable props={GetTotalDaily}/>
                </div>
            </section>
        </main>
    );
}

export default Page;