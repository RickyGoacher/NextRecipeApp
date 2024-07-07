'use client';

import { searchRecipe } from "@/api/recipe";
import { useState, useEffect } from "react";
import Link from "next/link";
import classes from "@/components/RecipeSearch/RecipeSearch.module.css";
import { RecipeDataInterface } from "@/app/App.types";

const RecipeSearch = () => {

    const [getSearchTerm, setSearchTerm] = useState('');
    const [getSearchResults, setSearchResults] = useState<RecipeDataInterface>();
    const [getIsActive, setIsActive] = useState(false);

    useEffect(() => {

        const delayDebounceFn = setTimeout(async ()=> {
            if(getSearchTerm !== '') {
                const data:RecipeDataInterface = await searchRecipe(getSearchTerm)
                setIsActive(true);
                setSearchResults(data)
            }
          }, 3000);

          return () => clearTimeout(delayDebounceFn);

    }, [getSearchTerm, setSearchResults]);

    function closeSearch() {
        setTimeout(() => {
            setIsActive(false);
        }, 1000)
    }

    function openSearch() {
        if(getSearchTerm !== '') {
            setIsActive(true);
        }
    }

    const GenerateSearchResults = getSearchResults?.hits.map((item) => {
        const recipeId = item.recipe.uri.split('#')[1]
        return (
            <div key={item.recipe.label + Math.random()} className={classes["result"]}>
                <span><Link href={`/recipies/${recipeId}`}>{item.recipe.label}</Link></span>
            </div>
        );
    });

    return (
        <div className={classes["search-container"]}>
            <input type="text" onChange={(e) => {setSearchTerm(e.target.value)}} onBlur={closeSearch} onFocus={openSearch} placeholder="Search a Recipe..."/>
            <div className={getIsActive ? classes["search-results-container"] + " " + classes["active"] : classes["search-results-container"] }>
                {GenerateSearchResults}
            </div>
        </div>
    );
}

export default RecipeSearch;