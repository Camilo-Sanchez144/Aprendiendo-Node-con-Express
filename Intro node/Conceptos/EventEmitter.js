const EventEmitter = require("events");

const emisorProductos = new EventEmitter();

emisorProductos.on('compra',(total, numProductos)=>{
    console.log(`Se realizó una compra por $${total}`);
    console.log(`Numero de productos son ${numProductos}`)
});
emisorProductos.emit('compra', 500,50)