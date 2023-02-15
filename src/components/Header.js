import React from 'react'
import {useForm} from "react-hook-form"
import { useDispatch , useSelector } from 'react-redux';
import { filterActions } from '../store/filter-slice';

const Header = ({changeSearch , changeAvailable}) => {

    const {register} = useForm();
    const disaptch = useDispatch();

    // const search = useSelector(state => state.filter.search);
    const available = useSelector(state => state.filter.available);

    // console.log(watch('search'))
  return (
    <header>
        <h1>Management Articles</h1>
        <div>
            <input {...register('search')} onChange={e => changeSearch(e.target.value)} type='search' placeholder='Search...'/>
            {/* <button>Search</button> */}
        </div>
        <span>View Articles Available</span>
        <input type="checkbox" checked={available} onChange={e => changeAvailable(e.target.checked)}/>
    </header>
  )
}

// Header.pr 

export default Header