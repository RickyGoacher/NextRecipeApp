const IngredientLines = ({props}) => {

    const Ingredients = props.map(item => {
        return (
            <p key={item}>{item}</p>
        )
    })

    return (
        <div>
            {Ingredients}
        </div>
    )

}

export default IngredientLines