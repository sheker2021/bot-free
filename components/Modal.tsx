import styles from '../styles/ModalAlert.module.css'

export function LevelUpModal({ daysVip, setIsModalOpen }) {

    function closeLevelUpModal(){
        setIsModalOpen(false)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>+{daysVip}</header>

                <strong>Parabéns</strong>
                <p>Recarga gratuita realizada com sucesso!</p>

                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/close.svg" alt="Close" title="Fechar"/>
                </button>
            </div>
        </div>
    )
}