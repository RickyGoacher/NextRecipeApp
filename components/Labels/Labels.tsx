import classes from "@/components/Labels/Labels.module.css";

interface PROPS {
    props: Array<string>
}

const Labels = ({props}:PROPS) => {

    const GenerateLabels = props.map((item:string) => {
        return (
            <span className={classes["label"]} key={item}>{item}</span>
        );
    });

    return (
        <section className={classes["label-container"]}>
            {GenerateLabels}
        </section>
    );

}

export default Labels;