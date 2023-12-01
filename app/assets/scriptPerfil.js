const app = new (function () {
    this.boxVisualizar = document.getElementById('box-visualizar');
    this.visualizarImagenPerfil = document.getElementById('visualizar-imagen-perfil');
    this.inputImagenPerfil = document.getElementById('imagen-perfil');

    this.idFuncionario = document.getElementById('id-funcionario');
    this.nombresPerfil = document.getElementById('nombres-perfil');
    this.apellidosPerfil = document.getElementById('apellidos-perfil');
    this.cedulaPerfil = document.getElementById('cedula-perfil');
    this.direccionPerfil = document.getElementById('direccion-perfil');
    this.telefonoPerfil = document.getElementById('telefono-perfil');
    this.emailPerfil = document.getElementById('email-perfil');

    this.vistaPreviaImagenPerfil = () => {
        this.inputImagenPerfil.addEventListener('change', function (e) {
            if (!app.inputImagenPerfil.value) {
                // Si el input esta vacio quitar vista previa
                app.boxVisualizar.classList.add('hidden');
                // vaciar scr=""
                app.visualizarImagenPerfil.src = '';
            } else {
                // sino, muestra la vista previa
                app.boxVisualizar.classList.remove('hidden');
                // Cargar imagen
                var reader = new FileReader();
                reader.onload = function () {
                    var imagen = app.visualizarImagenPerfil;
                    imagen.src = reader.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

    }
    this.actualizarPerfil = () => {
        // Esconder mensaje de error al guardar cada vez
        var msgError = document.getElementById('error-perfil');
        msgError.classList.add('hidden');
        msgError.innerHTML = '';
        // Enviar formulario para la consulta
        var formPerfil = new FormData();
        formPerfil.append('id_funcionario', this.idFuncionario.value);
        formPerfil.append('nombresPerfil', this.nombresPerfil.value);
        formPerfil.append('apellidosPerfil', this.apellidosPerfil.value);
        formPerfil.append('cedulaPerfil', this.cedulaPerfil.value);
        formPerfil.append('direccionPerfil', this.direccionPerfil.value);
        formPerfil.append('telefonoPerfil', this.telefonoPerfil.value);
        formPerfil.append('emailPerfil', this.emailPerfil.value);
        if (this.inputImagenPerfil.files[0]) {
            formPerfil.append('imagenPerfil', this.inputImagenPerfil.files[0]);
        }
        fetch("../controllers/actualizarPerfil.php", { method: "POST", body: formPerfil })
            .then((respuesta) => respuesta.json())
            .then((data) => {
                console.log(data);
                if (data == true) {
                    // Perfil actualizado
                    alert('¡Perfil actualizado con exito!');
                    window.location.href = './perfil.php';
                } else {
                    // Mostrar mensaje de error al guardar
                    msgError.classList.remove('hidden');
                    msgError.innerHTML += `<p class="font-medium rounded-md mb-4 p-4 bg-red-100">${data}</p>`;
                }
            })
            .catch((error) => console.log(error));
    }
});

if (app.inputImagenPerfil) {
    app.vistaPreviaImagenPerfil();
}