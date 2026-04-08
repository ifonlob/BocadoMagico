"use strict";

/**
 * Gestiona el sistema de autenticación para el panel de administración.
 * Crea dinámicamente mensajes de error que desaparecen tras 4 segundos.
 */
const inicializarAutenticacion = () => {
    const formulario = document.querySelector("#formularioLogin");
    const campoUsuario = document.querySelector("#usuario");
    const campoPassword = document.querySelector("#password");

    if (!formulario || !campoUsuario || !campoPassword) return;

    const CREDENCIALES_VALIDAS = {
        usuario: "admin",
        pass: "admin1234"
    };

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const errorPrevio = formulario.querySelector(".mensaje-error");
        if (errorPrevio) errorPrevio.remove();

        const userValue = campoUsuario.value.trim();
        const passValue = campoPassword.value.trim();

        if (userValue === CREDENCIALES_VALIDAS.usuario && passValue === CREDENCIALES_VALIDAS.pass) {
            const feedbackExito = document.createElement("p");
            feedbackExito.classList.add("mensaje-exito");
            feedbackExito.textContent = "¡Acceso concedido! Redirigiendo...";
            formulario.append(feedbackExito);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            const mensajeError = document.createElement("p");
            mensajeError.classList.add("mensaje-error");
            mensajeError.textContent = "⚠️ Usuario o contraseña incorrectos";

            formulario.append(mensajeError);

            setTimeout(() => {
                if (mensajeError) mensajeError.remove();
            }, 4000);

            campoPassword.value = "";
            campoPassword.focus();
        }
    });
};

inicializarAutenticacion()