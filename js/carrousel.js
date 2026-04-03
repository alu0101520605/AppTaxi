/* Carrusel */
document.addEventListener('DOMContentLoaded', function () {

    const carruselContenedor = document.querySelector('.splide');

    if (carruselContenedor) {
        var splide = new Splide('.splide', {
            type    : 'loop',      
            perPage : 1,           
            autoplay: false,       
            
            // Traducción de las etiquetas ARIA (Clave para nivel AA en español)
            i18n: {
            prev: 'Diapositiva anterior',
            next: 'Siguiente diapositiva',
            first: 'Ir a la primera diapositiva',
            last: 'Ir a la última diapositiva',
            slideX: 'Ir a la diapositiva %s',
            pageX: 'Ir a la página %s',
            play: 'Reproducir carrusel',
            pause: 'Pausar carrusel',
            carousel: 'Carrusel de nuestra flota de taxis',
            select: 'Seleccionar una diapositiva para mostrar',
            slideLabel: '%s de %s',
            }
        });

        splide.mount();
    }
});