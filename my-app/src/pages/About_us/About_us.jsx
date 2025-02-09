import React from 'react'
import Container from '../../components/Container/Container'
import styles from './About_us.module.css'

const About_us = () => {
    return (
        <Container isActiveSideBar={true}>
            <h2>История фирмы</h2>
            <p className={styles.indent}><i>История нашей компании начинается с небольшого автопарка, который постепенно развивался и расширялся. Сегодня мы владеем современным транспортом и предлагаем лучшие условия для наших клиентов.
                На протяжении многих лет мы завоевали доверие пассажиров, внедрив инновации и новые технологии в нашу работу. Мы гордимся тем, что способны предложить комфортные и безопасные поездки.</i></p>
            <h2>Сотрудники</h2>
            <p className={styles.indent}><i>Наша команда состоит из опытных водителей и высококвалифицированных специалистов, которые постоянно работают над улучшением качества сервиса и соблюдением технических стандартов.
                Мы регулярно проводим тренинги и обучение для наших сотрудников, чтобы гарантировать, что они соответствуют самым высоким стандартам обслуживания. Наша цель — сделать каждую поездку незабываемой для наших клиентов.</i></p>
            <ul>
                <li>Иванов Иван Иванович</li>
                <li>Петров Петр Петрович</li>
                <li>Сидорова Мария Николаевна</li>
                <li>Кузнецов Алексей Сергеевич</li>
                <li>Морозов Игорь Владимирович</li>
                <li>Пахомова Анастасия Сергеевна</li>
            </ul>
            <h3>Таблица служебных автобусов компании Столичная</h3>
            <table border="1">
                <tr>
                    <th>Марка</th>
                    <th>Модель</th>
                    <th>Тип</th>
                    <th>Год выпуска</th>
                </tr>
                <tr>
                    <td>Stolica</td>
                    <td>230</td>
                    <td>Магистральный</td>
                    <td>2022</td>
                </tr>
                <tr>
                    <td>Stolica</td>
                    <td>240</td>
                    <td>Микроавтобус</td>
                    <td>2021</td>
                </tr>
                <tr>
                    <td>Stolica</td>
                    <td>250</td>
                    <td>Городской</td>
                    <td>2023</td>
                </tr>
                <tr>
                    <td>Stolica</td>
                    <td>260</td>
                    <td>Школьный</td>
                    <td>2020</td>
                </tr>
            </table>

            <h4>Создать списки</h4>

            <h5>Нумерованный список:</h5>
            <ol>
                <li>Stolica 230 - Магистральный</li>
                <li>Stolica 240 - Микроавтобус</li>
                <li>Stolica 250 - Городской</li>
                <li>Stolica 260 - Школьный</li>
            </ol>

            <h5>Нумерованный список:</h5>
            <ol>
                <li>Магистральный автобус: Stolica 230</li>
                <li>Микроавтобус: Stolica 240</li>
                <li>Городской автобус: Stolica 250</li>
                <li>Школьный автобус: Stolica 260</li>
            </ol>

            <h5>Многоуровневый список:</h5>
            <ol>
                <li>Автобусы компании "Столичная"
                    <ol>
                        <li>Магистральные
                            <ol>
                                <li>Stolica 230</li>
                            </ol>
                        </li>
                        <li>Микроавтобусы
                            <ol>
                                <li>Stolica 240</li>
                            </ol>
                        </li>
                        <li>Городские
                            <ol>
                                <li>Stolica 250</li>
                            </ol>
                        </li>
                        <li>Школьные
                            <ol>
                                <li>Stolica 260</li>
                            </ol>
                        </li>
                    </ol>
                </li>
            </ol>

        </Container >
    )
}

export default About_us