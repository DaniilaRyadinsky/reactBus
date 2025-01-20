import React, { useEffect, useState } from 'react'
import styles from './CatalogModule.module.css'
import AdmProductCard from '../AdmProductCard/AdmProductCard'

const CatalogModule = (props) => {
    
    return (
        <div className={styles.content}>
            {props.loading && <p>loading...</p>}
            {!props.loading &&
                <ul className={styles.product_list}>
                    {props.items.map(item => <AdmProductCard key={item.id.toString()} {...item} />)}
                </ul>
            }
        </div>
    )
}

export default CatalogModule