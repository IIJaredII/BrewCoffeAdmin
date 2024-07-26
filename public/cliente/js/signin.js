const registroForm = document.getElementById('registrar');

registroForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/cliente/signin', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id, nombre, correo, telefono, password })
    });

    const result = await response.json();
    alert(result.message);

    // Limpiar los campos del formulario después del registro
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('password').value = '';
});
