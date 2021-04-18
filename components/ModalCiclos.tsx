import { useState } from 'react'
import styles from '../styles/ModalCiclos.module.css'

export function LevelUpModal({ cycleState, cyclesModal, setIsModalOpen }) {
    const [c1m0, setC1m0] = useState(cycleState[0].split(';')[0])
    const [c1m1, setC1m1] = useState(cycleState[0].split(';')[1])
    const [c1m2, setC1m2] = useState(cycleState[0].split(';')[2])
    const [c1m3, setC1m3] = useState(cycleState[0].split(';')[3])
    const [c1m4, setC1m4] = useState(cycleState[0].split(';')[4])
    const [c1m5, setC1m5] = useState(cycleState[0].split(';')[5])

    const [c2m0, setC2m0] = useState(cycleState[1].split(';')[0])
    const [c2m1, setC2m1] = useState(cycleState[1].split(';')[1])
    const [c2m2, setC2m2] = useState(cycleState[1].split(';')[2])
    const [c2m3, setC2m3] = useState(cycleState[1].split(';')[3])
    const [c2m4, setC2m4] = useState(cycleState[1].split(';')[4])
    const [c2m5, setC2m5] = useState(cycleState[1].split(';')[5])

    const [c3m0, setC3m0] = useState(cycleState[2].split(';')[0])
    const [c3m1, setC3m1] = useState(cycleState[2].split(';')[1])
    const [c3m2, setC3m2] = useState(cycleState[2].split(';')[2])
    const [c3m3, setC3m3] = useState(cycleState[2].split(';')[3])
    const [c3m4, setC3m4] = useState(cycleState[2].split(';')[4])
    const [c3m5, setC3m5] = useState(cycleState[2].split(';')[5])

    const [c4m0, setC4m0] = useState(cycleState[3].split(';')[0])
    const [c4m1, setC4m1] = useState(cycleState[3].split(';')[1])
    const [c4m2, setC4m2] = useState(cycleState[3].split(';')[2])
    const [c4m3, setC4m3] = useState(cycleState[3].split(';')[3])
    const [c4m4, setC4m4] = useState(cycleState[3].split(';')[4])
    const [c4m5, setC4m5] = useState(cycleState[3].split(';')[5])

    const [c5m0, setC5m0] = useState(cycleState[4].split(';')[0])
    const [c5m1, setC5m1] = useState(cycleState[4].split(';')[1])
    const [c5m2, setC5m2] = useState(cycleState[4].split(';')[2])
    const [c5m3, setC5m3] = useState(cycleState[4].split(';')[3])
    const [c5m4, setC5m4] = useState(cycleState[4].split(';')[4])
    const [c5m5, setC5m5] = useState(cycleState[4].split(';')[5])

    function closeLevelUpModal() {
        setIsModalOpen()
    }

    function saveAndClose() {
        const cycle1 = `${c1m0};${c1m1};${c1m2};${c1m3};${c1m4};${c1m5}`
        const cycle2 = `${c2m0};${c2m1};${c2m2};${c2m3};${c2m4};${c2m5}`
        const cycle3 = `${c3m0};${c3m1};${c3m2};${c3m3};${c3m4};${c3m5}`
        const cycle4 = `${c4m0};${c4m1};${c4m2};${c4m3};${c4m4};${c4m5}`
        const cycle5 = `${c5m0};${c5m1};${c5m2};${c5m3};${c5m4};${c5m5}`

        const cycles = [cycle1, cycle2, cycle3, cycle4, cycle5]

        cyclesModal(cycles)
        setIsModalOpen()
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <strong>Configure as entradas de ciclos</strong>
                <p>Preencha os campos com o valor da entrada</p>

                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>MG 0</th>
                            <th>MG 1</th>
                            <th>MG 2</th>
                            <th>MG 3</th>
                            <th>MG 4</th>
                            <th>MG 5</th>
                        </tr>
                        <tr>
                            <td>Ciclo 1</td>
                            <td><input type="number" defaultValue={c1m0} onChange={(e) => setC1m0(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c1m1} onChange={(e) => setC1m1(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c1m2} onChange={(e) => setC1m2(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c1m3} onChange={(e) => setC1m3(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c1m4} onChange={(e) => setC1m4(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c1m5} onChange={(e) => setC1m5(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Ciclo 2</td>
                            <td><input type="number" defaultValue={c2m0} onChange={(e) => setC2m0(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c2m1} onChange={(e) => setC2m1(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c2m2} onChange={(e) => setC2m2(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c2m3} onChange={(e) => setC2m3(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c2m4} onChange={(e) => setC2m4(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c2m5} onChange={(e) => setC2m5(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Ciclo 3</td>
                            <td><input type="number" defaultValue={c3m0} onChange={(e) => setC3m0(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c3m1} onChange={(e) => setC3m1(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c3m2} onChange={(e) => setC3m2(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c3m3} onChange={(e) => setC3m3(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c3m4} onChange={(e) => setC3m4(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c3m5} onChange={(e) => setC3m5(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Ciclo 4</td>
                            <td><input type="number" defaultValue={c4m0} onChange={(e) => setC4m0(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c4m1} onChange={(e) => setC4m1(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c4m2} onChange={(e) => setC4m2(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c4m3} onChange={(e) => setC4m3(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c4m4} onChange={(e) => setC4m4(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c4m5} onChange={(e) => setC4m5(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Ciclo 5</td>
                            <td><input type="number" defaultValue={c5m0} onChange={(e) => setC5m0(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c5m1} onChange={(e) => setC5m1(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c5m2} onChange={(e) => setC5m2(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c5m3} onChange={(e) => setC5m3(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c5m4} onChange={(e) => setC5m4(e.target.value)} /></td>
                            <td><input type="number" defaultValue={c5m5} onChange={(e) => setC5m5(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>

                <button className={styles.saveButton} type="button" onClick={saveAndClose}>
                    Salvar
                </button>

                <button className={styles.closeButton} type="button" onClick={closeLevelUpModal}>
                    <img src="/close.svg" alt="Close" title="Fechar" />
                </button>
            </div>
        </div>
    )
}