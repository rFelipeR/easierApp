import { QuerySnapshot } from 'firebase/firestore/lite'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import People, { addPeople, getPeople } from '../interfaces/people'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [list, setList] = useState<QuerySnapshot>();
  const [newValue, setNewValue] = useState('');

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
    const newPeople = { Name: newValue } as People
    addPeople(newPeople).then(x => {
      alert('Salvo!')
      handleGetPeople()
    }).catch(error => console.log(error));
  }

  return (
    <div className={styles.container}>
      <div style={{margin:'15px 0'}}>
      <input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
      <button onClick={handleAdd}>+ Add</button>
      </div>
      Listagem
      {list?.docs?.map(doc => {
        const people = doc.data() as People;
        return <span>{people.Id} – {people.Name}</span>
      })}

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
