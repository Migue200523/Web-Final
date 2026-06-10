const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTg2N2ZkN2M5YzAyMjQwYmI5YjlmODRkN2YyZTc0NSIsIm5iZiI6MTc4MDA0NTY2Ni44NjIwMDAyLCJzdWIiOiI2YTE5NTc2MmVhNTA1OTJiMjZjODlhZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Oxjlb-hqPyHVGzq0V_bMk_rOMtXCKDVEp-A--wpF9Uc'
  }
};

let pagina = 1;
let btnAnterior = document.getElementById('btnAnterior');
let btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000){
    pagina += 1;
    cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if (pagina > 1){
    pagina -= 1;
    cargarPeliculas();
    }
})

let cargarPeliculas = async() =>{
    try{
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pagina}`, options)
    if(respuesta.status === 200){
        let datos = await respuesta.json();

        let peliculas = ''
        datos.results.forEach(pelicula => {
            peliculas += `
            <div id = 'pelicula' class = 'pelicula'>
                <a href="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" data-lightbox="images" data-title="${pelicula.title}"><img class='poster' src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'></a>
                <h3 class ='titulo'>${pelicula.title}</h3>
            </div>
            `;
        });

        document.getElementById('contenedor').innerHTML = peliculas;

    } else if(respuesta.status === 401) {
        console.log('ID Mal colocado');
    } else if(respuesta.status === 404){
        console.log('La pelicula que buscas no existe');
    } else {
        console.log('Hubo un error, no se tiene informacion');
    }
    }
    catch(error){
        err => console.log(err);
    }

};
cargarPeliculas();

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
 })