import React, { useState } from 'react'
import searchLogo from '../../img/search.svg'
import styles from './Search.module.css'

import {
    Link,
  } from 'react-router-dom';

const Search = () => {

    const [search, setSearch] = useState('')


  function handleSearchChange(event) {
    setSearch(event.target.value)
  }

    return (
        <div className={styles.search_container}>
            <input required type="text" className={styles.search_place} placeholder='Поиск по товарам' value={search} onChange={handleSearchChange} />
            {/* <input required type="text" className={styles.search_place} placeholder={`${props.search !== '' ? props.search:'Поиск: '}`} value={search} onChange={handleSearchChange} /> */}
            <Link to={`/${search}`}><label className={styles.search_btn} >
                <img src={searchLogo} alt='search' />
            </label></Link>
        </div>
    )
}

export default Search