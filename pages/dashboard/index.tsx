import Head from 'next/head'
import styles from '../../styles/Dashboard.module.css'
import { useState, useEffect } from 'react';
import DashboardProfile from '../../components/DashboardProfile';
import MyDashboard from '../../components/MyDashboard';
import RenewValidate from '../../components/RenewValidate';
import BotList from '../../components/BotList';
import BotConfig from '../../components/BotConfig';
import Api from '../../services/api'
import Router from 'next/router'
import firebase from 'firebase/app'

import {
    Home,
    Cached,
    FormatListBulleted,
    Settings,
    Telegram,
    TrackChanges,
    Favorite
} from '@material-ui/icons';

var userId = null

export default function Dashboard() {
    const [activeOption, setActiveOption] = useState(1)
    const [userConfig, setUserConfig] = useState({})
    const [userList, setUserList] = useState({})
    const [userData, setUserData] = useState({ vip: false, validity: 0 })
    const [userIQ, setUserIQ] = useState({ first_name: '', avatar: '' })
    const [isLoaded, setIsLoaded] = useState(false)

    function handleSelectOption(option) {
        setActiveOption(option)
    }

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if(user){
            userId = user.uid
        }else{
            Router.push('/login')
        }
        const getUserData = async () => {
            if (userId !== null) {
                let results = await Api.getUser(userId)
                if (results !== null) {
                    setUserConfig(results.config)
                    setUserList(results.list)
                    setUserData(results.userBot)
                    setUserIQ(results.userIQ)
                    setIsLoaded(true)
                }
            }
        }
        getUserData()
    }, [])


    return (
        <div className={styles.appWindow}>
            <Head>
                <title>Dashboard - Bot Free</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
            </Head>
            <div className={styles.sidebar}>
                <div className={styles.header}>
                    <img src="./logo.png" alt="Logo" />
                    <h3>Bot Free</h3>
                </div>
                <div className={styles.options}>
                    <h4>Bem-vindo, {userIQ.first_name}!</h4>
                    <a
                        className={activeOption == 1 ? styles.active : ''}
                        onClick={() => handleSelectOption(1)}
                    >
                        <Home />
                    Painel de controle
                </a>
                    <a
                        className={activeOption == 2 ? styles.active : ''}
                        onClick={() => handleSelectOption(2)}
                    >
                        <Cached />
                    Recarga gratuita
                </a>
                    <a
                        className={activeOption == 3 ? styles.active : ''}
                        onClick={() => handleSelectOption(3)}
                    >
                        <FormatListBulleted />
                    Lista de sinais
                </a>
                    <a
                        className={activeOption == 4 ? styles.active : ''}
                        onClick={() => handleSelectOption(4)}
                    >
                        <Settings />
                    Configurações
                </a>
                    <a href="#" className={activeOption == 5 ? styles.active : ''}>
                        <TrackChanges />
                    Conversor de sinais
                </a>
                    <a href="#" className={activeOption == 5 ? styles.active : ''}>
                        <Favorite />
                    Salas de sinais
                </a>
                    <a href="https://t.me/iqtoptraders" className={activeOption == 5 ? styles.active : ''}>
                        <Telegram />
                    Grupo Telegram
                </a>
                    <p>v0.0.2</p>
                </div>

            </div>
            <div className={styles.content}>
                {isLoaded && (
                    <>
                        <DashboardProfile
                            userAvatar={userIQ.avatar}
                        />
                        {activeOption === 1 && <MyDashboard
                            userData={userData.validity}
                        />}
                        {activeOption === 2 && <RenewValidate
                            userId={userId}
                            userData={userData.validity}
                            vip={userData.vip}
                            setUserData={setUserData}
                        />}
                        {activeOption === 3 && <BotList
                            userId={userId}
                            userList={userList}
                            setUserList={setUserList}
                        />}
                        {activeOption === 4 && <BotConfig
                            userId={userId}
                            userConfig={userConfig}
                            userData={userData.vip}
                            setUserConfig={setUserConfig}
                        />}
                    </>
                )}
            </div>
        </div>
    )
}