import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from '../services/firebase'

export default interface Pessoa {
    nome: string,
    email: string,
    documento: string
    saldo: number
}

export async function getPessoa() {
    const col = collection(db, 'pessoa');
    const snapshot = await getDocs(col);  //pega todos os dados da collection em questão, people;
    return snapshot;
}


export async function addPessoa(pessoa: Pessoa) {
    const col = collection(db, 'pessoa');
    return addDoc(col, pessoa)
}


//collection = tabela
//document = linha ou tupla
//data = dado
