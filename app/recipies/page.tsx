import classes from "@/app/recipies/Page.module.css";
import RecipeFilterSelect from "@/components/RecipeFilter/RecipeFilterSelect";
import React from "react";

const Page = () => {
    return (
        <main className={classes["main"]}>
            <h1> Recipe Page </h1>
            <section className={classes["content-wrapper"]}>
                <RecipeFilterSelect />
            </section>
        </main>
    );
}

export default Page;