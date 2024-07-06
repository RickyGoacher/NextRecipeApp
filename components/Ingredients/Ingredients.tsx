import Image from "next/image";

interface IngredientInterface {
    props: Array<
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
    >
}

const Ingredients = ({props}:IngredientInterface) => {

    const GenerateIngredients = props.map(item => {
        return (
            <div>
                <span>{item.text}</span>
                <span>{item.quantity}</span>
                <span>{item.measure}</span>
                <span>{item.food}</span>
                <span>{item.weight}</span>
                <span>{item.foodCategory}</span>
                <Image alt={item.food} width={100} height={100} src={item.image} />
            </div>
        )
    })

    return (
        <div>
            {GenerateIngredients}
        </div>
    )
}

export default Ingredients;