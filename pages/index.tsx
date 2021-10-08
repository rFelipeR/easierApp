import { QuerySnapshot } from 'firebase/firestore/lite'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import People, { getPeople } from '../interfaces/people'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [list, setList] = useState<QuerySnapshot>();

  useEffect(() => {
    getPeople().then(x =>
      setList(x)
    )/* .catch(error => alert(error)); */
  }, [])

  return (
    <div className={styles.container}>
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
