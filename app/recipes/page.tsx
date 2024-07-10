import classes from "@/app/recipes/Page.module.css";
import RecipeFilterSelect from "@/components/RecipeFilter/RecipeFilterSelect";
import React from "react";
import Image from "next/image";

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