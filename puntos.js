function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function cargarPuntos() {
    const nombre = getParameterByName('nombre');

    fetch('puntos.xlsx').then(response => {
        return response.arrayBuffer();
    }).then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        let puntos = 0;
        let maxPuntos = 0;
        let ganadores = [];

        jsonData.forEach(row => {
            if (row.Nombre === nombre) {
                puntos = row.Puntos;
            }
            if (row.Puntos > maxPuntos) {
                maxPuntos = row.Puntos;
                ganadores = [row.Nombre];
            } else if (row.Puntos === maxPuntos) {
                ganadores.push(row.Nombre);
            }
        });

        document.getElementById('puntosDisplay').innerHTML = `${nombre} tienes: <br><span>${puntos}</span> PUNTOS`;
        if (ganadores.length === 1) {
            document.getElementById('ganadorDisplay').innerHTML = `GANADOR: ${ganadores[0]}`;
        } else {
            document.getElementById('ganadorDisplay').innerHTML = `EMPATE: ${ganadores.join(', ')}`;
        }
    }).catch(error => {
        console.error('Error al cargar el archivo de puntos:', error);
    });
}

document.addEventListener('DOMContentLoaded', cargarPuntos);
