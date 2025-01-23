import React from 'react'
import Header from '../Header/Header'
import styles from './Container.module.css'
import SideBar from '../SideBar/SideBar'

const Container = (props) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content_container}>
                <div className={styles.content}>
                    {props.children}
                </div>

                {(props.isActiveSideBar === true) && <SideBar/>}
            </div>
            <footer className={styles.footer}>
                <p className={styles.footer_p}>© 2023 Автобусная компания "Столичная". © Все права защищены.</p>
            </footer>
            {/* <Registration/> */}
        </div>
    )
}

export default Container