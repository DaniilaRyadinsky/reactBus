import React from 'react'
import ProductCard from '../ProductCard/ProductCard';
import BtnReg from '../BtnReg/BtnReg'
import styles from './AdmP.module.css'
import { useNavigate } from "react-router-dom";



const AdmProductCard = (props) => {
    const navigate = useNavigate();

    async function Delete(link, id) {
        try {
            // Выполняем DELETE-запрос к серверу
            const response = await fetch(`${link+id}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
            } else {
              console.error('Ошибка при удалении карточки:', response.statusText);
            }
          } catch (error) {
            console.error('Ошибка сети:', error);
          }

    }

    const Edit = (e) => {
        e.preventDefault();
        navigate(`/admin/edit/${props.id}`)
    }

    function DeleteBtn() {
        Delete("http://localhost:5099/Bus/", props.id)
        window.location.reload( true ) ;
    }

    return (
        <div>
            <ProductCard {...props}></ProductCard>
            <div className={styles.button_container}>
                <BtnReg type="button" onClick={Edit}>Изменить</BtnReg>
                <BtnReg type="button" onClick={DeleteBtn}>Удалить</BtnReg>
            </div>

        </div>
    )
}

export default AdmProductCard