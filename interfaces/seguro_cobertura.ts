import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { db } from './../services/firebase'

export default interface Cobertura {
    guincho_quilometragem: any,
    terceiro: boolean,
    tipo: string,
    valor: number,
}

export async function getCobertura() {
    const col = collection(db, 'seguro_cobertura');
    const snapshot = await getDocs(col);  //pega todos os dados da collection em questão, people;
    return snapshot;
}

export async function addPeople(cobertura: Cobertura) {
    const col = collection(db, 'seguro_cobertura');
    // const docRef = await addDoc(col, people)
    return addDoc(col, cobertura)
}