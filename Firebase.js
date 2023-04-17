import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyD65ZTj2PbotRqZXg_cZPQ9qgz9t7A1MlE",
  authDomain: "bulletin24-7-aafd1.firebaseapp.com",
  projectId: "bulletin24-7-aafd1",
  storageBucket: "bulletin24-7-aafd1.appspot.com",
  messagingSenderId: "835280694267",
  appId: "1:835280694267:web:6b044978a90ce9e7b9f95e"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();




