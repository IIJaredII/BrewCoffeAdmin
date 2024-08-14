// Funciones
const fetchPedidos = async () => {
    try {
        const pedidos_local = document.getElementById("pedidos-local");
        const pedidos_online = document.getElementById("pedidos-online");

        const response_local = await fetch(`/empleado/listar/pedidos-local`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response_online = await fetch(`/empleado/listar/pedidos-online`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response_local.ok) {
            console.error('Error al listar los pedidos locales');
            return;
        }
        if (!response_online.ok) {
            console.error('Error al listar los pedidos online');
            return;
        }

        const local = await response_local.json();
        const online = await response_online.json();

        pedidos_local.innerHTML = "";
        pedidos_online.innerHTML = "";

        online.forEach(online => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="card-title">${online.Nombre_Cliente}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            <strong>Tipo de Producto:</strong> ${online.Tipo_Producto}<br>
                            <strong>Cantidad:</strong> ${online.Cantidad}<br>
                            <strong>Comentario:</strong> ${online.Comentario}
                        </p>
                        <button class="btn btn-success" onclick="entregado(${online.ID_venta})">Marcar como Entregado</button>
                    </div>
                </div>
            `;
            pedidos_online.appendChild(div);
        });

        local.forEach(local => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="card mb-3">
                    <div class="card-header">
                        <h5 class="card-title">${local.Nombre_Cliente}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            <strong>Tipo de Producto:</strong> ${local.Tipo_Producto}<br>
                            <strong>Cantidad:</strong> ${local.Cantidad}<br>
                            <strong>Comentario:</strong> ${local.Comentario}
                        </p>
                        <button class="btn btn-success" onclick="entregado(${local.ID_venta})">Marcar como Entregado</button>
                    </div>
                </div>
            `;
            pedidos_local.appendChild(div);
        });

    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
    }
};

const entregado = async (id) => {
    try {
        await fetch(`/empleado/pedido/entregado/${id}`, {
            method: 'PUT'
        });
        fetchPedidos(); // Actualizar la lista de pedidos después de marcar como entregado
    } catch (error) {
        console.error('Error al marcar como entregado:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchPedidos();
});
