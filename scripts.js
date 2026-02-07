/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 


//Geolocalizacion
const contenedorTarjeta = document.getElementById('services')

if('geolocation in navigator'){
    navigator.geolocation.watchPosition( posicion => {
        const {latitude, longitude} = posicion.coords;
        verClima(latitude, longitude);
    },() => {
        console.log('Permiso no aceptado');
    })
}else{
    alert('Tu navegador no soporta la geolocalizacion');
}

async function verClima(latitude,longitude){
    try{
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7769a3079a59e38d77de96e95414cec9&unit=&lang=es`)
        const datos = await respuesta.json();

        const {icon, description} = datos.weather[0];
        const temperatura = datos.main.temp - 273.15;

        const{temp_min, temp_max} = datos.main;
        const pais = datos.sys.country;

        //Mostrar la tarjeta
        contenedorTarjeta.classList.add('services');
        //Agregar informacion a la tarjeta
        document.getElementById('temperatura').textContent = Math.floor(temperatura) + '°C';
        document.getElementById('icono').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById('descripcion').textContent = description;
        document.getElementById('pais').textContent = pais;

    }catch (error){
        console.log('Error al obtener el clima: ',error);
    }
}
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//Streaming
const miLlave = 'AIzaSyBYhzlhH9LMSWa02xlJewqrCO9a2aMeM0s'; 
const playlistId = 'PLvHSrTU-nSltrzOaHnHjEJWzvPxtHsc2M';
const maxResultados = 8;

async function cargarRutinas() {
    const contenedor = document.getElementById('contenedor-rutinas');
    
    //aqui ya nadamas llamamos las variables de arriba 
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResultados}&playlistId=${playlistId}&key=${miLlave}`;

    console.log("Intentando conectar con YouTube...");

    try {
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        contenedor.innerHTML = "";

        datos.items.forEach(video => {
            const v = video.snippet;
            const videoId = v.resourceId.videoId; 
            const titulo = v.title;
            const miniatura = v.thumbnails.high.url;

            const tarjetaHTML = `
                <div class="card-video" onclick="abrirModal('${videoId}')">
                    <div class="thumb-container">
                        <img src="${miniatura}" alt="${titulo}">
                    </div>
                    <div class="info-video">
                        <h4>${titulo}</h4>
                        <span class="btn-entrenar">Ver Entrenamiento </span>
                    </div>
                </div>
            `;
            
            contenedor.innerHTML += tarjetaHTML;
        });

        console.log("¡Videos cargados con éxito!");

    } catch (error) {
        console.error("Hermanito, hubo un fallo:", error);
        contenedor.innerHTML = `<p style="color:white;">Error al cargar videos. Revisa la consola.</p>`;
    }
}

// Esto es para la pantalla flotante
function abrirModal(idDelVideo) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('player');
    
    
    iframe.src = `https://www.youtube.com/embed/${idDelVideo}?autoplay=1`;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}
//Cerramos la pantalla
function cerrarModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('player');
    iframe.src = "";
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) { cerrarModal(); }
}

document.addEventListener('DOMContentLoaded', cargarRutinas);



// 1. Diccionario de logos Para los equipos
const nbaLogos = {
    

    "Atlanta Hawks": "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg",
    "Boston Celtics": "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    "Brooklyn Nets": "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    "Charlotte Hornets": "https://loodibee.com/wp-content/uploads/nba-charlotte-hornets-logo.png",
    "Chicago Bulls": "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    "Cleveland Cavaliers": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cleveland_Cavaliers_logo.svg",
    "Dallas Mavericks": "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg",
    "Denver Nuggets": "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg",
    "Detroit Pistons": "https://loodibee.com/wp-content/uploads/nba-detroit-pistons-logo.png",
    "Golden State Warriors": "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    "Houston Rockets": "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    "Indiana Pacers": "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg",
    "LA Clippers": "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_(2024)_logo.svg",
    "Los Angeles Lakers": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    "Memphis Grizzlies": "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg",
    "Miami Heat": "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
    "Milwaukee Bucks": "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg",
    "Minnesota Timberwolves": "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg",
    "New Orleans Pelicans": "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg",
    "New York Knicks": "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg",
    "Oklahoma City Thunder": "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg",
    "Orlando Magic": "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg",
    "Philadelphia 76ers": "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg",
    "Phoenix Suns": "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg",
    "Portland Trail Blazers": "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg",
    "Sacramento Kings": "https://upload.wikimedia.org/wikipedia/en/b/be/Sacramento_Kings_logo.svg",
    "San Antonio Spurs": "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg",
    "Toronto Raptors": "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
    "Utah Jazz": "https://upload.wikimedia.org/wikipedia/en/c/c2/Utah_Jazz_logo_(2022).svg",
    "Washington Wizards": "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg"
};
//Aqui empieza la API de online
async function cargarEstadisticasNBA() {
    const contenedor = document.getElementById('tabla-nba');
    if (!contenedor) return;

    // --- REEMPLAZA ESTO CON TU LLAVE REAL ---
    const API_KEY = 'eca09594-93e6-4f69-909f-40d109cceb0b'; 

    const options = {
        method: 'GET',
        headers: {
            'Authorization': API_KEY
        }
    };

    try {
        const response = await fetch('https://api.balldontlie.io/v1/teams', options);
        const result = await response.json();
        
        console.log("Datos cargados de Ball Don't Lie:", result);

        contenedor.innerHTML = ''; 

        // Mostramos solo los primeros 9 equipos para que se vea bien en la rejilla
        result.data.slice(0, 9).forEach(equipo => {
            const logoUrl = nbaLogos[equipo.full_name] || "https://cdn-icons-png.flaticon.com/512/889/889442.png";

contenedor.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card bg-dark text-white h-100 shadow-lg border-0" style="border-radius: 20px; transition: transform 0.3s;">
            <div class="card-header border-0 bg-transparent pt-4 text-center">
                <img src="${logoUrl}" alt="${equipo.full_name}" style="width: 80px; height: 80px; object-fit: contain;">
            </div>
            <div class="card-body text-center">
                <h4 class="fw-bold mb-1">${equipo.full_name}</h4>
                <p class="text-primary small mb-2">${equipo.conference} Conference</p>
                <div class="d-flex justify-content-center gap-2 mb-3">
                    <span class="badge bg-secondary">${equipo.abbreviation}</span>
                    <span class="badge bg-outline-info border border-info text-info">${equipo.division}</span>
                </div>
                
                <div class="d-grid gap-2 px-3">
                    <button class="btn btn-primary btn-sm" 
                            style="border-radius: 20px; font-weight: bold;" 
                            onclick="notificarPartido('${equipo.full_name}')">
                        <i class="fab fa-telegram-plane"></i> Notificarme
                    </button>
                </div>
            </div>
            <div class="card-footer border-0 bg-transparent pb-4 text-center">
                <p class="text-muted small mb-0"><i class="fas fa-map-marker-alt"></i> ${equipo.city}</p>
            </div>
        </div>
    </div>
`;
        });

    } catch (error) {
        console.error("Error en Ball Don't Lie:", error);
        contenedor.innerHTML = '<p class="text-white text-center">Error al conectar con la API de NBA.</p>';
    }
}



// Aqui la API de redes sociales

async function notificarPartido(nombreEquipo) {
    const TELEGRAM_TOKEN = '8009895680:AAFJV8fGEcfYJpdBfSPTMs77bZNk6fyXEQE';
    

    let userChatId = document.getElementById('user-telegram-id')?.value;

    if (!userChatId) {
        userChatId = prompt("Para recibir la notificación, ingresa tu Telegram ID (Pídeselo a @userinfobot en Telegram):");
    }

    if (!userChatId) return; // Si cancela no hacemos nada

    const mensaje = encodeURIComponent(`¡Suscripción activa! Te avisaremos el próximo partido de los ${nombreEquipo}.`);
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${userChatId}&text=${mensaje}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (result.ok) {
            alert(`¡Mensaje enviado a tu Telegram (ID: ${userChatId})!`);
        } else {
            alert("Error: Asegúrate de haber iniciado chat con el bot primero.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
//Esto es para que .js no se adelante al .html
window.onload =()=>{
    cargarEstadisticasNBA();
};