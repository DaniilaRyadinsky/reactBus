import React from 'react'
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'

const ProductCard = (props) => {
    return (
        <Link className={styles.main_link} to={`/tovar/${props.id}`}>
            <li className={styles.card_unit}>
                <img src={props.image} alt="Плотва" className={styles.card_img} />
                <div className={styles.card_unit_description_container}>
                    <h3 className={styles.card_name}>{props.title}</h3>
                    <p>Категория {props.category}</p>
                    <p>Цена {props.price}</p>
                </div>
            </li>
        </Link>
    )
}

export default ProductCard