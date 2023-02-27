import style from './Card.module.css'

const Card = ( props ) => {
    return(
        <div className={style.Card} >
            <section className={style.imgCont} >
                <img src={`${props.image}`} alt={props.name} className={style.img} />
            </section>
            <section className={style.text} >
                <h2 className={style.Name} >{props.name}</h2>
                <span className={style.Genres} >{props.genre}</span>
            </section>
        </div>
    )
}

export default Card;