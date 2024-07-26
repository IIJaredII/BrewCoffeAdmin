document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('Formulario');
    const listaEmpleados = document.getElementById('listarEmpleados');
    //const botones = document.getElementById('botones');

    const fetchEmpleados = async () => {
        try {
            const response = await fetch('/admin/empleados/listar');
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            
            const empleados = await response.json();
            console.log('respesta: ',response);
            listaEmpleados.innerHTML = '';
            
            empleados.forEach(empleados => {
                const div = document.createElement('tr');
                div.innerHTML = `
                        <th>${empleados.ID_empleado}</th>
                        <th>${empleados.Nombre}</th>
                        <th>${empleados.Telefono}</th>
                        <th>${empleados.Correo}</th>
                        <th>${empleados.Direccion}</th>
                        <th><button class="btn">editar</button><button class="btn">borrar</button></th>
                `;
                listaEmpleados.appendChild(div);
            });
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };

    /* Prototipo de cambio de acciones 
    registrarEditar = (opcion) =>{
        botones.innerHTML='';
        const boton = document.createElement('button');
        if(opcion==1){
            boton.innerHTML=`
                <button type="submit" class="btn btn-success">Registrar</button>
                <button class="btn">Limpiar</button>
            `;
            botones.appendChild(boton);
        }else{
            boton.innerHTML=`
                <button type="submit" class="btn btn-success">Registrar</button>
                <button class="btn">Limpiar</button>
            `;
            botones.appendChild(boton);
            registrarEditar(1);
        }
    };

    prepararEdicion = ()=>{
        document.getElementById('').value="";
    };
    */

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formulario);
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
        formulario.reset();
        fetchEmpleados();
    });

    window.editarCategoria = async (id, nombre, telefono, correo, direccion) => {
        const nuevoNombre = prompt('Editar nombre de la categoría:', nombre);
        const nuevaDescripcion = prompt('Editar descripción de la categoría:', telefono);
        
        
        if (nuevoNombre && nuevaDescripcion) {
            await fetch(`/categoria/actualizar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Nombre: nuevoNombre, Descripcion: nuevaDescripcion })
            });
            fetchEmpleados();
        }
    };

    window.eliminarCategoria = async (id) => {
        await fetch(`/categoria/eliminar/${id}`, {
            method: 'DELETE'
        });
        fetchEmpleados();
    };

    fetchEmpleados();
});

