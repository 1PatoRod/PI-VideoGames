import React from 'react';
import style from './Paged.module.css';

const Paged = ({ cardPege, videoGames, paged, setCurrrentPage, currentPage }) => {
    let pageNumbers = [];

    for( let i = 1; i <= Math.ceil(videoGames/cardPege); i++){
        pageNumbers.push(i);
    };

    let prev = currentPage - 1;
    let next = currentPage + 1;

    const handlePage = (event) => {
        const value = event.target.value
        value === '<' ? 
        setCurrrentPage( prev ):
        setCurrrentPage( next )
    }
    return(
        <nav>
            <ul className={style.ul} >
                { prev !== 0 && <button onClick={(e) => handlePage(e)} value='<' className={style.button} >{'<Prev'}</button>}
                {
                    pageNumbers?.map(num => {
                        return num === currentPage 
                        ? <li key={num} className={style.liSelect} >
                            <a onClick={() => paged(num)}>{num}</a>
                            </li>
                        : <li key={num} className={style.li} >
                            <a onClick={() => paged(num)}>{num}</a>
                            </li>  
                    })
                }
                {next !== pageNumbers.length + 1 && <button onClick={(e) => handlePage(e)} value='>' className={style.button} >{'Next>'}</button>}
            </ul>
        </nav>
    );
};

export default Paged;