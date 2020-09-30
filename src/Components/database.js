import * as firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDBd_0y6x2L-TLEc7KaWKy6fScxtSsELdc',
  authDomain: 'photo-tag-27057.firebaseapp.com',
  databaseURL: 'https://photo-tag-27057.firebaseio.com',
  projectId: 'photo-tag-27057',
  storageBucket: 'photo-tag-27057.appspot.com',
  messagingSenderId: '1078049668823',
  appId: '1:1078049668823:web:db29f5c892fa8adfdefa92',
};
// Initialize Firebase
const database = firebase.initializeApp(firebaseConfig);

export default database;
