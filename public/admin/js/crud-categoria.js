// Funciones
const fetchCategorias = async () => {
    try {
        const response = await fetch('/admin/categoria/listar');
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }
        
        const categoria = await response.json();
        const listaCategoria = document.getElementById('listarCategorias');
        listaCategoria.innerHTML = '';
        
        categoria.forEach(categoria => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th>${categoria.ID_categoria}</th>
                <th>${categoria.Nombre}</th>
                <th>${categoria.Descripcion}</th>
                <th>
                    <button class="btn" onclick="editarCategoria(${categoria.ID_categoria}, '${categoria.Nombre}', '${categoria.Descripcion}')">editar</button>
                    <button class="btn" onclick="eliminarCategoria(${categoria.ID_categoria})">borrar</button>
                </th>
            `;
            listaCategoria.appendChild(tr);
        });
        
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

const editarCategoria = async (id, nombreActual, descripcionActual) => {
    cambiarFormulario(2, id, nombreActual, descripcionActual);
};

const eliminarCategoria = async (id) => {
    await fetch(`/admin/categoria/eliminar/${id}`, {
        method: 'PUT'
    });
    fetchCategorias();
};

const cambiarFormulario = (opc, id, nombre, descripcion) => {
    const formulario = document.getElementById('Formulario');
    if (opc === 1) {
        formulario.innerHTML = `
            <h2>Registrar nueva categoría</h2>
            <form id="Formulario-agregar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre de la categoría</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3" placeholder=""></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
        `;
        document.getElementById('descripcion').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
        document.getElementById('Formulario-agregar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const response = await fetch('/admin/categoria/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error('Error al crear la categoría');
                return;
            }

            event.target.reset();
            fetchCategorias();
        });
    } else if (opc === 2) {
        formulario.innerHTML = `
            <h2>Editar categoría</h2>
            <form id="Formulario-editar">
                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre de la categoría</label>
                    <input type="text" class="form-control" id="nombre" value="${nombre}" placeholder="Nombre de la categoría">
                </div>
                <div class="mb-3">
                    <label for="descripcion" class="form-label">Descripción</label>
                    <textarea class="form-control" id="descripcion" rows="3" placeholder="">${descripcion}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Editar</button>
                <button type="button" class="btn btn-secondary" onclick="cambiarFormulario(1)">Cancelar</button>
            </form>
        `;
        document.getElementById('descripcion').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
        document.getElementById('Formulario-editar').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;

            const response = await fetch(`/admin/categoria/actualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, descripcion })
            });

            if (!response.ok) {
                console.error('Error al editar la categoría');
                return;
            }

            event.target.reset();
            cambiarFormulario(1);
            fetchCategorias();
        });
    }
};


// Lógica del evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchCategorias();
    cambiarFormulario(1); 
});