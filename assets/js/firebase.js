"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const configuracionFirebase = {
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

const cerrarSesion = async () => {
    try {
        await signOut(autenticacion);
        localStorage.removeItem("usuarioSesion");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};

const gestionarNavegacion = () => {
    const contenedorNav = document.querySelector(".cabecera__navegacion");
    const sesionActiva = localStorage.getItem("usuarioSesion");

    const esPaginaAuth = document.getElementById('formularioLogin') || document.getElementById('formularioRegistro');

    if (contenedorNav && sesionActiva && !esPaginaAuth) {
        contenedorNav.innerHTML = `
            <ul class="navegacion__lista">
                <li class="navegacion__identificacion">
                    <img class="navegacion__usuario" src="./assets/imgs/usuario.png" alt="Usuario">
                    <a href="#" class="navegacion__enlace" id="btnCerrarSesion">Cerrar Sesión</a>
                </li>
            </ul>
        `;

        const btnCerrar = document.getElementById("btnCerrarSesion");
        if (btnCerrar) {
            btnCerrar.addEventListener("click", (e) => {
                e.preventDefault();
                cerrarSesion();
            });
        }
    }
};

const servicioLogin = async (formulario, correo, contrasena) => {
    try {
        const credencial = await signInWithEmailAndPassword(autenticacion, correo, contrasena);
        localStorage.setItem("usuarioSesion", credencial.user.email);
        window.location.href = "bienvenida-login.html";
    } catch (error) {
        alert("Usuario o contraseña incorrectos");
    }
};

const servicioRegistro = async (formulario, correo, contrasena) => {
    try {
        const credencial = await createUserWithEmailAndPassword(autenticacion, correo, contrasena);
        localStorage.setItem("usuarioSesion", credencial.user.email);
        window.location.href = "bienvenida-registro.html";
    } catch (error) {
        alert("Error: El correo ya existe o los datos son inválidos");
    }
};


const manejarRedireccionBienvenida = () => {
    const paginaActual = document.body.dataset.pagina;
    if (paginaActual === "bienvenida-registro" || paginaActual === "bienvenida-login") {
        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    gestionarNavegacion();
    manejarRedireccionBienvenida();

    const formLogin = document.getElementById('formularioLogin');
    const formRegistro = document.getElementById('formularioRegistro');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const correo = document.getElementById('usuario').value.trim();
            const contrasena = document.getElementById('password').value.trim();
            servicioLogin(formLogin, correo, contrasena);
        });
    }

    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            const correo = document.getElementById('registroEmail').value.trim();
            const contrasena = document.getElementById('registroPassword').value.trim();
            servicioRegistro(formRegistro, correo, contrasena);
        });
    }
});