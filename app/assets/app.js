const app = new (function () {
    this.navegacion = document.getElementById('navegacion');

    this.abrirMenu = () => {
        this.navegacion.classList.toggle('hidden');
    }
});
