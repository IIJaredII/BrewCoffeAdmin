const loginForm = document.getElementById('iniciar-sesion');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const correo = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/empleado/login', {
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

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/empleado/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
            if (response.ok) {
                window.location.href = '/empleado/html/dashboard.html';
            } else {
                alert('No se pudo acceder al dashboard. Asegúrate de haber iniciado secion.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        
    } else {
        alert(result.message);
    }
    
});
