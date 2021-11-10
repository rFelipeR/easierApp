import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from './../services/firebase'

export default interface People {
    nome: string,
    documento: string,
    email: string,
    saldo: number
}

export async function getPeople() {
    const col = collection(db, 'pessoa');
    const snapshot = await getDocs(col);  //pega todos os dados da collection em questão, people;
    return snapshot;
}


export async function addPeople(people: People) {
    const col = collection(db, 'pessoa');
    // const docRef = await addDoc(col, people)
    return addDoc(col, people)

}


//collection = tabela
//document = linha ou tupla
//data = dado
