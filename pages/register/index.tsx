import styles from '../../styles/Login.module.css'
import Api from '../../services/api'
import { Component } from 'react'
import firebase from 'firebase/app'
import Router from 'next/router'
import Head from 'next/head'

interface MyProps {

}
interface MyState {
    user: {},
    email: string,
    password: string
}

export default class Register extends Component<MyProps, MyState>{

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            email: null,
            password: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.authListener = this.authListener.bind(this);
    }
    handleChange(event) {
        const target = event.target
        let value = target.value
        const name = target.name
        this.setState({
            [name]: target.type === 'number' ? parseInt(value) : value
        } as Pick<MyState, keyof MyState>);
    }

    async handleSubmit(event) {
        event.preventDefault();
        await Api.createUser(this.state.email, this.state.password)
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Router.push('/dashboard');
            } else {
                this.setState({ user: null });
            }
        })
    }

    render() {
        return (
            <div className={styles.container}>
            <Head>
                <title>Registrar-se - Bot Free</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.content}>
                        <div className={styles.contentTitle}>
                            Cadastro
                    </div>
                        <div className={styles.contentAll}>
                            <div className={styles.contentItens}>
                                <p>E-mail</p>
                                <input
                                    type="text"
                                    name="email"
                                    className={styles.inputText}
                                    onChange={this.handleChange}
                                    required
                                />
                                <p>Senha</p>
                                <input
                                    type="password"
                                    name="password"
                                    className={styles.inputText}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={`${styles.countDownButton}`}
                                >
                                    Cadastrar-se
                            </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}