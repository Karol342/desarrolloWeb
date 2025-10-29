// Envolvemos TODO en DOMContentLoaded para asegurar que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENU HAMBURGUESA ==========
    //apertura y cierre del menu
    //seleccionamos los elementos de html que vamos a usar
    const navMenu = document.querySelector('.nav__menu');
    const abrir = document.querySelector('.nav__button--abrir');
    const cerrar = document.querySelector('.nav__button--cerrar');

    //verificamos que los 3 elementos existan antes de ejecutar el codigo para evitar errores
    if (navMenu && abrir && cerrar) {

        //Cuando el usuario hace clic en el boton abrir
        abrir.addEventListener('click', () => {

            //añade la clase visible al menu
            navMenu.classList.add('visible');

            //añade la clase visible al boton cerrar
            cerrar.classList.add('visible');

            //añade la clase oculto al boton abrir
            abrir.classList.add('oculto');
        });

        //Cuando el usuario hace clic en el boton cerrar
        cerrar.addEventListener('click', () => {

            //quita la clase visible del menu
            navMenu.classList.remove('visible');
            
            //quita la clase visible del boton cerrar
            cerrar.classList.remove('visible');

            //quita la clase oculto del boton abrir
            abrir.classList.remove('oculto');
        });
    }

    // ========== BACKGROUND ENTRADA/ABONO ==========

    //seleccionamos la seccion que cambiará su fondo
    const sectionInfo = document.querySelector('.section__info');
    //seleccionamos todas las tarjetas
    const cards = document.querySelectorAll('.card');

    //Comprobamos que la sección y las tarjetas existen antes de ejecutar el código
    if (sectionInfo && cards.length > 0) {

        //recorremos todas las tarjetas encontradas
        cards.forEach(element => {

            //añadimos un evento "mouseenter" a cada tarjeta
            element.addEventListener('mouseenter', () => {
                //buscamos dentro de la lista de clases de esa tarjeta alguna que contenga el texto "card--"
                const cardClass = Array.from(element.classList).find(cls => cls.includes('card--'));

                
                if (cardClass) {
                    // Extraemos la parte del nombre que viene después de los dos guiones
                    const cardName = cardClass.split('--')[1];
                    //cambiamos dinámicamente la imagen de fondo de la sección principal
                    sectionInfo.style.backgroundImage = `url(../imagenes/${cardName}.jpg)`;
                }
            });
        });
    }



    // ========== CARRUSEL ==========

    //definimos una función llamada "start" que recibe selector y step
    function start(selector, step = 1) {

        //seleccionamos el elemento del carrusel
        const carrusel = document.querySelector(selector);

        //si no existe, salimos de la funcion
        if (!carrusel) return;

        // Duplicamos el contenido (una sola vez)
        carrusel.innerHTML += carrusel.innerHTML;

        //inicializamos variables para controlar el desplazamiento
        let scrollAmount = 0;
        const maxScroll = carrusel.scrollWidth / 2;  //el limite es la mitad porque lo hemos duplicaado

        //creamos un intervalo que se ejecuta cad 20ms
        setInterval(() => {
            carrusel.scrollLeft += step;
            scrollAmount += step;

            // Cuando llegamos al final de la primera mitad, reiniciamos sin salto
            if (scrollAmount >= maxScroll) {
                carrusel.scrollLeft = 0;
                scrollAmount = 0;
            //si el step es negativo, sentido contrario
            } else if (scrollAmount <= 0) {
                carrusel.scrollLeft = maxScroll;
                scrollAmount = maxScroll;
            }
        }, 20);
    }
    //inicializacion de carruseles
    start('.carrusel__groups', 1);
    start('.carrusel__groups--reverse', -1);

    // ========== LIGHTBOX ==========
    //seleccionamos las imagenes
    const imgList = document.querySelectorAll('.artist__img');

    //selecionamos los elementos principales
    const lightbox = document.querySelector('.lightbox');
    const grande = document.querySelector('.grande');
    const closeBtn = document.querySelector('.cerrar');

    //comprobamos que todos los elemn existen
    if (imgList.length > 0 && lightbox && grande && closeBtn) {
        
        //funcion para cerrar lightbox
        const closeBtnHandler = () => lightbox.classList.remove('isActive');
        
        //muestra el lightbox y cambia la imagen grande
        const imgListHandler = (index) => {
            
            lightbox.classList.add('isActive');
            //cambiamos la imagen grande por la miniatura clicada
            grande.src = imgList[index].src;
            

            const artistName = imgList[index].closest('.artist__box')?.querySelector('.artist__name')?.textContent;
            if (artistName) {
                grande.alt = artistName;
            }
        }
        
        //recorremos todas imagenes
        imgList.forEach((eachImg, index) => {
             // Añadimos un evento de clic a cada una
            eachImg.addEventListener('click', () => {
                 // Al hacer clic, ejecutamos la función que abre el lightbox con esa imagen
                imgListHandler(index);
            });
        });
        
        //evento para cerrar el lightbox al pulsar el botón "cerrar"
        closeBtn.addEventListener('click', closeBtnHandler);        
    }


    // ========== ACORDEON ==========

    //seleccionamos los elementos
    const items = document.querySelectorAll('.faq__item');
    const questions = document.querySelectorAll('.faq__question');

    //comprobamos que haya al menos un item y una pregunta en el DOM
    if (questions.length > 0 && items.length > 0) {
        //recorremos las preguntas con su indice
        questions.forEach((question, i) => {

            //añadimos un click a cada pregunta
            question.addEventListener('click', () => {
                 // Si el item clickeado ya está activo, lo cerramos
                items.forEach((item) => {
                    if (items[i].classList.contains('active')) {
                        item.classList.remove('active');
                    } else {
                          // Si no, cerramos todos y abrimos el clickeado
                        items.forEach((item) => {
                            item.classList.remove('active');
                        });
                        items[i].classList.add('active');
                    }
                });
            });
        });
    }

    // ========== FORM TEXTO CONTADOR ==========
    const textoContador = document.getElementById('comentario');
    const caracterContador = document.getElementById('charCounter');

    //comprobamos que ambos existen
    if (textoContador && caracterContador) {

        //cada vez que el usuario escribe o borra, lo "escucha"
        textoContador.addEventListener('input', (e) => {
            // Calcula la longitud actual del texto escrito
            const longitud = e.target.value.length;
            caracterContador.textContent = longitud;

            // cambia el color del contador según la cantidad de texto:
            //rojo: cerca o sobrepasando el máximo
            if (longitud > 250) {
                caracterContador.style.color = 'red';

            // naranja: aproximándose al límite    
            } else if (longitud > 150) {
                caracterContador.style.color = 'orange';
            } else {
            // amarillo: seguro (pocos caracteres)
                caracterContador.style.color = 'yellow';
            }
        });
    }


    // ========== SCROLL ANIMATE ==========

    //configuracion del observador
    const observerOptions = {
        //el 20% del elemento debe ser visiblepara activar la animacion
        threshold: 0.2,
        //in margen adicional
        rootMargin: '0px'
    };

    //creamos un "observador" que detecta la entrada de elementos en la vista
    const observer = new IntersectionObserver((entries) => {

        //recorremos cada elemento observado
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                //añadimos la clase "animate" para activar su animación en CSS
                entry.target.classList.add('animate');
            }
        });
        // Pasamos la configuración definida al observador
    }, observerOptions);

    // Seleccionamos todos los elementos que deben animarse con scroll
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    // Indicamos al observador que vigile cada uno de esos elementos
    animateElements.forEach(el => observer.observe(el));

    // ========== HERO VIDEO ==========
    //seleccionamos el video
    const heroVideo = document.getElementById('heroVideo');
    
    if (heroVideo) {
        // Escuchamos el evento de scroll en la ventana
        window.addEventListener('scroll', function() {
            //obtenemos la cantidad actual de desplazamiento vertical
            const scrollPosition = window.scrollY;

            //calculamos la altura visible del navegador
            const windowHeight = window.innerHeight;

            //calculamos la opacidad del video en función del scroll:
            const opacity = Math.max(0, 1 - (scrollPosition / windowHeight));
            
            //aplicamos la opacidad al video
            heroVideo.style.opacity = opacity;
            
            //cuando el video está completamente invisible opacity 0, ocultamos tmb con none para mejorar rendimiento
            if (opacity === 0) {
                heroVideo.style.display = 'none';
            } else {
                heroVideo.style.display = 'block';
            }
        });
    }

    // ========== FORM ==========
    //seleccionamos el formulario por su ID
    const form = document.getElementById('contactForm');
    //comprobamos que existe
    if (form) {
        //escuchamos el elemento submit cuando el usuario hace click
        //evita el comportamiento por defecto del formulario de recargar la pag o enviar datos
        form.addEventListener('submit', (e) => {
            e.preventDefault();  
            alert("¡Gracias por registrarte en GreenNoise!")  
        });
    }

}); // FIN del DOMContentLoaded