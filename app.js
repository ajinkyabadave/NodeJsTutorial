// // Import the functions you need from the SDKs you need
var admin = require('firebase-admin');
var serviceAccount = require('./nodetutorial-a2a84-firebase-adminsdk-pzxu8-8dbc1972d7.json');
var cron = require('node-cron');


const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

getData();
onNewUserAdded();
runJobEveryTwoHours();

async function getData(){
    db.collection('users').doc('Z5SpUFCRrlAlNbLxYVoe').collection('messages').doc('0tn8l6RVNXx3J7BGOgQt').get().then((doc)=>{
        if (doc.exists) {
            printMessage("Document data:", doc.data());
        } else {
            printMessage("No such document!");
        }
    }).catch((error)=>{
        printMessage(error);
    });
}

function onNewUserAdded(){
    db.collection('users').onSnapshot(querySnapshot =>{
        checkChangeType(querySnapshot)
    });
}

function checkChangeType(querySnapshot){
    querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          printMessage('Added: New user inserted  ', change.doc.data());
        }
    });
}

function printMessage(message, parameter){
    console.log(message, parameter !=undefined? parameter:" ");
}

function runJobEveryTwoHours() {
    cron.schedule('0 0 */2 * * *', () => {
        printMessage('Added: Running a task every two hours');
    });
}