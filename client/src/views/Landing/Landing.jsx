import React from "react";
import { Link } from "react-router-dom";
import Fondo from '../../utils/Fondo.mp4';
import style from './Landing.module.css';

const Landing = () => {
    return (
        <section className={style.Container}>
            <section className={style.Video}>
                <video src={Fondo} autoPlay loop muted ></video>
            </section>
            <section className={style.Content}>
                <h1 className={style.tittle} >VideoGames</h1>
                <h3 className={style.subTittle} >By Rodriguez Patricio</h3>
                <Link to='/home'>
                    <button className={style.btn}>Home</button>
                </Link>
            </section>
        </section>
    )
}

export default Landing;