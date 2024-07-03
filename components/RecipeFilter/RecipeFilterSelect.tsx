'use client';

import { useEffect, useState } from "react";
import { getRecipies } from "@/api/recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import classes from "@/components/RecipeFilter/RecipeFilter.module.css";
import { RecipeDataInterface, FilterOptionInterface } from "@/app/App.types";
import { FilterOptions } from "@/api/filters";

const RecipeFilterSelect = () => {
    
    useEffect(() => {
        setLoader(false);
        console.log('runs')
    }, []);

    const [getData, setData] = useState<RecipeDataInterface>();

    const [getLoader, setLoader] = useState<Boolean>(true);

    const [getCheckedStatus, setCheckedStatus] = useState({
        MealType: new Array(FilterOptions.MealType.length).fill(false),
        Diet: new Array(FilterOptions.Diet.length).fill(false),
        Health: new Array(FilterOptions.Health.length).fill(false),
        CuisineType: new Array(FilterOptions.CuisineType.length).fill(false),
        DishType: new Array(FilterOptions.DishType.length).fill(false)
    });

    const [getSelectedFilters, setSelectedFilters] = useState({
        MealType: new Array(FilterOptions.MealType.length).fill(''),
        Diet: new Array(FilterOptions.Diet.length).fill(''),
        Health: new Array(FilterOptions.Health.length).fill(''),
        CuisineType: new Array(FilterOptions.CuisineType.length).fill(''),
        DishType: new Array(FilterOptions.DishType.length).fill('')
    });

    function handleCheckboxChange(position:number, value:any, type:any) {

        const updatedCheckedState = getCheckedStatus[type as keyof FilterOptionInterface].map((item, index) =>
            index === position ? !item : item
        );

        setCheckedStatus(
            (oldState => {
                return {...oldState, [type as keyof FilterOptionInterface]: updatedCheckedState}
            })
        );

        const updatedMealTypes = getSelectedFilters[type as keyof FilterOptionInterface].map((item, index) => {
            return (updatedCheckedState[index] == true) ? value.param : '';
        });

        setSelectedFilters((oldState => {
            return {...oldState, [type as keyof FilterOptionInterface]: updatedMealTypes}
        }));

    }

    const RecipeList = getData?.hits?.map((recipe, index) => {
        return (           
           <RecipeCard key={index} props={recipe}/>
        );
    });

    async function onSubmit () {
        console.log(getSelectedFilters, 'this ')
        setData(await getRecipies(getSelectedFilters))
    }

    return (
        <>
            <span>Meal Type:</span>
            <ul className={classes["filter-list"]}>
                {FilterOptions.MealType.map((filter, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={getCheckedStatus.MealType[index]}
                            onChange={(e) => handleCheckboxChange(index, filter, 'MealType')}
                        />
                        <span>{filter.label}</span>
                    </label>
                ))}
            </ul>
            <span>Diet:</span>
            <ul className={classes["filter-list"]}>
                {FilterOptions.Diet.map((filter, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={getCheckedStatus.Diet[index]}
                            onChange={(e) => handleCheckboxChange(index, filter, 'Diet')}
                        />
                        <span>{filter.label}</span>
                    </label>
                ))}
            </ul>
            <span>Health:</span>
            <ul className={classes["filter-list"]}>
                {FilterOptions.Health.map((filter, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={getCheckedStatus.Health[index]}
                            onChange={(e) => handleCheckboxChange(index, filter, 'Health')}
                        />
                        <span>{filter.label}</span>
                    </label>
                ))}
            </ul>
            <span>Cuisine Type:</span>
            <ul className={classes["filter-list"]}>
                {FilterOptions.CuisineType.map((filter, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={getCheckedStatus.CuisineType[index]}
                            onChange={(e) => handleCheckboxChange(index, filter, 'CuisineType')}
                        />
                        <span>{filter.label}</span>
                    </label>
                ))}
            </ul>
            <span>Dish Type:</span>
            <ul className={classes["filter-list"]}>
                {FilterOptions.DishType.map((filter, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={getCheckedStatus.DishType[index]}
                            onChange={(e) => handleCheckboxChange(index, filter, 'DishType')}
                        />
                        <span>{filter.label}</span>
                    </label>
                ))}
            </ul>
            <button onClick={onSubmit}>Apply Filters</button>
            <section className={classes["recipe-card-list"]} >
                {RecipeList}
            </section>
        </>
    );
}

export default RecipeFilterSelect;