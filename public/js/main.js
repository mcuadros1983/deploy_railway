const socket = io.connect();

// Recepciono los productos enviados por el servidor
socket.on("products", function (data) {
  renderProductList(data);
});

function renderProductList(data) {
  fetch(`http://localhost:8080/productList.hbs`)
    .then((res) => res.text())
    .then((res) => {
      const template = Handlebars.compile(res);
      const html = template({ products: data });
      document.getElementById("productsContainer").innerHTML = html;
    });
}

function addProducts(e) {
  let producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
  };
  socket.emit("newProduct", producto);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  return false;
}

//Web Chat
// Escucho los mensajes enviados por el servidor
socket.on("messages", function (data) {
  console.log("res2", data);
  renderizar(data);
});

function renderizar(data) {
  const authorSchema = new normalizr.schema.Entity("authors");
  const messageSchema = new normalizr.schema.Entity("messages", {
    author: authorSchema,
  });
  const chat = new normalizr.schema.Entity("chat", {
    messages: [messageSchema],
  });
  const dataDenormalized = normalizr.denormalize(
    data.result,
    chat,
    data.entities
  );
  
  const reductionPercentage = Math.floor(
    100 -
      (JSON.stringify(data).length * 100) /
        JSON.stringify(dataDenormalized).length
  )
  console.log('Porcentaje de reducción')
  console.log(reductionPercentage + '%')
  document.getElementById('reductionPercentage').innerHTML =
    'Porcentaje de reducción: ' + reductionPercentage + '%'


  const html = dataDenormalized.messages
    .map((message) => {
      return `
  <p>
    <img style="width: 30px; border-radius: 100%" src="${message.author.nick}">
    <span class="fw-bold text-danger">${message.author.id}</span>
    <span class="fw-bold text-success">(${message.date}): </span>
    <span>${message.text}</span>
  </p>
`;
    })
    .join("");
  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  let message = {
    author: {
      id: document.getElementById("id").value,
      name: document.getElementById("nombre").value,
      lastname: document.getElementById("apellido").value,
      age: document.getElementById("edad").value,
      nick: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("text").value,
    date: new Date().toLocaleString(),
  };
  socket.emit("newMessage", message);
  document.getElementById("author").value = "";
  document.getElementById("text").value = "";
  return false;
}
