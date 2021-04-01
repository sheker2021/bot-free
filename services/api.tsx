import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'

import firebaseConfig from './firebaseConfig'


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore()

export default {
    getUser: async (userId) => {
        var data = null
        let results = await db.collection('users').get()
        results.forEach(result => {
            if (result.id === userId) {
                data = result.data()
            }
        })
        return data
    },

    setConfig: async (userData) => {
        const {
            userId,
            accountType,
            payoutType,
            money,
            payoutMin,
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
        } = userData

        await db.collection('users').doc(userId).update({
            config: ({
                accountType,
                payoutType,
                money,
                payoutMin,
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
            })
        })
    },
    setList: async (userData) => {
        let {
            userId,
            listBot,
            listDate,
        } = userData

        listBot = listBot.filter(function (e) { return e.replace(/(\r\n|\n|\r)/gm, "") })

        await db.collection('users').doc(userId).update({
            list: ({
                listBot,
                listDate,
            })
        })
    },
    setRenew: async (userData) => {
        const {
            userId,
            validity,
        } = userData

        console.log(userId)

        await db.collection('users').doc(userId).update({
            userBot: ({
                validity,
            })
        })
    },

    createUser: async (email, password) => {
        const dataNow = new Date()
        dataNow.setDate(dataNow.getDate() - 1)

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(data => {
                db.collection('users').doc(data.user.uid).set({
                    config: ({
                       accountType: 'PRACTICE',
                       analyzeTrend: false,
                       candleHit: false,
                       galeOrSoros: 'martingale',
                       martingaleLevel: 2,
                       martingaleValue: 2.5,
                       money: 2,
                       news: false,
                       nextCandleOrSignal: 'nextCandle',
                       payoutMin: 70,
                       payoutType: 'MAIOR',
                       sorosLevel: 2,
                       sorosPercent: 50,
                       stopLoss: 100,
                       stopWin: 40,
                       telegram: false,
                       telegramID: 0,
                       traderTimerZoner: false,
                    }),
                    list: ({
                        listBot: null,
                        listDate: ''
                    }),
                    userBot: ({
                        vip: false,
                        validity: firebase.firestore.Timestamp.fromDate(dataNow)
                    }),
                    userIQ: ({
                        avatar: '',
                        first_name: '',
                        last_name: ''
                    }),
                })
                return 'success'
            })
            .catch(error => {
                alert(error.toString());
                return error.toString()
            });
    },

    loginUser: async (email, password) => {

        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(data => {
                localStorage.setItem('userID', data.user.uid);
            })
            .catch(error => {
                alert(error.toString());
            });
    },
}