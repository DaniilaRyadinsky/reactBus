import React from 'react'
import styles from './SideBar.module.css'

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_item}>
                <img className={styles.sidebar_img} src="https://i.pinimg.com/736x/6a/24/57/6a2457297fbb60c1003dfc9009888c7d.jpg" alt="Картинка автобуса 1" />
                <span>Картинка автобуса 1</span>
            </div>
            <div className={styles.sidebar_item}>
                <img className={styles.sidebar_img} src="https://sun9-22.userapi.com/impg/BWGYSVnv6QQLrijNYeO5W_CtGjUzLBeERlIqqQ/2-VJAEz5ib8.jpg?size=604x432&quality=96&sign=642638cffcf7369863f101d8b228dbd5&type=album" alt="Картинка автобуса 2" />
                <span>Картинка автобуса 2</span>
            </div>
        </div>
    )
}

export default SideBar