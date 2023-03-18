const { getMockedItems } = require("../DB/MockApi.js");
const args = process.argv;
const { fork } = require("child_process");
const path = require("path");
const os = require('os');
const logger = require("../logger.js")
const loggerConsola = logger.getLogger("default");


const renderIndex = (req, res) => {
  loggerConsola.info('Ingresando al sistema')
  const user = req.user;
  console.log("user", user);
  res.render("index", { user });
};

const getFakeItems = (req, res) => {
  loggerConsola.info('Oteniendo los items')
  const products = getMockedItems(5);
  res.json(products);
};

const getDatos = (req, res) => {
  loggerConsola.info('Preparando información del sistema para ser entregada')
  const info = {
    'Argumentos de entrada':  args.slice(2),
    'Nombre de la plataforma': process.platform,
    'Versión': process.version,
    'Memoria': process.memoryUsage(),
    'Path': process.cwd(),
    'Proccess id': process.pid,
    'Carpeta del proyecto': process.cwd().split("\\").pop(),
    'Número de procesadores': os.cpus().length
  }
  //console.log(info)
  res.json(info);
};

const randoms = (req, res) => {
  loggerConsola.info('Obteniendo numeros randoms')
  let cant = 1e8;
  if (req.query.cant) {
    cant = req.query.cant;
  }
  const computo = fork(path.resolve(__dirname, 'getRandoms.js'))
  computo.on('message', numeros => {
    if (numeros === 'listo') {
      computo.send(cant)
    } else {
      res.json({ numeros })
    }
  })
};

module.exports = { renderIndex, getFakeItems, getDatos, randoms };
