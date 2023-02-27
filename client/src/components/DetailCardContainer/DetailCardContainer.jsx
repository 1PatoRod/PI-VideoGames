import DetailCard from "../DetailCard/DetailCard";
import { useSelector } from "react-redux";
import style from './DetailCardContainer.module.css'

const DetailCardContainer = () => {

    const videoGameDetail = useSelector(state => state.videoGameDetail);
    
    return (
        <section className={style.Cont} >
            <img src="https://www.xtrafondos.com/wallpapers/resoluciones/20/astronauta-en-ciudad-neon_1920x1080_5271.jpg" className={style.Found} />
                {
                    videoGameDetail?.map(game => {
                        return (
                            <section  className={style.Cont} >
                                <DetailCard 
                                key={game.id}
                                id={game.id}
                                image={game.image}
                                name={game.name}
                                genre={game.genres?.map(genre => genre.name).join(', ')}
                                platforms={game.platforms?.map(platform => platform).join(', ')}
                                description={game.description}
                                relaseDate={game.relaseDate}
                                rating={game.rating}
                                />
                            </section>
                        )
                    })
                }
        </section>
    )
};

export default DetailCardContainer;