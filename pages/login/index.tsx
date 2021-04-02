import styles from '../../styles/Login.module.css'
import Api from '../../services/api'
import { Component } from 'react'
import firebase from 'firebase/app'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

interface MyProps {

}
interface MyState {
    user: {},
    email: string,
    password: string
}

export default class Login extends Component<MyProps, MyState>{
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
        await Api.loginUser(this.state.email, this.state.password)
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
                    <title>Login - Bot Free</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <form onSubmit={this.handleSubmit}>
                    <div className={styles.content}>
                        <div className={styles.contentTitle}>
                            Login
                    </div>
                        <div className={styles.contentAll}>
                            <div className={styles.contentItens}>
                                <p>E-mail</p>
                                <input
                                    type="email"
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
                                <div className={styles.footer}>
                                    <button
                                        type="submit"
                                        className={`${styles.countDownButton}`}
                                    >
                                        Entrar
                                    </button>
                                    <Link href="/register">
                                        <a>Não tem conta? Clique aqui para se cadastrar</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}