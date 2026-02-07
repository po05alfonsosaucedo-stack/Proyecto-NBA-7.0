//Aqui solo esta la API de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, updateDoc, onSnapshot, increment, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9Pi4SRbix_coaUHs-sAaLdm22nVIf1V4",
  authDomain: "paginanbavotosmvp.firebaseapp.com",
  projectId: "paginanbavotosmvp",
  storageBucket: "paginanbavotosmvp.firebasestorage.app",
  messagingSenderId: "68128950419",
  appId: "1:68128950419:web:703f78ca705865ddf5e566"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const jugadores = ['Anthony Edwards', 'Luka Doncic', 'Nikola Jokic', 'Victor Wembanyama', 'Stephen Curry'];
let votosLocales = {};

// Hacemos la función 'votar' global para que el HTML la encuentre
window.votar = async (idJugador) => {
    const jugadorRef = doc(db, "votacion_mvp", idJugador);
    try {
        await updateDoc(jugadorRef, { votos: increment(1) });
    } catch (e) {
        await setDoc(jugadorRef, { votos: 1 });
    }
};

function actualizarBarras() {
    const totalGlobal = Object.values(votosLocales).reduce((a, b) => a + b, 0);
    jugadores.forEach(nombre => {
        const votos = votosLocales[nombre] || 0;
        const porcentaje = totalGlobal > 0 ? (votos / totalGlobal) * 100 : 0;
        const idLimpio = nombre.replace(/\s+/g, '-');

        const spanVotos = document.getElementById(`votos-${idLimpio}`);
        const divBarra = document.getElementById(`barra-${idLimpio}`);
        
        if(spanVotos) spanVotos.innerText = votos;
        if(divBarra) divBarra.style.width = `${porcentaje}%`;
    });
}

jugadores.forEach(nombre => {
    onSnapshot(doc(db, "votacion_mvp", nombre), (snapshot) => {
        if (snapshot.exists()) {
            votosLocales[nombre] = snapshot.data().votos;
            actualizarBarras();
        }
    });
});