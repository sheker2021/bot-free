import { PowerSettingsNew } from '@material-ui/icons';
import styles from '../styles/DashboardProfile.module.css'
import firebase from 'firebase/app'
import Router from 'next/router'

export default function DashboardProfile({ userAvatar }) {

    const avatar = userAvatar === '' ? './avatar.jpg' : userAvatar

    const logout = () => {
        firebase.auth().signOut()
        Router.push('/login');
    }

    return (
        <div className={styles.profile}>
            <div>
                <p onClick={logout}>SAIR <PowerSettingsNew /></p>
                <img src={avatar} alt="Avatar" />
            </div>
        </div>
    )
}