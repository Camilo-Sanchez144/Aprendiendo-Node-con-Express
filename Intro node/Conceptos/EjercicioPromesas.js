const estatusPedido =()=>{
    return Math.random() < 0.8;
}
const miPedidoDePizza = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if(estatusPedido()){
            resolve("Felicitaciones su pizza esta en camino!!!!!")
        }else{
            reject("Lastimosamente perdimos tu pedido:(")
        }
    },3000)
})

miPedidoDePizza
    .then((valor)=>{
        console.log(valor);
    })
    .catch((valorRechazo)=>{
        console.log(valorRechazo);
    })