const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const config = require('./config.js');
const data = require('./data.json');

firebase.initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID
});

const db = firebase.firestore();

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

const isSubcollection = (value) => {
  return Array.isArray(value) && value.every(item => isObject(item));
};

const addSubcollections = async (docRef, documentData) => {
  for (const [key, value] of Object.entries(documentData)) {
    if (isSubcollection(value)) {
      for (let subDoc of value) {
        await docRef.collection(key).add(subDoc);
      }
    }
  }
};

const addDataToFirestore = async () => {
  for (let key of Object.keys(data)) {
    const documents = data[key];
    for (let documentData of documents) {
      // Separate subcollections from main document data
      const mainData = { ...documentData };
      for (const key of Object.keys(mainData)) {
        if (isSubcollection(mainData[key])) {
          delete mainData[key];
        }
      }
      //add main document
      const docRef = await db.collection(key).add(mainData);
      console.log(`"${key}" document added with ID: ${docRef.id}`);

      //add subcollections
      await addSubcollections(docRef, documentData);
    }
  }
};

addDataToFirestore().then(() => {
  console.log('Data import completed.');
}).catch((error) => {
  console.error('Error during data import:', error);
});
