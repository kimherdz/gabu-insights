import React, { useState } from 'react';

const Social = () => {
  // Estado para las publicaciones del foro
  const [posts, setPosts] = useState([
    { id: 1, user: 'Usuario1', content: '¡Hola! ¿Cómo están los niños hoy?' },
    { id: 2, user: 'Usuario2', content: 'Hoy tuvimos una gran sesión de juegos.' },
  ]);

  // Estado para el nuevo contenido del post
  const [newPost, setNewPost] = useState('');

  // Función para agregar una nueva publicación
  const handleAddPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const newPostData = {
        id: posts.length + 1,
        user: 'Usuario' + (posts.length + 1),
        content: newPost,
      };
      setPosts([...posts, newPostData]);
      setNewPost(''); // Limpiar el campo
    }
  };

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Foro Gabu</h1>

      <div className="forum-container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2>Publicaciones</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <strong>{post.user}:</strong> {post.content}
            </li>
          ))}
        </ul>

        <h2>Agregar Publicación</h2>
        <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            rows="4"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px' }}
          />
          <button type="submit" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#4715e2', color: 'white', border: 'none', cursor: 'pointer' }}>
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Social;
