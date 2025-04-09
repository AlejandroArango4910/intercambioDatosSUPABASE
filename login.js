const SUPABASE_URL = 'https://xwvexjaunujjhuhddlpb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dmV4amF1bnVqamh1aGRkbHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMTkyMzksImV4cCI6MjA1ODY5NTIzOX0.xLma_qILItRihs4VwE55-6CA8Db8zdkFZXrNf04AOt0';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // Buscar usuario por email
        const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al buscar usuario');

        const users = await response.json();

        if (users.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'No user found with that email.'
            });
        }

        const user = users[0];

        const match = dcodeIO.bcrypt.compareSync(password, user.clave_encriptada);


        if (!match) {
            return Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Incorrect password.'
            });
        }

        // Guardar sesión (simple ejemplo)
        localStorage.setItem('loggedUser', JSON.stringify({
            id: user.id_usuario,
            name: user.nombre_usuario,
            email: user.email
        }));

        // Redirigir al dashboard
        window.location.href = 'indexArturo.html';

    } catch (error) {
        console.error('Login error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'Something went wrong. Please try again.'
        });
    }
});
