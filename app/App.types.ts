export interface RecipeParamsInterface {
    diet: string;
    mealType: string;
    dishType: string;
    health: string;
}

export interface RecipeDataInterface {
    from: number;
    to: number;
    count: number;
    _links: {};
    hits: Array<
        {
            recipe: RecipeInterface;
            _links: {
                self: {
                    href: string;
                    title: string;
                }
            }
        }
    >
}

export interface RecipeInterface {
    uri: string;
    label: string;
    image: string;
    images: {
        THUMBNAIL: {
            url: string;
            width: number;
            height: number;
        };
        SMALL: {
            url: string;
            width: number;
            height: number;
        };
        REGULAR: {
            url: string;
            width: number;
            height: number;
        };
        LARGE: {
            url: string;
            width: number;
            height: number;
        };
    },
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: Array<
        {
            text: string;
            quantity: number;
            measure: string;
            food: string;
            weight: number;
            foodCategory: string;
            foodId: string;
            image: string;
        }
    >;
    calories: number;
    totalCO2Emissions: number;
    co2EmissionsClass: string;
    totalWeight: number;
    totalTime: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    totalNutrients: {
        ENERC_KCAL: {label: string; quantity: number; unit: number};
        FAT: {label: string; quantity: number; unit: number};
        FASAT: {label: string; quantity: number; unit: number};
        FATRN: {label: string; quantity: number; unit: number};
        FAMS: {label: string; quantity: number; unit: number};
        FAPU: {label: string; quantity: number; unit: number};
        CHOCDF: {label: string; quantity: number; unit: number};
        'CHOCDF.net': {label: string; quantity: number; unit: number};
        FIBTG: {label: string; quantity: number; unit: number};
        SUGAR: {label: string; quantity: number; unit: number};
        PROCNT: {label: string; quantity: number; unit: number};
        CHOLE: {label: string; quantity: number; unit: number};
        NA: {label: string; quantity: number; unit: number};
        CA: {label: string; quantity: number; unit: number};
        MG: {label: string; quantity: number; unit: number};
        K: {label: string; quantity: number; unit: number};
        FE: {label: string; quantity: number; unit: number};
        ZN: {label: string; quantity: number; unit: number};
        P: {label: string; quantity: number; unit: number};
        VITA_RAE: {label: string; quantity: number; unit: number};
        VITC: {label: string; quantity: number; unit: number};
        THIA: {label: string; quantity: number; unit: number};
        RIBF: {label: string; quantity: number; unit: number};
        NIA: {label: string; quantity: number; unit: number};
        VITB6A: {label: string; quantity: number; unit: number};
        FOLDFE: {label: string; quantity: number; unit: number};
        FOLFD: {label: string; quantity: number; unit: number};
        FOLAC: {label: string; quantity: number; unit: number};
        VITB12: {label: string; quantity: number; unit: number};
        VITD: {label: string; quantity: number; unit: number};
        TOCPHA: {label: string; quantity: number; unit: number};
        VITK1: {label: string; quantity: number; unit: number};
        WATER: {label: string; quantity: number; unit: number};
    };
    totalDaily: {
        ENERC_KCAL: {label: string; quantity: number; unit: number};
        FAT: {label: string; quantity: number; unit: number};
        FASAT: {label: string; quantity: number; unit: number};
        CHOCDF: {label: string; quantity: number; unit: number};
        FIBTG: {label: string; quantity: number; unit: number};
        PROCNT: {label: string; quantity: number; unit: number};
        CHOLE: {label: string; quantity: number; unit: number};
        NA: {label: string; quantity: number; unit: number};
        CA: {label: string; quantity: number; unit: number};
        MG: {label: string; quantity: number; unit: number};
        K: {label: string; quantity: number; unit: number};
        FE: {label: string; quantity: number; unit: number};
        ZN: {label: string; quantity: number; unit: number};
        P: {label: string; quantity: number; unit: number};
        VITA_RAE: {label: string; quantity: number; unit: number};
        VITC: {label: string; quantity: number; unit: number};
        THIA: {label: string; quantity: number; unit: number};
        RIBF: {label: string; quantity: number; unit: number};
        NIA: {label: string; quantity: number; unit: number};
        VITB6A: {label: string; quantity: number; unit: number};
        FOLDFE: {label: string; quantity: number; unit: number};
        VITB12: {label: string; quantity: number; unit: number};
        VITD: {label: string; quantity: number; unit: number};
        TOCPHA: {label: string; quantity: number; unit: number};
        VITK1: {label: string; quantity: number; unit: number};
    };
    digest: Array<
        {
            label: string;
            tag: string;
            schemaOrgTag: string;
            total: number;
            hasRDI: boolean;
            daily: number;
            unit: string;
        }
    >    
}