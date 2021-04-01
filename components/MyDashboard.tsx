import styles from '../styles/MyDashboard.module.css'
import { Stars, EventBusy } from '@material-ui/icons';


export default function MyDashboard ({ userData }) {

    const date = new Date(userData.seconds * 1000)
    const now = new Date();
    const diff = date.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    return (
        <div className={styles.dashboard}>
            <h1>Meu painel de controle</h1>
            <p>
                Acompanhe os seus dias restantes e a data de validade. 
                Realize uma nova recarga gratuita quando disponível!
            </p>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.remaing}>
                        <h2>Dias restantes</h2>
                    </div>
                    <div className={styles.icons}>
                        <div className={styles.remaing}>
                            <Stars />
                            <p>
                                {`
                                    ${days >= 0 ? days : 0} 
                                    ${days > 1 || days === 0 ? 'dias' : 'dia'}
                                `}
                            </p>
                        </div>
                        <div className={styles.remaing}>
                            <EventBusy />
                            <p>{date.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.undraw}>
                    <img src="./undraw.svg" alt="undraw" />
                </div>
            </div>
        </div>
    )
}