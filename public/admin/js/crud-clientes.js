// Funciones
const fetchClientes = async () => {
    try {
        const opc = document.getElementById('opcion').value;
        const dato = document.getElementById('dato').value;
        console.log('opcion', opc);
        console.log('dato', dato);

        const response = await fetch(`/admin/cliente/listar?opc=${opc}&dato=${dato}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Error al listar los clientes');
            return;
        }

        const clientes = await response.json();
        const listaClientes = document.getElementById('listarClientes');
        listaClientes.innerHTML = '';

        clientes.forEach(cliente => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th>${cliente.ID_cliente}</th>
                <th>${cliente.Nombre}</th>
                <th>${cliente.Telefono}</th>
                <th>${cliente.Correo}</th>
                <th>
                    <button class="btn" onclick="editarCliente(${cliente.ID_cliente}, '${cliente.Nombre}', '${cliente.Telefono}', '${cliente.Correo}')">editar</button>
                    <button class="btn" onclick="eliminarCliente(${cliente.ID_cliente})">borrar</button>
                </th>
            `;
            listaClientes.appendChild(tr);
        });
        
        if(opc === '0'){
            document.getElementById('dato').value = "";
        }

    } catch (error) {
        console.error('Error al obtener los clientes:', error);
    }
};

const editarCliente = async (id, nombreActual, telefonoActual, correoActual) => {
    cambiarFormulario(2, id, nombreActual, telefonoActual, correoActual);
};

const eliminarCliente = async (id) => {
    await fetch(`/admin/cliente/eliminar/${id}`, {
        method: 'PUT'
    });
    fetchClientes();
};

const cambiarFormulario = (opc, id, nombre, telefono, correo, estado) => {
    const formulario = document.getElementById('Formulario');
    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nuevo cliente</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="id" class="form-label">DNI del cliente</label>
                    <input type="text" class="form-control" id="id" placeholder="DNI del cliente">
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del cliente</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del cliente">
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="text" class="form-control" id="telefono" placeholder="Teléfono">
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" class="form-control" id="correo" placeholder="Correo">
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;
        document.getElementById('Formulario-agregar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = document.getElementById('id').value;
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const correo = document.getElementById('correo').value;
            

            const response = await fetch('/admin/cliente/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, telefono, correo,  id })
            });

            if (!response.ok) {
                console.error('Error al agregar el cliente');
                return;
            }

            event.target.reset();
            fetchClientes();
        });
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar cliente</h2>
            <form id="Formulario-editar">
                 <div class="mb-3">
                    <label for="id" class="form-label">DNI del Cliente</label>
                    <input type="text" class="form-control" id="id" value="${id}" placeholder="DNI del clienteS">
                </div>
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre del cliente</label>
                    <input type="text" class="form-control" id="nombre" value="${nombre}" placeholder="Nombre del cliente">
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Teléfono</label>
                    <input type="text" class="form-control" id="telefono" value="${telefono}" placeholder="Teléfono">
                </div>
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" class="form-control" id="correo" value="${correo}" placeholder="Correo">
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;
        document.getElementById('Formulario-editar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const correo = document.SgetElementById('correo').value;
            const id = document.getElementById('id').value;

            const response = await fetch(`/admin/cliente/actualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, nombre, telefono, correo })
            });

            if (!response.ok) {
                console.error('Error al editar el cliente');
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            fetchClientes();
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchClientes();
    cambiarFormulario(1); 
});

