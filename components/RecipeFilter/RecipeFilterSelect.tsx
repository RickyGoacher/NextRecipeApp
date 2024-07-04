'use client';

import { useEffect, useState } from "react";
import { getRecipies } from "@/api/recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import classes from "@/components/RecipeFilter/RecipeFilter.module.css";
import { RecipeDataInterface, FilterOptionInterface, FilterOptionParamInterface } from "@/app/App.types";
import { FilterOptions } from "@/api/filters";

const RecipeFilterSelect = () => {

    useEffect(() => {
        if(getLoader) {
            setTimeout(() => {
                initialRecipies();
            }, 3000)
        }
        setLoader(false);
        console.log('runs')
    }, [initialRecipies]);

    const [getData, setData] = useState<RecipeDataInterface>();

    const [getLoader, setLoader] = useState<Boolean>(true);

    const DefaultChecked = {
        MealType: new Array(FilterOptions.MealType.length).fill(false),
        Diet: new Array(FilterOptions.Diet.length).fill(false),
        Health: new Array(FilterOptions.Health.length).fill(false),
        CuisineType: new Array(FilterOptions.CuisineType.length).fill(false),
        DishType: new Array(FilterOptions.DishType.length).fill(false)
    }

    const [getCheckedStatus, setCheckedStatus] = useState(DefaultChecked);

    const [getSelectedFilters, setSelectedFilters] = useState<FilterOptionParamInterface>({
        MealType: new Array(FilterOptions.MealType.length).fill(''),
        Diet: new Array(FilterOptions.Diet.length).fill(''),
        Health: new Array(FilterOptions.Health.length).fill(''),
        CuisineType: new Array(FilterOptions.CuisineType.length).fill(''),
        DishType: new Array(FilterOptions.DishType.length).fill('')
    });

    const [getSelectedFiltersLabels, setSelectedFiltersLabels] = useState<FilterOptionParamInterface>({
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
            console.log(item, 'the item')
            return (updatedCheckedState[index] == true) ? FilterOptions[type as keyof FilterOptionInterface][index].param : '';
        });

        const updatedMealTypesLabels = getSelectedFilters[type as keyof FilterOptionInterface].map((item, index) => {
            console.log(item, 'the item')
            return (updatedCheckedState[index] == true) ? FilterOptions[type as keyof FilterOptionInterface][index].label : '';
        });

        console.log(updatedMealTypes, 'update meal')

        setSelectedFilters((oldState => {
            return {...oldState, [type as keyof FilterOptionInterface]: updatedMealTypes}
        }));

        setSelectedFiltersLabels((oldState => {
            return {...oldState, [type as keyof FilterOptionInterface]: updatedMealTypesLabels}
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

    async function onClear () {
        initialRecipies();
        setCheckedStatus(DefaultChecked);
    }

    async function initialRecipies() {
        setData(await getRecipies({
            MealType: ['&mealType=breakfast'],
            Diet: [''],
            Health: [''],
            CuisineType: [''],
            DishType: ['']
        }));
    }

    const SelectedFilterDisplay = Object.entries(getSelectedFilters).map(type => {
        return getSelectedFiltersLabels[type[0] as keyof FilterOptionInterface].map(item => {
            return item !== '' ? <span key={item}>{item}</span> : '';
        });
    }).flat();

    return (
        <>
            <div className={classes['sidebar']}>
                <div className={classes['selected-filters']}>
                    {SelectedFilterDisplay}
                </div>
                <div className={classes['filter-container']}>
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
                </div>
                <div className={classes['filter-container']}>
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
                </div>
                <div className={classes['filter-container']}>
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
                </div>
                <div className={classes['filter-container']}>
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
                </div>
                <div className={classes['filter-container']}>
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
                </div>
                <div className={classes["button-container"]}>
                <button onClick={onSubmit}>Apply Filters</button>
                <button onClick={onClear}>Clear Filters</button>
                </div>
            </div>
            <section className={classes["recipe-card-list"]} >
                {RecipeList}
            </section>
        </>
    );
}

export default RecipeFilterSelect;