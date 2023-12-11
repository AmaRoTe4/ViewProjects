//import { initializeApp } from "firebase/app";

//const firebaseConfig = {
//  apiKey: "AIzaSyDbfRY36UJvnhwCcaIBrtSErpmD8cj-Y3I",
//  authDomain: "pingwebs-70b9e.firebaseapp.com",
//  projectId: "pingwebs-70b9e",
//  storageBucket: "pingwebs-70b9e.appspot.com",
//  messagingSenderId: "442849292354",
//  appId: "1:442849292354:web:0fed7d2739a3b5bf34bddb",
//  measurementId: "G-FV07GR9YHB",
//};

//const app = initializeApp(firebaseConfig);

//const clusters = app.("Clusters");
//const records = app.collection("Record");

import { getLocal, setLocal } from "../localStorage/index.js";

const clusters = "xx-clusters-xx";
const records = "xx-records-xx";

export const getAllClusters = async () => {
  const aux = await getLocal(clusters);
  if (aux == null) return [];
  return JSON.parse(aux);
};

export const setAllClusters = async (value) => {
  await setLocal(clusters, value);
  return true;
};

export const getAllRecords = async () => {
  const aux = await getLocal(records);
  if (aux == null) return [];
  return JSON.parse(aux);
};

export const setAllRecords = async (value) => {
  await setLocal(records, value);
  return true;
};
