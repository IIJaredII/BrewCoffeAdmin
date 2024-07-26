document.addEventListener('DOMContentLoaded', () => {
    const formularioCategoria = document.getElementById('Formulario');
    const listaCategoria = document.getElementById('listarCategorias');

    const fetchCategorias = async () => {
        try {
            const response = await fetch('/admin/categoria/listar');
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            
            const categoria = await response.json();
            listaCategoria.innerHTML = '';
            
            categoria.forEach(categoria => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                        <th>${categoria.ID_categoria}</th>
                        <th>${categoria.Nombre}</th>
                        <th>${categoria.Descripcion}</th>
                        <th><button class="btn">editar</button><button class="btn">borrar</button></th>
                `;
                listaCategoria.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al obtener las categorias:', error);
        }
    };

formularioCategoria.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formularioCategoria);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Realiza la solicitud para crear la categoría
    const response = await fetch('/categoria/crear', {
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

    // Limpiar el formulario después de crear la categoría
    formularioCategoria.reset();

    // Volver a cargar la lista de categorías
    fetchCategorias();
});


    formularioCategoria.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formularioCategoria);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        await fetch('/categoria/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        formularioCategoria.reset();
        fetchCategorias();
    });

    window.editarCategoria = async (id, nombreActual, descripcionActual) => {
        const nuevoNombre = prompt('Editar nombre de la categoría:', nombreActual);
        const nuevaDescripcion = prompt('Editar descripción de la categoría:', descripcionActual);
        if (nuevoNombre && nuevaDescripcion) {
            await fetch(`/categoria/actualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nuevoNombre, descripcion: nuevaDescripcion })
            });
            fetchCategorias();
        }
    };

    window.eliminarCategoria = async (id) => {
        await fetch(`/categoria/eliminar/${id}`, {
            method: 'DELETE'
        });
        fetchCategorias();
    };

    fetchCategorias();
});
