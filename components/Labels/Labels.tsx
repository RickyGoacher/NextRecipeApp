import classes from "@/components/Labels/Labels.module.css";

const Labels = ({props}) => {

    console.log(props, 'the prosp')

    const GenerateLabels = props.map((item:string) => {
        return (
            <span className={classes["label"]} key={item}>{item}</span>
        )
    })

    return (
        <section className={classes["label-container"]}>
            {GenerateLabels}
        </section>
    )

}

export default Labels