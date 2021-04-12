import { useEffect, useState } from 'react'
import styles from '../styles/RenewValidate.module.css'
import { LevelUpModal } from './Modal'
import Api from '../services/api'

let countdownTimeout: NodeJS.Timeout

export default function RenewValidate ({ userId, userData, vip, setUserData }){
    let timeDefault = 30
    const dayDefaultToRenew = 1
    const [daysVip, setDaysVip] = useState(0)
    const [time, setTime] = useState(timeDefault)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const seconds = time % 60

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountDown() {
        if (!hasFinished && daysVip < 1) {
            setIsActive(true)
        }
    }

    async function handleRenew() {
        const d = new Date()
        d.setDate(d.getDate() + dayDefaultToRenew)
        const data = {
            userId,
            validity: d,
            vip,
        }
        setUserData({
            validity: {seconds: d.getTime() / 1000}
        })
        await Api.setRenew(data)
        timeDefault = 0
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true)
            setIsActive(false)
            setDaysVip(1)
            handleRenew()
            setIsModalOpen(true)
        }
    }, [isActive, time])

    useEffect(() => {
        const now = new Date();
        const past = new Date(userData.seconds * 1000)
        const diff = past.getTime() - now.getTime()
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

        setDaysVip(days)
    }, [])

    return (
        <div className={styles.dashboard}>
            <h1>Recarga diária gratuita</h1>
            <p>
                Você tem direito a uma recarga gratuita por dia
                caso exceda o limite de validade.
                Também é possível comprar dias com o administrador do grupo no Telegram!
            </p>
            <div className={styles.container}>
                <div className={styles.countdownContainer}>
                    <div>
                        <span>{secondLeft}</span>
                        <span>{secondRight}</span>
                    </div>
                    {daysVip > 0 ? (
                        <button
                            disabled
                            className={styles.countDownButton}
                        >
                            Recarga indisponível
                        </button>
                    ) : (
                        isActive ? (
                            <button
                                type="button"
                                className={`${styles.countDownButton} ${styles.countDownButtonReloading}`}
                            >
                                Recarregando...
                            </button>

                        ) : (
                            <button
                                type="button"
                                className={`${styles.countDownButton}`}
                                onClick={startCountDown}
                            >
                                Recarga gratuita
                            </button>
                        )
                    )}
                </div>
                <div className={styles.undraw}>
                    <img src="./undraw_renew.svg" alt="undraw" />
                </div>
                {isModalOpen && <LevelUpModal daysVip={dayDefaultToRenew} setIsModalOpen={setIsModalOpen} />}
            </div>
        </div>
    )
}