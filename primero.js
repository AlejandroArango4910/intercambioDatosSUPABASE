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
    const users = await getAllUserData();
    if (users) {
        displayUsers(users);
    }
};
