// app.js

// Función para mostrar los usuarios en el DOM
function displayUsers(users) {
    const usersContainer = document.getElementById('users-container');
    
    // Limpiar el contenedor de usuarios antes de agregar nuevos
    usersContainer.innerHTML = '';
    
    // Crear una tarjeta por cada usuario
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        
        const userName = user.nombre ? `<h3>${user.nombre}</h3>` : `<h3>Sin nombre</h3>`;
        
        let userInfo = '';
        for (const [key, value] of Object.entries(user)) {
            if (key !== 'nombre') {
                userInfo += `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
            }
        }

        userCard.innerHTML = userName + userInfo;
        usersContainer.appendChild(userCard);
    });
}

// Cargar los usuarios cuando la página esté lista
window.onload = async () => {
    // const users = await getAllUserData();
    // if (users) {
    //     displayUsers(users);
    // }
};

// Función para insertar un usuario en Supabase
async function insertarUsuarioEnSupabase(usuario) {
    const SUPABASE_URL = 'https://xwvexjaunujjhuhddlpb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dmV4amF1bnVqamh1aGRkbHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMTkyMzksImV4cCI6MjA1ODY5NTIzOX0.xLma_qILItRihs4VwE55-6CA8Db8zdkFZXrNf04AOt0';


    const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation' // Devuelve el usuario recién creado
        },
        body: JSON.stringify([usuario]) // El array es necesario para que Supabase lo interprete correctamente
    });

    if (!response.ok) {
        throw new Error(`Error al insertar el usuario en Supabase: ${response.statusText}`);
    }

    const datosInsertados = await response.json();
    return datosInsertados[0]; // Retorna el primer usuario insertado
}

// Función para mostrar el nuevo usuario en el modal
function mostrarModal(usuario) {
    const modal = document.getElementById("modal");
    const userInfo = document.getElementById("user-info");

    userInfo.innerHTML = `
        <p><strong>Identificación:</strong> ${usuario.identificacion}</p>
        <p><strong>Nombre de Usuario:</strong> ${usuario.nombre_usuario}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Tipo de Usuario:</strong> ${usuario.usuario_superadministrador ? 'Super Admin' :
        usuario.usuario_administrador ? 'Administrador' : 'Usuario Normal'}</p>
    `;

    modal.style.display = "block";

    // Cerrar el modal cuando se haga clic en la X
    const closeButton = document.querySelector(".close");
    closeButton.onclick = function() {
        modal.style.display = "none";
    }
}

// Manejo del formulario
document.getElementById('user-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Recoger los datos del formulario
    const usuario = {
        identificacion: document.getElementById('identificacion').value,
        nombre_usuario: document.getElementById('nombre_usuario').value,
        clave_encriptada: document.getElementById('clave_encriptada').value,
        usuario_normal: parseInt(document.getElementById('usuario_normal').value),
        usuario_administrador: parseInt(document.getElementById('usuario_administrador').value),
        usuario_superadministrador: parseInt(document.getElementById('usuario_superadministrador').value),
        email: document.getElementById('email').value
    };

    try {
        const usuarioInsertado = await insertarUsuarioEnSupabase(usuario);
        mostrarModal(usuarioInsertado); // Mostrar el modal con los datos del usuario
    } catch (error) {
        console.error('Error al insertar el usuario:', error);
    }
});
