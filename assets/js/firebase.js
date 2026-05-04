"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyBcuDoChegnRreOvK6uBxLayV8dlBLtwsE",

    authDomain: "bocadomagico-30a9f.firebaseapp.com",

    projectId: "bocadomagico-30a9f",

    storageBucket: "bocadomagico-30a9f.firebasestorage.app",

    messagingSenderId: "346071697903",

    appId: "1:346071697903:web:f7473f1cefecdacefc4e1a",

    measurementId: "G-7GFCRJLV54"

};


const aplicacion = initializeApp(configuracionFirebase);
const autenticacion = getAuth(aplicacion);


document.addEventListener('DOMContentLoaded', () => {
    const formularioAcceso = document.getElementById('formularioLogin');
    const campoUsuario = document.getElementById('usuario');
    const campoPassword = document.getElementById('password');

    if (formularioAcceso) {
        formularioAcceso.addEventListener('submit', async (evento) => {
            evento.preventDefault();

            const errorPrevio = formularioAcceso.querySelector(".mensaje-error");
            if (errorPrevio) errorPrevio.remove();

            const correo = campoUsuario.value.trim();
            const contrasena = campoPassword.value.trim();

            try {
                const credencialUsuario = await signInWithEmailAndPassword(autenticacion, correo, contrasena);
                console.log("Usuario logueado:", credencialUsuario.user.email);

                const feedbackExito = document.createElement("p");
                feedbackExito.classList.add("mensaje-exito");
                feedbackExito.textContent = "¡Acceso concedido! Redirigiendo...";
                formularioAcceso.append(feedbackExito);

                setTimeout(() => {
                    window.location.href = "bienvenida.html";
                }, 1000);

            } catch (errorObtenido) {
                const mensajeError = document.createElement("p");
                mensajeError.classList.add("mensaje-error");

                if (errorObtenido.code === 'auth/invalid-credential') {
                    mensajeError.textContent = "⚠️ Usuario o contraseña incorrectos";
                } else {
                    mensajeError.textContent = "⚠️ Ocurrió un error al conectar. Inténtalo de nuevo.";
                }

                formularioAcceso.append(mensajeError);

                setTimeout(() => {
                    if (mensajeError) mensajeError.remove();
                }, 4000);

                campoPassword.value = "";
                campoPassword.focus();
            }
        });
    }
});