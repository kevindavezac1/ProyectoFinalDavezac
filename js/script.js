$(document).ready(function() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let total = JSON.parse(localStorage.getItem('total')) || 0;

    const menuItems = {};

    fetch('./json/menu.json')
        .then(response => response.json())
        .then(data => {
            Object.assign(menuItems, data);
            mostrarMenu();
        })
        .catch(error => console.error('Error al cargar el menú:', error));

    $('#mostrarMenu').click(mostrarMenu);
    $('#finalizarPedido').click(finalizarPedido);
    $('#reiniciarPedido').click(reiniciarPedido);
    $('#agradecimiento').click(() => {
        if (pedidos.length > 0) {
            alert('¡Gracias a usted!');
            reiniciarPedido();
        } else {
            alert('Gracias, pero aún no ha probado nada.');
        }
    });

    function mostrarMenu() {
        const menuDiv = $('.menu-container');
        menuDiv.html(Object.keys(menuItems).map(key => `
            <div class="card">
                <h3>${menuItems[key].nombre}</h3>
                <p>Precio: $${menuItems[key].precio}</p>
                <button onclick="agregarPedido(${key})">Seleccionar</button>
            </div>
        `).join(''));
    }

    window.agregarPedido = function(seleccion) {
        if (menuItems[seleccion]) {
            pedidos.push(menuItems[seleccion]);
            total += menuItems[seleccion].precio;
            guardarEnLocalStorage();
            mostrarPedidoActual();
            $('#finalizarPedido').prop('disabled', false);
        }
    }

    function mostrarPedidoActual() {
        const pedidoDiv = $('#pedidoActual');
        if (pedidos.length > 0) {
            pedidoDiv.html(`
                <h2>Pedido Actual</h2>
                <ul>
                    ${pedidos.map((item, index) => `<li>${item.nombre} - $${item.precio} <button onclick="eliminarPedido(${index})">Eliminar</button></li>`).join('')}
                </ul>
                <p>Total: $${total}</p>
            `);
        } else {
            pedidoDiv.html('');
        }
    }

    window.eliminarPedido = function(index) {
        total -= pedidos[index].precio;
        pedidos.splice(index, 1);
        guardarEnLocalStorage();
        mostrarPedidoActual();
        if (pedidos.length === 0) {
            $('#finalizarPedido').prop('disabled', true);
        }
    }

    function finalizarPedido() {
        const resultadoDiv = $('#resultado');
        resultadoDiv.html(`
            <p>Tu pedido es: ${pedidos.map(item => item.nombre).join(", ")}</p>
            <p>El monto total a cobrar es: $${total}</p>
        `);
    }

    function reiniciarPedido() {
        pedidos = [];
        total = 0;
        guardarEnLocalStorage();
        mostrarPedidoActual();
        $('#finalizarPedido').prop('disabled', true);
        $('#resultado').html('');
        $('.menu-container').html(''); 
    }

    function guardarEnLocalStorage() {
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        localStorage.setItem('total', JSON.stringify(total));
    }


    mostrarPedidoActual();
});