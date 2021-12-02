import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from './../services/firebase'
import Pessoa from "./pessoa";

export default interface Apolice {
    coberturas: [],
    contratante: Pessoa,
    nomeCliente: string
    premio: number,
    franquia: number,
    tipo: string,
    idade?: number
    dataContrato: string
}

export async function getApolice() {
    const col = collection(db, 'seguro_apolice');
    const snapshot = await getDocs(col);  //pega todos os dados da collection em questão, people;
    return snapshot;
}

export async function addApolice(apolice: Apolice) {
    const col = collection(db, 'seguro_apolice');
    // const docRef = await addDoc(col, people)
    return addDoc(col, apolice)
}

//collection = tabela
//document = linha ou tupla
//data = dado
