function submitForm(event) {
    event.preventDefault();
    
    let nombre = document.getElementById('nombre').value;
    localStorage.setItem('nombre', nombre);
    
    window.location.href = 'puntos.html';
}
