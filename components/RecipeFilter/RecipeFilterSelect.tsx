'use client';

import { useEffect, useState } from "react";
import { getRecipies } from "@/api/recipe";
import RecipeCard from "../RecipeCard/RecipeCard";
import classes from "@/components/RecipeFilter/RecipeFilter.module.css";
import { RecipeDataInterface, FilterOptionInterface, FilterOptionParamInterface } from "@/app/App.types";
import { FilterOptions } from "@/api/filters";
import Loader from "../Loader/Loader";

const RecipeFilterSelect = () => {

    useEffect(() => {
        if(getFirstLoad) {
            setTimeout(() => {
                initialRecipies();
                setFirstLoad(false);
            }, 2000)
        }
        if(getLoader) {
            setTimeout(() => {
                setLoader(false);
            }, 3000)
        }
    }, [initialRecipies]);

    const [getFirstLoad, setFirstLoad] = useState<Boolean>(true)

    const [getData, setData] = useState<RecipeDataInterface>();

    const [getLoader, setLoader] = useState<Boolean>(true);

    const [getModalOpen, setModalOpen] = useState<Boolean>(false);

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
            return (updatedCheckedState[index] == true) ? FilterOptions[type as keyof FilterOptionInterface][index].param : '';
        });

        const updatedMealTypesLabels = getSelectedFilters[type as keyof FilterOptionInterface].map((item, index) => {
            return (updatedCheckedState[index] == true) ? FilterOptions[type as keyof FilterOptionInterface][index].label : '';
        });

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
        setData(await getRecipies(getSelectedFilters));
        setLoader(true);
        setModalOpen(false);
    }

    async function onClear () {
        initialRecipies();
        setCheckedStatus(DefaultChecked);
        setLoader(true);
        setModalOpen(false);
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
        return getSelectedFiltersLabels[type[0] as keyof FilterOptionInterface].map((item, index )=> {
            return item !== '' && <span key={item}>{item} <span onClick={(e) => handleCheckboxChange(index, item, type[0])}>X</span></span>;
        });
    }).flat();

    const RenderFilters = Object.entries(FilterOptions).map(item => {
        return (
            <div className={classes['filter-container']} key={item[0]}>
                <span>{item[0]}:</span>
                <ul className={classes["filter-list"]}>
                    {FilterOptions[item[0] as keyof FilterOptionInterface].map((filter, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                checked={getCheckedStatus[item[0] as keyof FilterOptionInterface][index]}
                                onChange={(e) => handleCheckboxChange(index, filter, item[0])}
                            />
                            <span>{filter.label}</span>
                        </label>
                    ))}
                </ul>
            </div>
        );
    });

    return (
        <>
            <div className={classes["filter-section-mobile"]}>
                <button onClick={() => {setModalOpen(true)}}>Filters</button>
            </div>
            <aside className={getModalOpen ? classes['sidebar'] + " " + classes["active"] : classes['sidebar']}>
                <div className={classes["mobile-close"]}>
                    <span onClick={() => {setModalOpen(false)}}> X </span>
                </div>
                {SelectedFilterDisplay.length > 0 &&
                <div className={classes['selected-filters-container']}>
                    <strong>Filters:</strong>
                    <div className={classes['selected-filters']}>
                        {SelectedFilterDisplay}
                    </div>
                </div>
                }
                {RenderFilters}
                <div className={classes["button-container"]}>
                    <button onClick={onSubmit}>Apply Filters</button>
                    <button onClick={onClear}>Clear Filters</button>
                </div>
            </aside>
            <section className={classes["recipe-card-list"]} onClick={() => {setModalOpen(false)}}>
                <Loader isActive={getLoader}/>
                { RecipeList?.length ? RecipeList : <h3>No Recipies Found.</h3>}
            </section>
        </>
    );
}

export default RecipeFilterSelect;