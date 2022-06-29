const express = require('express');
const app = express();

const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
      this.nombreArchivo = nombreArchivo;
    }
  
    getAll() {
      const respuesta = fs.readFileSync(this.nombreArchivo, "utf-8");
      return (JSON.parse(respuesta));
    }
  
    getRandom() {
      const datos = this.getAll();
      const random = Math.floor(Math.random() * datos.length);
      return random;
    }
  }
  
  const contenedor1 = new Contenedor("productos.json");
  contenedor1.getRandom();
  
  const PORT = process.env.PORT || 8080;
  
  app.get("/", (req,res) => {
    res.send(`<h1> Bienvenido ! </h1>`);
  });
  
  function productosMostrar() {
    const datos = contenedor1.getAll();
  
    let estructuraDatos = "";
    datos.forEach(producto => {
      estructuraDatos += `
        <article class="product-item">
          <h2>${producto.nombre}</h2>
          <h3>$ ${producto.precio}</h3>
          <picture>
            <img class="product-img" src="${producto.imagen}" alt="${producto.nombre}" />
          </picture>
        </article>
      `;
    });
  
    return `
      <style>
        h1, h2, h3 {
          text-align: center;
        }
        .container-products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .product-item {
          border-radius: 10px;
          box-shadow: 0 0 10px black;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .product-img {
          width: 150px;
        }
      </style>
      <h1>Productos</h1>
      <div class="container-products">
        ${estructuraDatos}
      </div>
    `;
  }
  
  app.get("/productos", (req,res) => {
    res.send(productosMostrar());
  });
  
  function productoRandom() {
    const datos = contenedor1.getAll();
    const producto = datos[contenedor1.getRandom()];
  
    let estructuraDatos = `
      <div class="product-item">
        <h2>${producto.nombre}</h2>
        <h3>$ ${producto.precio}</h3>
        <picture>
          <img class="product-img" src="${producto.imagen}" alt="${producto.nombre}" />
        </picture>
      </div>
    `;
  
    return `
      <style>
        h1, h2, h3 {
          text-align: center;
        }
        .container-products {
          display: flex;
          justify-content: center;
        }
        .product-item {
          border-radius: 10px;
          box-shadow: 0 0 10px black;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .product-img {
          min-width: 150px;
          max-width: 250px;
        }
      </style>
      <h1>Producto Aleatorio</h1>
      <div class="container-products">
        ${estructuraDatos}
      </div>
    `;
  }
  
  app.get("/productoRandom", (req,res) => {
    res.send(productoRandom());
  });
  
  const server = app.listen(PORT, () => {
    console.log("Servidor HTTP escuchando en el puerto " + server.address().port);
  });
  
  server.on("error", error => console.log(`Error en servidor ${error}`));