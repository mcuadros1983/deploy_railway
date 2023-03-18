const admin = require("firebase-admin");
const { normalize, schema, denormalize } = require("normalizr");
const logger = require("../logger.js")
const loggerConsola = logger.getLogger("default");
const loggerArchivoError = logger.getLogger("archivoerror");

class Contenedor {
  constructor(coll) {
    const db = admin.firestore();
    this.query = db.collection(coll);
  }
  async getById(id) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        loggerConsola.error("no se encuentra esa Id")
        loggerArchivoError.error("no se encuentra esa Id")
        throw new Error("no se encuentra esa Id");
      }
      const document = await docRef.get();
      return document.data();
    } catch (error) {
      loggerConsola.error("No se pudo realizar esta acción")
      loggerArchivoError.error("No se pudo realizar esta acción")
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
      loggerConsola.error("No se pudo realizar esta acción")
      loggerArchivoError.error("No se pudo realizar esta acción")
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async save(obj) {
    try {
      const docRef = this.query.doc();
      return await docRef.set(obj);
    } catch (error) {
      loggerConsola.error("No se pudo realizar esta acción")
      loggerArchivoError.error("No se pudo realizar esta acción")
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async updateById(id, obj) {
    try {
      const docRef = this.query.doc(id);
      if (!docRef) {
        loggerConsola.error("no se encuentra esa Id")
        loggerArchivoError.error("no se encuentra esa Id")
        throw new Error("No se encuentra esa id");
      }
      return await docRef.update(obj);
    } catch (error) {
      loggerConsola.error("No se pudo realizar esta acción")
      loggerArchivoError.error("No se pudo realizar esta acción")
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }
  async deleteById(id) {
    try {
      const docRef = this.query.doc(id);
      return await docRef.delete();
    } catch (error) {
      loggerConsola.error("No se pudo realizar esta acción")
      loggerArchivoError.error("No se pudo realizar esta acción")
      return { Error: `No se pudo realizar esta acción`, error };
    }
  }

  async getAllMessagesNormalized() {
    try {
      const authorSchema = new schema.Entity("authors");
      const messageSchema = new schema.Entity("messages", {
        author: authorSchema,
      });
      const chat = new schema.Entity("chat", {
        messages: [messageSchema],
      });
      const messages = await this.getAll();
      const data = { id: "general", messages };
      const dataNormalized = await normalize(data, chat);
      return dataNormalized;
    } catch (error) {
      throw new Error(error);
    }
  }

  async denormalizeMessages() {
    try {
      const schemaAuthor = new schema.Entity("author");
      const message = new schema.Entity("message", {
        author: schemaAuthor,
      });
      const chat = new schema.Entity("chat", {
        messages: [message],
      });
      const dataDenormalized = await denormalize(
        data.result,
        chat,
        data.entities
      );
      return dataDenormalized;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Contenedor;
