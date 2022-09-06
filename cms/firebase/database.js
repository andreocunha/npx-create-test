import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import collections from "../../config/collections";

// pega os dados de uma collection
export async function getCollectionData(collectionName) {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      resolve(querySnapshot?.docs?.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    catch (error) {
      reject(error);
    }
  });
}

// pega todas as collections
export async function getAllCollectionData() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Promise.all(collections.map(async (collection) => {
        const data = await getCollectionData(collection.name);
        return {
          collection: collection.name,
          data
        }
      }));
      resolve(data);
    }
    catch (error) {
      reject(error);
    }
  });
}

// adiciona um novo post
export async function addNewPost(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(docRef);
    return 'ok';
  } catch (e) {
    console.error("Error adding document: ", e);
    return 'error';
  }
}

// atualizar um post
export async function updatePost(collectionName, collectionId, data) {
  try {
    const docRef = doc(db, collectionName, collectionId);
    await updateDoc(docRef, data);
    return 'ok';
  } catch (e) {
    console.error("Error adding document: ", e);
    return 'error';
  }
}

// deletar um post
export async function deletePost(collectionName, collectionId) {
  try {
    const docRef = doc(db, collectionName, collectionId);
    await deleteDoc(docRef);
    return 'ok';
  } catch (e) {
    console.error("Error adding document: ", e);
    return 'error';
  }
}