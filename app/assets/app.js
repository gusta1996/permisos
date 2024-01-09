const app = new (function () {
    this.notificacionContent = document.getElementById('notificacionContent');
    this.navegacion = document.getElementById('navegacion');

    this.notificacion = (titulo, texto, icono) => {
        // actualiza la variable
        this.notificacionContent = document.getElementById('notificacionContent');
        // crea id de notificacion
        var id_notificacion = this.notificacionContent.childElementCount;
        // escoge icono
        var icono = function () {
            switch (icono) {
                case 'guardar':
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-green-600 bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                            </svg>`;
                case 'actualizar':
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-blue-600 bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>`;
                case 'eliminar':
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-red-600 bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>`;
                default:
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-green-600 bi bi-info-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>`;
            }
        }();
        // crear notificacion (titulo, texto)
        var notificacion = document.createElement('div');
        notificacion.className = "flex items-center justify-between gap-4 w-full p-4 bg-white border border-slate-200 shadow-md rounded-md transform translate-x-full opacity-0";
        notificacion.innerHTML = `
            <div>${icono}</div>
            <div class="flex-1">
            <h3 class="font-semibold">${titulo}</h3>
                <p class="text-slate-500 mt-2">${texto}</p>
            </div>
            <button class="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </button>
        `;
        notificacion.querySelector('button').addEventListener('click', () => this.cerrarNotificacion(notificacion));
        this.notificacionContent.appendChild(notificacion);
        // animacion de apertura
        setTimeout(() => {
            notificacion.classList.remove('translate-x-full', 'opacity-0');
            notificacion.classList.add('ease-in', 'duration-200', 'translate-x-0', 'opacity-100');
        }, 100);
        // cerrar notificacion despues de 10 segundos
        setTimeout(() => {
            if (this.notificacionContent.contains(notificacion)) {
                this.cerrarNotificacion(notificacion);
            }
        }, 10000);
    }
    this.cerrarNotificacion = (notificacion) => {
        // cerrar
        if (notificacion && this.notificacionContent.contains(notificacion)) {
            // animacion
            notificacion.classList.remove('ease-in', 'duration-200', 'translate-x-0', 'opacity-100');
            notificacion.classList.add('ease-out', 'duration-1000', 'translate-x-full', 'opacity-0');
            // esperar 1 segundos para que la animacion termine
            setTimeout(() => {
                notificacion.remove();
            }, 1000);
        }
    }
    this.abrirMenu = () => {
        this.navegacion.classList.toggle('hidden');
    }
});