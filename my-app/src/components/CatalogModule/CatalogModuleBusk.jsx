import React from 'react'
import styles from './CatalogModule.module.css'
import ProductBusket from '../productBusket/ProductBusket'

const CatalogModuleBusk = (props) => {
    
    return (
        <div className={styles.content}>
            {props.items.length === 0 && <p>Корзина Пуста</p>}
            {props.loading && <p>loading...</p>}
            {!props.loading &&
                <ul className={styles.product_list}>
                    {props.items.map(item => <ProductBusket key={item.id.toString()} {...item} />)}
                </ul>
            }
        </div>
    )
}

export default CatalogModuleBusk