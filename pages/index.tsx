import { Tooltip, Avatar } from 'antd'
import { QuerySnapshot } from 'firebase/firestore/lite'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import People, { addPeople, getPeople } from '../interfaces/people'
import Card from '../interfaces/people'
import styles from '../styles/Home.module.css'
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";

const Home: NextPage = () => {
  const [list, setList] = useState<QuerySnapshot>();
  const [newValue, setNewValue] = useState('');
  const [cartao, setCartao] = useState<Card>();

  useEffect(() => {
    getPeople().then(x =>
      setList(x)
    )/* .catch(error => alert(error)); */
  }, [])

  function handleGetPeople() {
    getPeople()
      .then(x => setList(x))
      .catch(error => alert(error))
      .catch(error => alert(console.log(error)))
  }

  function handleAdd() {
    const newPeople = { nome: newValue } as People
    addPeople(newPeople).then(x => {
      alert('Salvo!')
      handleGetPeople()
    }).catch(error => console.log(error));
  }

  useEffect(() => { console.log(cartao) }, [cartao])

  return (
    <div className={styles.container}>
      <Avatar.Group style={{ position: 'absolute', top: '50%', left: '10%' }}>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Tooltip>
        <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
      </Avatar.Group>
      <div style={{ margin: '15px 0' }}>
        <input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        <button onClick={handleAdd}>+ Add</button>
      </div>
      Listagem
      {list?.docs?.map(doc => {
        const people = doc.data() as People;
        return (
          <span>
            {people.documento} – {people.nome}
            <button onClick={() => {
              const card = ({ nome: people.nome,  documento: people.documento } as Card)
              setCartao(card)
            }}> Selecionar</button>
          </span>
        )
      })}

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
