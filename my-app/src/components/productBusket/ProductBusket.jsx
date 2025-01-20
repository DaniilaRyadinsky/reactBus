import React, { useEffect, useState } from 'react'
import styles from './ProductBusket.module'
import ProductCard from '../ProductCard/ProductCard'
import BtnReg from '../BtnReg/BtnReg'

const ProductBusket = (props) => {
    const [item, setItem] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5099/Bus/findId?id=${props.id}`)
            .then(res2 => (res2.json()).then((r) =>
                setItem(r)))
    }, [])

    async function Delete() {
        try {
            const response = await fetch(`http://localhost:5099/Bus/deleteorder?idbus=${props.id}&Login=${sessionStorage.getItem('username')}`);
      
            if (response.ok) {
            } else {
              console.error('Ошибка при удалении карточки:', response.statusText);
            }
          } catch (error) {
            console.error('Ошибка сети:', error);
          }
          window.location.reload( true ) ;
    }

    return (
        <div>
            <ProductCard {...item}></ProductCard>
            <BtnReg onClick={Delete} >Удалить</BtnReg>
        </div>
    )
}

export default ProductBusket