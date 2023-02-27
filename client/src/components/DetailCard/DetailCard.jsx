import style from './DetailCard.module.css';

const DetailCard = ( props ) => {
    return(
        <section className={style.Cont} >
            <section className={style
            .texts}>
                <h2 className={style.name} >{props.name}</h2>
                <h2 className={style.id} >Id: {props.id}</h2>
                <h3 className={style.genre} >Genre: {props.genre}.</h3>
                <p className={style.platforms} >Platforms: {props.platforms}.</p>
                <p className={style.relaseDate} >Release Date: {props.relaseDate}</p>
                <p className={style.rating} >Rating: {props.rating}</p>
                <p className={style.description} >{props.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </section>
            <img src={`${props.image}`} alt={`${props.name}`} className={style.img} />
        </section>
    )
}

export default DetailCard;