import classes from '@/components/Loader/Loader.module.css';

const Loader = ({isActive}:{isActive: Boolean}) => {
    console.log(isActive)
    return (
         isActive && 
         <div className={classes['loader-container']}>
            <div className={classes['overlay']}></div> 
            <span className={classes['loader']}></span> 
        </div>
    );
}

export default Loader;