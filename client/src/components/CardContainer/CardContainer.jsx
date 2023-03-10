import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Paged from '../paged/Paged'
import FilterBar from "../FilterBar/FilterBar";
import style from './CardContainer.module.css';

const CardContainer = () => {

    const videoGames = useSelector(state => state.filterVideoGames);

    const [ currentPage, setCurrrentPage ] = useState(1);
    const [ cardPege, setCardPege ] = useState(15);
    const [order, setOrder ] = useState('');
    const indexOfTheLastVideoGame = currentPage * cardPege;
    const indexOfFirstVideoGame = indexOfTheLastVideoGame - cardPege;
    const currentCard = videoGames.slice(indexOfFirstVideoGame, indexOfTheLastVideoGame);
    
    const paged = (pageNumber) => {
        setCurrrentPage(pageNumber);
    }

    useEffect(() => {
        setCurrrentPage(1);
    }, [videoGames]);

    let hasResults = true;
    if (videoGames.length === 0) {
        hasResults = false;
    }

    return (
        <section className={style.allCont}>
                    <Paged cardPege={cardPege} videoGames={videoGames.length} paged={paged} classname={style.Paged} setCurrrentPage={setCurrrentPage} currentPage={currentPage} />
            <section className={style.Container} >
                    <div className={style.FilterContainer} >
                    <FilterBar setCurrrentPage={setCurrrentPage} setOrder={setOrder} className={style.FilterBar}/>
                </div>
                <section className={style.CardContainer}>
                    {currentCard?.map( game => {
                        return (
                            <section >
                            <Link to={`/detail/${game.id}`}>
                            <Card 
                                key={game.id}
                                id={game.id}
                                name={game.name} 
                                genre={game.genres.map(genre => genre.name).join(', ')}
                                image={game.image}
                            />
                            </Link>
                            </section>
                        )
                    })}
                    {!hasResults && <section className={style.found}>
                        <div className={style.loader}></div>
                        <p >No games found in the main tray, try searching by name in the search bar...</p>
                    </section>}
                </section>
            </section>
        </section>
    )
};

export default CardContainer;