import CardContainer from "../../components/CardContainer/CardContainer";
// import FilterBar from "../../components/FilterBar/FilterBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllVideoGames, clearVideoGames } from "../../redux/actions";
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllVideoGames());

        return () => {
            dispatch(clearVideoGames());
        }
    }, [dispatch])

    const handleButton = () => {
        dispatch(clearVideoGames());
        dispatch(getAllVideoGames());
    };

    return (
        <section className={style.Container} >
            <img src="https://www.xtrafondos.com/wallpapers/astronauta-entre-humo-de-colores-6222.jpg" className={style.found} />
            <section className={style.tray} >
                <button onClick={handleButton} className={style.button} >Reloading</button>
                {/* <section>
                    <FilterBar />
                </section> */}
                <section >
                    <CardContainer  className={style.CardContainer}/>
                </section>
            </section>            
        </section>

    )
}

export default Home;