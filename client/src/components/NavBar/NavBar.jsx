import Astronauta3 from '../../utils/Astronauta3.png'
import SearchBar from '../SearchBar/SearchBar'
import { Link, useLocation } from "react-router-dom";import style from './NavBar.module.css';


const NavBar = () => {
    const location = useLocation()
    return (
        <section className={style.Container}>
            <Link to='/home' >
                <img src={Astronauta3} className={style.img} />
            </Link>
            <input type='checkbox' id={style.check}/>
            <label className={style.menu}>
                <div className={style.stick1}></div>
                <div className={style.stick2}></div>
                <div className={style.stick3}></div>
            </label>
            <ul className={style.LinkCont}>
            <li>
                    {location.pathname !== '/home' && <Link to='/home' className={style.Link} >Home</Link>}
                </li>
                <li>
                    {location.pathname !== '/create' && <Link to='/create' className={style.Link} >Create</Link>}
                </li>
            </ul>
            <h2 className={style.remplace} >.</h2>
            <h1 className={style.tittle} >VideoGames</h1>
            <SearchBar/>
        </section>
    );
};

export default NavBar;