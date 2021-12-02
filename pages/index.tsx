import { QuerySnapshot } from 'firebase/firestore/lite'
import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Button } from 'antd'
import 'antd/dist/antd.css';
import SimulationPage from './simulator'

const Home: NextPage = () => {
  //const [list, setList] = useState<QuerySnapshot>();
  const [isSimulating, setIsSimulating] = useState(false);

  return (
    <div className={styles.container}>
      <h2>Simule diferentes tipos e condições de nossos seguros</h2>
      <Link href='./simulator'>
        <Button type="default" size="large" onClick={() => setIsSimulating(true)}> Iniciar simulação</Button>
      </Link>

      {/* <div style={{ margin: '15px 0' }}>
        <input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        <button onClick={handleAdd}>+ Add</button>
      </div>
      Listagem
      {list?.docs?.map(doc => {
<<<<<<< HEAD
        const people = doc.data() as Pessoa;
        return <span>{people.nome} – {people.email}</span>
      })} */}

    </div>
  )
}

export default Home
