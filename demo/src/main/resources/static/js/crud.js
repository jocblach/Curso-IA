const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        asunto: document.getElementById('asunto').value,
        comentario: document.getElementById('comentario').value
    };

    const res = await fetch('http://localhost:8080/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert('Comentario enviado correctamente');
        form.reset();
    } else {
        const errText = await res.text();
        alert('Error al enviar el comentario: ' + errText);
    }
});

