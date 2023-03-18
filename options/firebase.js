const admin = require("firebase-admin");

const configFirebase = JSON.parse(process.env.FIREBASE)

admin.initializeApp({
  credential: admin.credential.cert(configFirebase),
});

console.log("Conexion exitosa a firebase");
