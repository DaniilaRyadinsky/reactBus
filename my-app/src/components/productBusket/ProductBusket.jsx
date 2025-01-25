import React, { useEffect, useState } from 'react'
import styles from './ProductBusket.module.css'
import { Link } from 'react-router-dom'
import BtnReg from '../BtnReg/BtnReg'
import InBusket from '../inBusket/inBusket'

const ProductBusket = (props) => {

    const [price, setPrice] = useState(Number(props.quantity) * parseInt(props.price))

    // var newValue=0;

    // const handleChange = (e) => {
    //     newValue = Number(e.target.value)

    // }

    // const handleBlur = () => {
    //     if (newValue < 0) newValue = 0
    //     if (newValue > 50) newValue = 50
    //     if (newValue > counter) {
    //         setCounter(newValue)
    //         Add()
    //     }
    //     else {
    //         setCounter(newValue)
    //         Delete()

    //     }
    //     props.reload(-parseInt(props.price) * (counter - newValue))
    //     setPrice(parseInt(props.price) * newValue)
    //     if (newValue === 0)
    //         window.location.reload(true);
    // } 

    function refresh(e) {
        setPrice(price + e)
        props.reload(e)
    }


    return (
        <>
            <li className={styles.card_unit}>
                <Link className={styles.main_link} to={`/tovar/${props.id}`}>
                    <img src={props.image} alt="Плотва" className={styles.card_img} />
                    <div className={styles.card_unit_description_container}>
                        <h3 className={styles.card_name}>{props.title}</h3>
                        <p>Категория {props.category}</p>
                        <p>Цена {price}</p>
                    </div>
                </Link>
                <div className={styles.in_busket_container}>
                    <InBusket {...props} reload={refresh} />
                </div>
            </li>
        </>
    )
}

export default ProductBusket