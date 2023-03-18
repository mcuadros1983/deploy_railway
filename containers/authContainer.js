const admin = require("firebase-admin");

class Contenedor {
  constructor(coll) {
    const db = admin.firestore();
    this.query = db.collection(coll);
  }
  async getById(id) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        throw new Error("no se encuentra esa Id");
      }
      const document = await docRef.get();
      return document.data();
    } catch (error) {
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async getAll() {
    try {
      const docRef = await this.query.get();
      const documents = docRef.docs;
      return documents.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
    } catch (error) {
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async save(obj) {
    try {
      const docRef = this.query.doc();
      return await docRef.set(obj);
    } catch (error) {
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async updateById(id, obj) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        throw new Error("No se encuentra esa id");
      }
      return await docRef.update(obj);
    } catch (error) {
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async deleteById(id) {
    try {
      const docRef = this.query.doc(id);
      return await docRef.delete();
    } catch (error) {
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
}

module.exports = Contenedor;
