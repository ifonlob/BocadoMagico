"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// --- CONFIGURACIÓN DE FIREBASE ---
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



/**
 * Muestra mensajes de feedback (éxito o error) en el formulario
 */
const mostrarFeedback = (formulario, mensaje, clase) => {
    const errorPrevio = formulario.querySelector(".mensaje-error, .mensaje-exito");
    if (errorPrevio) errorPrevio.remove();

    const parrafo = document.createElement("p");
    parrafo.classList.add(clase);
    parrafo.textContent = mensaje;
    formulario.append(parrafo);

    setTimeout(() => parrafo.remove(), 4000);
};

/**
 * Lógica para iniciar sesión
 */
const servicioLogin = async (formulario, correo, contrasena) => {
    try {
        await signInWithEmailAndPassword(autenticacion, correo, contrasena);
        mostrarFeedback(formulario, "¡Acceso concedido! Redirigiendo...", "mensaje-exito");
        setTimeout(() => window.location.href = "bienvenida.html", 1000);
    } catch (error) {
        if (error.code === 'auth/invalid-credential') {
            mostrarFeedback(formulario, "Usuario o contraseña incorrectos", "mensaje-error");
        } else {
            mostrarFeedback(formulario, "Error al conectar. Inténtalo de nuevo.", "mensaje-error");
        }
        formulario.querySelector("#password").value = "";
    }
};

/**
 * Lógica para registrar un nuevo usuario
 */
const servicioRegistro = async (formulario, correo, contrasena) => {
    try {
        await createUserWithEmailAndPassword(autenticacion, correo, contrasena);
        mostrarFeedback(formulario, "¡Cuenta creada con éxito! Redirigiendo...", "mensaje-exito");
        setTimeout(() => window.location.href = "bienvenida.html", 1500);
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            mostrarFeedback(formulario, "El correo ya está registrado.", "mensaje-error");
        } else if (error.code === 'auth/weak-password') {
            mostrarFeedback(formulario, "La contraseña es muy débil.", "mensaje-error");
        } else {
            mostrarFeedback(formulario, "Error en el registro. Inténtalo de nuevo.", "mensaje-error");
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const formularioLogin = document.getElementById('formularioLogin');
    const formularioRegistro = document.getElementById('formularioRegistro');

    // Configuración para la página de Login
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const correo = document.getElementById('usuario').value.trim();
            const contrasena = document.getElementById('password').value.trim();
            servicioLogin(formularioLogin, correo, contrasena);
        });
    }

    // Configuración para la página de Registro
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', (evento) => {
            evento.preventDefault();
            const correo = document.getElementById('registroEmail').value.trim();
            const contrasena = document.getElementById('registroPassword').value.trim();
            servicioRegistro(formularioRegistro, correo, contrasena);
        });
    }
});