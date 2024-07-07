import RecipeSearch from "../RecipeSearch/RecipeSearch";
import classes from "@/components/Header/Header.module.css";
import Link from "next/link";

const Header = () => {
    return (
        <header className={classes["header"]}>
            <Link href="/">FoodFinder</Link>
            <RecipeSearch/>
            <Link href="/recipies">Recipies</Link>
        </header>
    );
}

export default Header;