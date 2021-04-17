import { Component } from 'react'
import styles from '../styles/BotList.module.css'
import Api from '../services/api'

interface MyProps {
    userId: string,
    userList: {},
    setUserList: (userList: {}) => void
 }

interface MyState {
    userId: string,
    listBotApi: [],
    listBot: [],
    listDate: string,
    buttonText: string,
}

export default class BotList extends Component<MyProps, MyState> {
    constructor(props) {
        super(props)
        const {
            listBot,
            listDate,
        } = props.userList as MyState

        this.state = {
            userId: props.userId,
            listBotApi: listBot,
            listBot,
            listDate,
            buttonText: 'Salvar lista'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    converToArray = (list) => {
        return list.split('\n')
    }

    handleChange(event) {
        const target = event.target
        let value = target.value
        const name = target.name
        if (name === 'listBot') {
            value = this.converToArray(value)
        }
        this.setState({
            [name]: value
        } as Pick<MyState, keyof MyState>);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({buttonText: 'Salvando...'})
        console.log(this.state.buttonText)
        this.props.setUserList(this.state)
        await Api.setList(this.state)
        this.setState({buttonText: 'Salvo com sucesso!'})
    }
    render() {
        return (
            <div className={styles.dashboard}>
                <h1>Lista de sinais do bot</h1>
                <p>
                    Configure a data e a lista de sinais que o bot deve seguir.
            </p>
                <div className={styles.container}>
                    <form onSubmit={this.handleSubmit}>
                        <div className={styles.form}>
                            <p>Data da lista</p>
                            <input
                                type="date"
                                name="listDate"
                                defaultValue={this.state.listDate}
                                onChange={this.handleChange}
                                placeholder="01/01/2000"
                                required
                            />
                            <p>Lista de sinais</p>
                            <textarea
                                maxLength={1500}
                                name="listBot"
                                defaultValue={
                                    this.state.listBotApi === null ? 
                                    this.state.listBotApi 
                                    : 
                                    this.state.listBotApi.join('\n')
                                }
                                onChange={this.handleChange}
                                placeholder="Formato aceito&#10;M5;EURJPY;11:05:00;PUT;&#10;M5;AUDCAD;12:05:00;CALL;"
                                required>
                            </textarea>
                        </div>
                        <div className={styles.undraw}>
                            <img src="./undraw_list.svg" alt="undraw" />
                            <button type="submit" className={styles.countDownButton}>
                                {this.state.buttonText}
                    </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}