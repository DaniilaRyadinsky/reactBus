import React, { useEffect, useState } from 'react'
import styles from './CatalogModule.module.css'
import ProductBusket from '../productBusket/ProductBusket'
import BtnReg from '../BtnReg/BtnReg'

const CatalogModuleBusk = (props) => {
    const [varSum, setVarsum] = useState(0)
    var sum = 0
    props.items.forEach(element => {
        sum += parseInt(element.price) * Number(element.quantity)
    });

    useEffect(() => {
        setVarsum(sum)
    }, [sum])

    return (
        <div className={styles.content}>

            {props.items.length === 0 && <p>Корзина Пуста</p>}
            {props.loading && <p>loading...</p>}
            {!props.loading &&
                <ul className={styles.product_list_busk}>
                    {props.items.map(item => <ProductBusket {...item} reload={(e) => setVarsum(e + varSum)} />)}
                </ul>
            }
            <div className={styles.bottombar}>
                <div className={styles.order_container}>
                    <BtnReg>Заказать</BtnReg>
                </div>
                <div className={styles.sum_container}>
                    <h3 className={styles.sum_h3}>Сумма</h3>
                    <div className={styles.sum_div}>{varSum} руб</div>
                </div>
            </div>


        </div>
    )
}

export default CatalogModuleBusk