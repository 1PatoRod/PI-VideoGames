import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideoGameByName } from "../../redux/actions";
import style from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [ name , setName ] = useState({
        name:'',
    });

    const handleSearch = (event) => {
        event.preventDefault();
        const name = event.target.value;
        setName(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getVideoGameByName(name))
        setName('');
    };

    return (
        <div className={style.allCont} >
            <input 
                type='search'
                placeholder="Enter videogame name here..."
                onChange={e => handleSearch(e)}
                className={style.SearchBar}
            />
            <button type="submit" value={name} onClick={e => handleSubmit(e)} className={style.button} >Search</button>
        </div>
)
}

export default SearchBar;