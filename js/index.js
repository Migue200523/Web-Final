//--------------------CODIGO CAROUSEL--------------------------
window.addEventListener('load', function(){
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 1,
        dots: '.carousel__indicadores',
        arrows: {
            prev: '.carousel__anterior',
            next: '.carousel__siguiente'
        },
        responsive: [
            {
            // screens greater than >= 775px
            breakpoint: 800,
            settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: '2',
            }
            },{
            // screens greater than >= 1024px
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
            }
        ]
    });
});



//--------------------CODIGO API DE PELICULAS DESTACADA--------------------------
function cargarPeliculas() {
  fetch('https://devsapihub.com/api-movies')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('movie-container');
      container.innerHTML = '';

      data.forEach(movie => {
        const rating = movie.stars || 0; // Recupera la calificación de estrellas
        const totalStars = 5; // Número total de estrellas

        // Crear el HTML de las estrellas
        let starsHtml = '';
        for (let i = 0; i < totalStars; i++) {
          if (i < Math.floor(rating)) {
            starsHtml += '<span class="filled">★</span>'; // Estrella llena
          } else if (i < Math.ceil(rating)) {
            starsHtml += '<span class="half-filled">★</span>'; // Estrella mitad llena
          } else {
            starsHtml += '<span class="empty">☆</span>'; // Estrella vacía
          }
        }

        const card = `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="movie-card">
              <img src="${movie.image_url}" alt="${movie.title}" class="movie-poster">
              <div class="movie-rating">
                <span class="rating-year">${movie.year}</span> | ${starsHtml}
              </div>
              <div class="movie-fav"><i class="bi bi-heart"></i></div>
              <div class="movie-overlay">
                <h4 class="movie-title">${movie.title}</h4>
                <p class="movie-info">${movie.description}</p>
              </div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', card);
      });
    })
    .catch(err => {
      console.error('Error al cargar películas:', err);
      document.getElementById('movie-container').innerHTML = `<p class="text-danger">No se pudieron cargar las películas.</p>`;
    });
}

window.addEventListener('DOMContentLoaded', cargarPeliculas);