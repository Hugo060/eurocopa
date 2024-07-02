function submitForm(event) {
    event.preventDefault();
    
    let nombre = document.getElementById('nombre').value.trim(); // Trim para eliminar espacios en blanco al inicio y final
    localStorage.setItem('nombre', nombre);
    
    // Verificar si el nombre está en la lista de puntos
    if (nombre in puntos) {
        window.location.href = 'puntos.html';
    } else {
        mostrarError();
    }
}

function mostrarError() {
    let container = document.querySelector('.container');
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = 'Nombre incorrecto';
    container.appendChild(errorDiv);
}

