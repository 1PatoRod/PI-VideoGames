import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, clearGenres, createVideoGame } from "../../redux/actions";
import style from './Form.module.css'



const Form = () => {

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getAllGenres())
            return () => {
                dispatch(clearGenres())
            }
        },[dispatch])
        
        const genresGlobal = useSelector(state => state.genres);
        const history = useHistory();
        const [ form, setForm ] = useState({
            name:'',
            description:'',
            platforms:[],
            image:'',
            relaseDate:'',
            rating:'',
            genres:[],
        })

        const [errors, setErrors] = useState({
            name:'Complete the name section',
            description:'Complete the description section',
            platforms:'Complete the platforms section',
            image:'',
            relaseDate:'Complete the relaseDate section',
            rating:'Complete the rating section',
            genres:'Complete the genres section',
        })
        
        const changeHandler = (event) => {
            const eventProperty = event.target.name;
            const eventValue = event.target.value;
            
            validate({ ...form, [eventProperty] : eventValue })
            setForm({ ...form, [eventProperty] : eventValue })
        };


        const changeGenreHandler = (event) => {
            const eventProperty = event.target.name;
            const eventValue = event.target.value;
            form.genres?.includes(eventValue)? alert('The genre has already been selected') 
            :validate({ ...form, [eventProperty] : [...form.genres, eventValue] })
            setForm(prevForm => ({
                ...prevForm,
                genres: [...prevForm.genres, eventValue]
            }));
        };

        const changeDeleteGenreHandler = (event) => {
            // const eventProperty = event.target.name;
            const eventValue = event.target.value;
            const deleteGenre = form.genres?.filter(genre => genre !== eventValue.toString())

            validate({ ...form, genres : deleteGenre})
            setForm({ ...form, genres : deleteGenre});
        };

        const submitHandler = (event) => {
            event.preventDefault();
            console.log({form: form});
            dispatch(createVideoGame(form));
            alert(`The vieogame: ${form.name}, has been successfully created`);
            history.push('/home');
        }

        let currentDate = new Date();
        
        const validate = (form) => {


            setErrors(prevErrors => ({
                ...prevErrors,
                name: !form.name.length ? 'Complete the name section' : form.name.length <= 1 ? 'The name must be greater than 1 letters' : '',
                description: !form.description.length ? 'Complete the description section' : form.description.length < 20 ? 'The description must be greater than 20 letters' : '',
                platforms: !form.platforms.length ? 'Complete the platforms section' : '',
                relaseDate: !form.relaseDate.length ? 'Complete the Release Date section' :form.relaseDate > currentDate ? 'The date cannot be higher than the current one' : '',
                rating: !form.rating.length ? 'Complete the Punctuation section' : form.rating > 5 ? 'The Punctuation cannot exceed 5' : form.rating === 'error' ? 'Complete the Punctuation section' : '',
                genres: !form.genres.length ? 'Complete the genres section' : form.genres.length >= 6 ? 'A game cannot have more than 5 genres': form.genres === [] ? 'Complete the genres section' : '',
            }));
        };

        console.log(form.genres);
    return (
        <form onSubmit={e=>submitHandler(e)} className={style.form} >
            <img src='https://images4.alphacoders.com/107/1074462.jpg' alt='Found image' className={style.found}/>
            <section className={style.container} >
                    <section className={style.section} >
                        <div>
                            <h2 className={style.tittle}>Create your VideoGame:</h2>
                            <h3 className={style.subTittle}>Please complete the requested data</h3>
                            <input type='text' value={form.name}  onChange={e => changeHandler(e)} name='name' placeholder='Name...' className={style.input} />
                        </div>
                        {errors.name && <span className={style.warning} >{errors.name}</span>}
                    </section>
                    <section className={style.section} >
                        <div>
                            <textarea value={form.description}  onChange={e => changeHandler(e)} name='description' placeholder='Descibe to the VideoGame...' className={style.input} />
                        </div>
                        {errors.description && <span className={style.warning} >{errors.description}</span>}
                    </section>
                    <section className={style.section} >
                        <div>
                            <input type='text' value={form.platforms}  onChange={e => changeHandler(e)} name='platforms' placeholder='VideoGame platforms...' className={style.input} />
                        </div>
                        {errors.platforms && <span className={style.warning} >{errors.platforms}</span>}
                    </section>
                    <section className={style.section} >
                        <div>
                            <input type='date' value={form.relaseDate}  onChange={e => changeHandler(e)} name='relaseDate' placeholder='Release date of te VideoGame...' className={style.select} />
                        </div>
                        {errors.relaseDate && <span className={style.warning} >{errors.relaseDate}</span>}
                    </section>
                    <section className={style.section} >
                        <div>
                            <select value={form.rating} onChange={e => changeHandler(e)} name='rating' className={style.select} >
                                <option value='error'>Punctuation</option>
                                <option value='0' className={style.select} >0</option>
                                <option value='1' className={style.select} >1</option>
                                <option value='2' className={style.select} >2</option>
                                <option value='3' className={style.select} >3</option>
                                <option value='4' className={style.select} >4</option>
                                <option value='5' className={style.select} >5</option>
                            </select>
                        </div>
                        {errors.rating && <span className={style.warning} >{errors.rating}</span>}
                    </section>
                    <section className={style.section} >
                        <div>
                            <select value={form.genres} onChange={e => changeGenreHandler(e)} name='genres' className={style.select} >
                            <option value="error">Select a genre</option>
                                {
                                    genresGlobal?.map(genre => {
                                        return (<option value={genre.id} key={genre.id} className={style.select} >{genre.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                        {errors.genres && <span className={style.warning} >{errors.genres}</span>}
                        <section value={form.genres} onClick={e => changeDeleteGenreHandler(e)} >
                            {
                                genresGlobal?.map(genre => {
                                    if (form.genres?.includes(genre.id.toString())){
                                        return (<button type="button" key={genre.id} value={genre.id} className={style.button} >{genre.name}</button>)
                                    }
                                })
                            }
                        </section>
                    </section>
                    <section>
                        <input type='url' value={form.image}  onChange={e => changeHandler(e)} name='image' placeholder='Enter image url...' className={style.input} />
                        {errors.image && <span className={style.warning} >{errors.image}</span>}
                    </section>
                    {!errors.name && !errors.description && !errors.platforms && !errors.image && !errors.relaseDate &&!errors.rating && !errors.genres && <button type='submit' className={style.createButton} >Create</button>}
            </section>
        </form>
        )
}

export default Form;