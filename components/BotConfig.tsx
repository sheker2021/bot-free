import { Component, useState } from 'react'
import styles from '../styles/BotConfig.module.css'
import Api from '../services/api'
import { LevelUpModal } from './ModalCiclos'
import { SettingsBackupRestore } from '@material-ui/icons';

interface MyProps {
    userId: String
    userConfig: {}
    userData: boolean,
    setUserConfig: (userConfig: {}) => void
}

interface MyState {
    userId: string,
    userIsVip: boolean,
    accountType: string,
    payoutType: string,
    money: number,
    payoutMin: number,
    delay: number,
    resultByTaxa: boolean,
    cycles: [],
    telegram: boolean,
    telegramID: number,
    galeOrSoros: string,
    martingaleValue: number,
    martingaleLevel: number,
    sorosPercent: number,
    sorosLevel: number,
    nextCandleOrSignal: string,
    stopWin: number,
    stopLoss: number,
    analyzeTrend: boolean,
    traderTimerZoner: boolean,
    news: boolean,
    candleHit: boolean,
    buttonText: string,
    isModalOpen: boolean,
}

export default class BotConfig extends Component<MyProps, MyState> {
    constructor(props) {
        const {
            accountType,
            payoutType,
            money,
            payoutMin,
            delay,
            resultByTaxa,
            cycles,
            telegram,
            telegramID,
            galeOrSoros,
            martingaleValue,
            martingaleLevel,
            sorosPercent,
            sorosLevel,
            nextCandleOrSignal,
            stopWin,
            stopLoss,
            analyzeTrend,
            traderTimerZoner,
            news,
            candleHit,
        } = props.userConfig as MyState

        const userIsVip = props.userData

        super(props)
        this.state = {
            userId: props.userId,
            userIsVip,
            accountType,
            payoutType,
            money,
            payoutMin,
            delay,
            resultByTaxa,
            cycles,
            telegram,
            telegramID,
            galeOrSoros,
            martingaleValue,
            martingaleLevel,
            sorosPercent,
            sorosLevel,
            nextCandleOrSignal,
            stopWin,
            stopLoss,
            analyzeTrend,
            traderTimerZoner,
            news,
            candleHit,
            buttonText: 'Salvar configurações',
            isModalOpen: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.closeModal   = this.closeModal.bind(this)
        this.cyclesModal  = this.cyclesModal.bind(this)
    }

    handleChange(event) {
        const target = event.target
        let value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        if (name === 'martingaleValue') {
            value = parseFloat(value.replace(',', '.'))
        }
        this.setState({
            [name]: target.type === 'number' ? parseInt(value) : value
        } as Pick<MyState, keyof MyState>);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({buttonText: 'Salvando...'})
        this.props.setUserConfig(this.state)
        await Api.setConfig(this.state)
        this.setState({buttonText: 'Salvo com sucesso!'})
    }

    closeModal(){
        this.setState({isModalOpen: false})
    }

    cyclesModal(cycles){
        this.setState({cycles})
    }

    render() {
        return (
            <div className={styles.dashboard}>
                <h1>Configurações do bot</h1>
                <p>
                    Configure todas as opções que o bot deve seguir.
                    Funções de filtros somente disponível para usuários VIP.
                </p>
                <div className={styles.container}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.content}>
                            <div className={styles.contentTitle}>
                                Geral
                            </div>
                            <div className={styles.contentAll}>
                                <div className={styles.contentItens}>
                                    <p>Tipo de conta</p>
                                    <select
                                        name="accountType"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.accountType}
                                    >
                                        <option value='PRACTICE'>Demo</option>
                                        <option value='REAL'>Real</option>
                                    </select >
                                </div>
                                <div className={styles.contentItens}>
                                    <p>Valor entrada</p>
                                    <input
                                        type="number"
                                        className={styles.inputText}
                                        name="money"
                                        defaultValue={this.state.money}
                                        onChange={this.handleChange}
                                        min={2}
                                        required
                                    />
                                </div>
                                <div className={styles.contentItens}>
                                    <p>Opção payout</p>
                                    <select
                                        name="payoutType"
                                        defaultValue={this.state.payoutType}
                                        onChange={this.handleChange}
                                    >
                                        <option value="MAIOR">Maior payout</option>
                                        <option value="BINARIA">Binária</option>
                                        <option value="DIGITAL">Digital</option>
                                    </select>
                                </div>
                                <div className={styles.contentItens}>
                                    <p>Payout mínimo</p>
                                    <input
                                        className={styles.inputText}
                                        type="number"
                                        name="payoutMin"
                                        defaultValue={this.state.payoutMin}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.contentItens}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputCheckRadio}
                                        id="telegram"
                                        name="telegram"
                                        defaultChecked={this.state.telegram}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="telegram">Bot Telegram</label>
                                    <input
                                        className={styles.inputText}
                                        type="number"
                                        name="telegramID"
                                        defaultValue={this.state.telegramID}
                                        onChange={this.handleChange}
                                        placeholder="ID Telegram"
                                    />
                                </div>
                                <div className={styles.contentItens}>
                                    <p style={{marginTop: '17px'}}>Delay</p>
                                    <input
                                        className={styles.inputText}
                                        type="number"
                                        name="delay"
                                        defaultValue={this.state.delay}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.contentTitle}>
                                Recuperação e alavancagem
                        </div>
                            <div className={styles.contentAll}>
                                <div className={styles.contentItens}>
                                    <input
                                        className={styles.inputCheckRadio}
                                        type="radio"
                                        name="galeOrSoros"
                                        id="martingale"
                                        value="martingale"
                                        defaultChecked={this.state.galeOrSoros === 'martingale'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="martingale">Martingale</label>

                                    <p>Multiplicador</p>
                                    <input
                                        type="text"
                                        className={styles.inputText}
                                        name="martingaleValue"
                                        defaultValue={this.state.martingaleValue}
                                        onChange={this.handleChange}
                                    />

                                    <p>Níveis</p>
                                    <input
                                        type="number"
                                        className={styles.inputText}
                                        name="martingaleLevel"
                                        defaultValue={this.state.martingaleLevel}
                                        onChange={this.handleChange}
                                    />

                                    <input
                                        type="radio"
                                        className={styles.inputCheckRadio}
                                        name="nextCandleOrSignal"
                                        id="radioNextCandle"
                                        value="nextCandle"
                                        defaultChecked={this.state.nextCandleOrSignal === 'nextCandle'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="radioNextCandle">Próxima vela</label>
                                </div>
                                <div className={styles.contentItens}>
                                    <input
                                        className={styles.inputCheckRadio}
                                        type="radio"
                                        name="galeOrSoros"
                                        id="soros"
                                        value="soros"
                                        defaultChecked={this.state.galeOrSoros === 'soros'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="soros">Soros</label>

                                    <p>Porcentagem</p>
                                    <input
                                        type="number"
                                        className={styles.inputText}
                                        name="sorosPercent"
                                        min={10}
                                        max={100}
                                        defaultValue={this.state.sorosPercent}
                                        onChange={this.handleChange}
                                    />

                                    <p>Níveis</p>
                                    <input
                                        type="number"
                                        className={styles.inputText}
                                        name="sorosLevel"
                                        defaultValue={this.state.sorosLevel}
                                        onChange={this.handleChange}
                                    />

                                    <input
                                        type="radio"
                                        className={styles.inputCheckRadio}
                                        name="nextCandleOrSignal"
                                        id="nextSignal"
                                        value="nextSignal"
                                        defaultChecked={this.state.nextCandleOrSignal === 'nextSignal'}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="nextSignal">Próximo sinal</label>
                                </div>
                                <div className={styles.contentItens} style={this.state.userIsVip ? { cursor: 'unset' } : { cursor: 'not-allowed' }}>
                                    <input
                                        className={styles.inputCheckRadio}
                                        type="radio"
                                        name="galeOrSoros"
                                        id="ciclos"
                                        value="ciclos"
                                        defaultChecked={this.state.galeOrSoros === 'ciclos'}
                                        disabled={this.state.userIsVip ? false : true}
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="ciclos">
                                        Ciclos 
                                        <strong style={{color: '#f1c40f'}}> VIP</strong>
                                    </label>
                                    <button 
                                        className={styles.ciclosBtn} 
                                        type="button"
                                        onClick={() => this.setState({ isModalOpen: true})}
                                        disabled={this.state.userIsVip ? false : true}
                                    >
                                        <SettingsBackupRestore /> Configurar ciclos
                                    </button>
                                </div>
                                <div className={styles.contentItens} style={this.state.userIsVip ? { cursor: 'unset' } : { cursor: 'not-allowed' }}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputCheckRadio}
                                        id="resultByTaxa"
                                        name="resultByTaxa"
                                        defaultChecked={this.state.resultByTaxa}
                                        onChange={this.handleChange}
                                        disabled={this.state.userIsVip ? false : true}
                                    />
                                    <label htmlFor="resultByTaxa">
                                        Resultado por taxa
                                        <strong style={{color: '#f1c40f'}}> VIP</strong>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.contentTitle}>
                                Stop WIN e LOSS
                        </div>
                            <div className={styles.contentAll}>
                                <div className={styles.contentItens}>
                                    <p>Stop WIN</p>
                                    <input
                                        type="number"
                                        className={styles.inputText}
                                        name="stopWin"
                                        defaultValue={this.state.stopWin}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.contentItens}>
                                    <p>Stop LOSS</p>
                                    <input
                                        type="number"
                                        className={styles.inputText}
                                        name="stopLoss"
                                        defaultValue={this.state.stopLoss}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.content} style={this.state.userIsVip ? { cursor: 'unset' } : { cursor: 'not-allowed' }}>
                            <div className={styles.contentTitle}>
                                Filtros de proteção
                            <strong style={{
                                    color: '#f1c40f',
                                    textAlign: 'right',
                                    flex: 1
                                }}>VIP</strong>
                            </div>
                            <div className={styles.contentAll}>
                                <div className={styles.contentItens}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputCheckRadio}
                                        id="checkTrend"
                                        name="analyzeTrend"
                                        defaultChecked={this.state.analyzeTrend}
                                        onChange={this.handleChange}
                                        disabled={this.state.userIsVip ? false : true}
                                    />
                                    <label htmlFor="checkTrend">Analisar tendência</label>
                                </div>
                                <div className={styles.contentItens}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputCheckRadio}
                                        id="checkZoner"
                                        name="traderTimerZoner"
                                        defaultChecked={this.state.traderTimerZoner}
                                        onChange={this.handleChange}
                                        disabled={this.state.userIsVip ? false : true}
                                    />
                                    <label htmlFor="checkZoner">Trader Timer Zone</label>
                                </div>
                                <div className={styles.contentItens}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputCheckRadio}
                                        id="checkNews"
                                        name="news"
                                        defaultChecked={this.state.news}
                                        onChange={this.handleChange}
                                        disabled={this.state.userIsVip ? false : true}
                                    />
                                    <label htmlFor="checkNews">Notícias</label>
                                </div>
                                <div className={styles.contentItens}>
                                    <input
                                        type="checkbox"
                                        className={styles.inputCheckRadio}
                                        id="checkCandle"
                                        name="candleHit"
                                        defaultChecked={this.state.candleHit}
                                        onChange={this.handleChange}
                                        disabled={this.state.userIsVip ? false : true}
                                    />
                                    <label htmlFor="checkCandle">Hit de vela</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.saveButton}>
                            <button
                                type="submit"
                                className={`${styles.countDownButton}`}
                            >
                                {this.state.buttonText}
                            </button>
                        </div>
                    </form>
                </div>
                {this.state.isModalOpen && <LevelUpModal cycleState={this.state.cycles} cyclesModal={this.cyclesModal} setIsModalOpen={this.closeModal} />}
            </div>
        )
    }
}