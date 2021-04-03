import styles from '../../styles/Login.module.css'
import Api from '../../services/api'
import { Component, createRef } from 'react'
import firebase from 'firebase/app'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import ReCAPTCHA from "react-google-recaptcha"

interface MyProps {

}
interface MyState {
    user: {},
    email: string,
    password: string
    message: string
}


export default class Register extends Component<MyProps, MyState>{
    public recaptchaRef

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            email: null,
            password: null,
            message: 'Não utilize a sua senha da IQ Option!'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.authListener = this.authListener.bind(this)
        this.recaptchaRef = createRef()
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
        const token = await this.recaptchaRef.current.executeAsync();
        if(token){
            const create = await Api.createUser(this.state.email, this.state.password)
            this.setState({message: create})
        }else{
            this.setState({message: 'Erro de reCaptcha'})
        }
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

    onReCAPTCHAChange = (captchaCode) => {
        if(!captchaCode) {
          return;
        }
        this.recaptchaRef.current.reset();
      }

    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Cadastro - Bot Free</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <form onSubmit={this.handleSubmit}>
                    <ReCAPTCHA
                        ref={this.recaptchaRef}
                        size="invisible"
                        sitekey={process.env.RECAPTCHA_SITE_KEY}
                        onChange={this.onReCAPTCHAChange}
                    />
                    <div className={styles.content}>
                        <div className={styles.contentTitle}>
                            Cadastro
                    </div>
                        <div className={styles.contentAll}>
                            <div className={styles.contentItens}>
                                <div className={styles.header}>
                                    <h4>{this.state.message}</h4>
                                </div>
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
                                        Cadastrar
                                    </button>
                                    <Link href="/login">
                                        <a>Já tem conta? Clique aqui para fazer login</a>
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