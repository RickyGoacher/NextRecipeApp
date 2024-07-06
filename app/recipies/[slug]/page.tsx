import { getRecipe } from "@/api/recipe";
import Image from "next/image";
import Labels from "@/components/Labels/Labels";
import IngredientLines from "@/components/IngredientLines/IngredientLines";
import Ingredients from "@/components/Ingredients/Ingredients";
import classes from "@/app/recipies/[slug]/Page.module.css";

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
    console.log(params, 'slug')
    const Slug = params.slug; 

    const data = await fetchRecipe(Slug);

    console.log(data, 'the dataaaaaaaaaaaaaaaaaaaa')

    const GetTitle = data.recipe.label;
    const GetBannerImage = data.recipe.images.REGULAR.url;
    const GetHealthLabel = data.recipe.healthLabels;
    const GetDietLabels = data.recipe.dietLabels;
    const GetCautions = data.recipe.cautions;
    const GetIngredientLines = data.recipe.ingredientLines;
    const GetIngredients = data.recipe.ingredients;
    console.log(data.recipe.ingredients)


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
                    <Labels props={GetDietLabels} />
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
            <h2>Cautions</h2>
            <Labels props={GetCautions} />
            
            <Ingredients props={GetIngredients} />
        </main>
    )
}

export default Page;