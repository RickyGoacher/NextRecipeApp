import RecipeSearch from "../RecipeSearch/RecipeSearch";
import classes from "@/components/Header/Header.module.css";

const Header = () => {
    return (
        <header className={classes["header"]}>
            <RecipeSearch/>
        </header>
    );
}

export default Header;