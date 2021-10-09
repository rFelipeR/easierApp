import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from './../services/firebase'

export default interface People {
    Id: string,
    Name: string,
    Document: string
}

export async function getPeople() {
    const col = collection(db, 'people');
    const snapshot = await getDocs(col);  //pega todos os dados da collection em questão, people;
    return snapshot;
}


// export async function addPeople(people: People) {
//     const col = collection(db, 'people');
//     // const docRef = await addDoc(col, people)
//     // return addDoc(col, people)

// }


//collection = tabela
//document = linha ou tupla
//data = dado
