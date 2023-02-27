import React from 'react';
import style from './Paged.module.css';

const Paged = ({ cardPege, videoGames, paged }) => {
    let pageNumbers = [];

    for( let i = 1; i <= Math.ceil(videoGames/cardPege); i++){
        pageNumbers.push(i);
    };
    
    return(
        <nav>
            <ul className={style.ul} >
                {
                    pageNumbers?.map(num => (<li key={num} className={style.li} >
                            <a onClick={() => paged(num)}>{num}</a>
                            </li>))
                }
            </ul>
        </nav>
    );
};

export default Paged;