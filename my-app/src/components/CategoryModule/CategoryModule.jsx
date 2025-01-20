import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import styles from './CategoryModule.module.css'

const CategoryModule = (props) => {

   
    return (
    <>
        {props.loading && <p>loading...</p>}
        {
            !props.loading &&
            <ul className={styles.product_list}>
                {props.items.map(item => <CategoryCard title={item} link={props.link}/>)}
            </ul>}
    </>
    )
}

export default CategoryModule