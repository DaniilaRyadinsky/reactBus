import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './CatalogModule.module.css'

const CatalogModule = (props) => {
    
    return (
        <div className={styles.content}>
            {props.loading && <p>loading...</p>}
            {!props.loading &&
                <ul className={styles.product_list}>
                    {props.items.map(item => <ProductCard key={item.id.toString()} {...item} />)}
                </ul>
            }
        </div>
    )
}

export default CatalogModule