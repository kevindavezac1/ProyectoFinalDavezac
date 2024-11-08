let pedidos = [];
let total = 0;

const menuItems = {
    1: { nombre: "Bife de chorizo", precio: 12000 },
    2: { nombre: "Rabas", precio: 9000 },
    3: { nombre: "Mollejas", precio: 8000 },
    4: { nombre: "Entrañas", precio: 13000 },
    5: { nombre: "Matambre de cerdo", precio: 11000 },
    6: { nombre: "Agua", precio: 2000 },
    7: { nombre: "Cerveza", precio: 3000 },
    8: { nombre: "Vino", precio: 4000 }
};

document.getElementById('mostrarMenu').addEventListener('click', mostrarMenu);
document.getElementById('finalizarPedido').addEventListener('click', finalizarPedido);
document.getElementById('reiniciarPedido').addEventListener('click', reiniciarPedido);
document.getElementById('agradecimiento').addEventListener('click', () => {
    alert('¡Gracias a usted!');
    reiniciarPedido();
});

function mostrarMenu() {
    const menuDiv = document.querySelector('.menu-container');
    menuDiv.innerHTML = Object.keys(menuItems).map(key => `
        <div class="card">
            <h3>${menuItems[key].nombre}</h3>
            <p>Precio: $${menuItems[key].precio}</p>
            <button onclick="agregarPedido(${key})">Seleccionar</button>
        </div>
    `).join('');
}

function agregarPedido(seleccion) {
    if (menuItems[seleccion]) {
        pedidos.push(menuItems[seleccion]);
        total += menuItems[seleccion].precio;
        mostrarPedidoActual();
        document.getElementById('finalizarPedido').disabled = false;
    }
}

function mostrarPedidoActual() {
    const pedidoDiv = document.getElementById('pedidoActual');
    if (pedidos.length > 0) {
        pedidoDiv.innerHTML = `
            <h2>Pedido Actual</h2>
            <ul>
                ${pedidos.map((item, index) => `<li>${item.nombre} - $${item.precio} <button onclick="eliminarPedido(${index})">Eliminar</button></li>`).join('')}
            </ul>
            <p>Total: $${total}</p>
        `;
    } else {
        pedidoDiv.innerHTML = '';
    }
}

function eliminarPedido(index) {
    total -= pedidos[index].precio;
    pedidos.splice(index, 1);
    mostrarPedidoActual();
    if (pedidos.length === 0) {
        document.getElementById('finalizarPedido').disabled = true;
    }
}

function finalizarPedido() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Tu pedido es: ${pedidos.map(item => item.nombre).join(", ")}</p>
        <p>El monto total a cobrar es: $${total}</p>
    `;
}

function reiniciarPedido() {
    pedidos = [];
    total = 0;
    mostrarPedidoActual();
    document.getElementById('finalizarPedido').disabled = true;
    document.getElementById('resultado').innerHTML = '';
    document.querySelector('.menu-container').innerHTML = ''; 
}
