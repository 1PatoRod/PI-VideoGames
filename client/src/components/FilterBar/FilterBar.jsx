import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, clearGenres, filters } from "../../redux/actions";
import style from './FilterBar.module.css';

const FilterBar = ({setCurrrentPage, setOrder}) => {

    const dispatch = useDispatch();
    const [fil, setFil] = useState({
        genreId: '',
        origin: '', 
        direcDir: '',
        direcAlph: '',
        direcRating: '',
    })
    useEffect(() => {
        dispatch(getAllGenres())
        return () => {
            dispatch(clearGenres())
        }
    },[dispatch])

    const genres = useSelector(state => state.genres);

    const allFiltersHandler = (event) => {
        setFil(prevFilters => ({ ...prevFilters, [event.target.name]: event.target.value }));
        dispatch(filters({ ...fil, [event.target.name]: event.target.value }));
        setCurrrentPage(1);
        setOrder(`Completed ${event.target.value}`);
    }
    


    return(
        <section className={style.sticky} >
            <input type='checkbox' id={style.check}/>
            <label className={style.menu}>
                <div className={style.stick1}></div>
                <div className={style.stick2}></div>
                <div className={style.stick3}></div>
            </label>
            <section className={style.AllBar} >
                <section className={style.tray} >

                    <select name='genreId' onChange={e => allFiltersHandler(e)} className={style.select} >
                        <option value="Genre All" className={style.option}>Genre All</option>
                        {
                            genres?.map( genre => {
                                return (<option key={genre.id} value={genre.id} className={style.option} >{genre.name}</option>)
                            })
                        }
                    </select>
                    <select name="origin" onChange={e => allFiltersHandler(e)} className={style.select}>
                        <option value="Origin All" className={style.option} >Origin All</option>
                        <option value="DB" className={style.option} >My videogames</option>
                        <option value="API" className={style.option} >Api videogames</option>
                    </select>

                    <select name="direcDir" onChange={e => allFiltersHandler(e)} className={style.select}>
                        <option value="Sort" className={style.option} >Directional order</option>
                        <option value="des" className={style.option} >Endant</option>
                        <option value="asc" className={style.option} >Ascending</option>
                    </select>
                    <select name="direcAlph" onChange={e => allFiltersHandler(e)} className={style.select}>
                        <option value='Sort' className={style.option}>Alphabetical order</option>
                        <option value='A_Z' className={style.option}>A-Z</option>
                        <option value='Z_A' className={style.option}>Z-A</option>
                    </select>
                    <select name="direcRating" onChange={e => allFiltersHandler(e)} className={style.select}>
                        <option value='Sort' className={style.option} >Rating order</option>
                        <option value='low_to_high' className={style.option} >lowest to highest</option>
                        <option value='high_to_low' className={style.option} >highest to lowest</option>
                    </select>
                </section>
                    <section className={style.iconCont} >
                        <a href="https://www.instagram.com/_pato_r/?hl=es" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png" alt="Instagram" className={style.icon}/>
                        </a>
                        <a href="https://twitter.com/PatoRod002" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/1409/1409937.png" alt="Twiter" className={style.icon}/>
                        </a>
                        <a href="https://www.linkedin.com/in/pato-e-rodriguez/" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/3938/3938061.png" alt="Linkedin" className={style.icon}/>
                        </a>
                        <a href="https://github.com/1PatoRod" target="_blank" rel="noopener">
                            <img src="https://cdn-icons-png.flaticon.com/512/25/25657.png" alt="GitHub" className={style.icon}/>
                        </a>
                    </section>
                <h3 className={style.text} >by: Patricio Rodriguez</h3>
            </section>
        </section>
        
    )
};

export default FilterBar;