import classes from "@/app/recipies/Page.module.css";
import RecipeFilterSelect from "@/components/RecipeFilter/RecipeFilterSelect";
import React from "react";

const Page = () => {
    return (
        <main className={classes["main"]}>
            <section className={classes['title-container']}>
                <h1> Find a Recipe </h1>
            </section>
            <section className={classes["content-wrapper"]}>
                <RecipeFilterSelect />
            </section>
        </main>
    );
}

export default Page;