const loginForm = document.getElementById('iniciar-sesion');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/cliente/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ correo, password })
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('id', result.id);
        localStorage.setItem('nombre', result.nombre);
        alert('Inicio de sesión exitoso');
        window.location.href = '/dashboard';
    } else {
        alert(result.message);
    }
});

