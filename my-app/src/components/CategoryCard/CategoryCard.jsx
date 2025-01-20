import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CategoryCard.module.css'

const CategoryCard = (props) => {
    console.log(props)
  return (
    <Link className={styles.main_link} to={`/${props.link}/${props.title}`}>
            <li className={styles.card_unit}>
                <h2 className={styles.card_title}>{props.title}</h2>
            </li>
    </Link>
  )
}

export default CategoryCard