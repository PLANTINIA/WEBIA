import React, { useState } from 'react';

export default function App() {
  const [description, setDescription] = useState('');
  const [sketchUrl, setSketchUrl] = useState('');
  const [storytelling, setStorytelling] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const generateStorytelling = (desc) => {
    return `Este plato representa una interpretación creativa de: "${desc}". Se busca evocar emociones a través del contraste de colores, texturas y disposición artística de los elementos.`;
  };

  const handleGenerate = () => {
    setLoading(true);
    const generatedStory = generateStorytelling(description);
    setTimeout(() => {
      setSketchUrl('https://via.placeholder.com/400x300.png?text=Boceto+Generado'); // imagen de ejemplo
      setStorytelling(generatedStory);
      setLoading(false);
    }, 2000);
  };

  const handleSave = () => {
    const newProject = {
      description,
      sketchUrl,
      storytelling,
      id: Date.now(),
    };
    setProjects([newProject, ...projects]);
  };

  return (
    <main className="min-h-screen bg-white p-6 flex flex-col items-center space-y-10">
      <div className="w-full max-w-md shadow-xl p-6 rounded-xl border">
        <h1 className="text-2xl font-bold text-center">Plating AI</h1>
        <p className="text-center text-gray-600 mb-4">
          Describe tu idea de emplatado y genera un boceto artístico con narrativa culinaria.
        </p>
        <input
          type="text"
          placeholder="Ej: Croqueta con tierra de setas y brotes verdes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? 'Generando...' : 'Generar boceto'}
        </button>
      </div>

      {sketchUrl && (
        <div className="w-full max-w-md text-center space-y-4">
          <h2 className="text-xl font-semibold">Boceto generado</h2>
          <img src={sketchUrl} alt="Dish Sketch" className="rounded-lg shadow-md" />
          <div className="bg-gray-100 p-4 rounded-lg text-left text-sm">
            <p className="font-semibold">Storytelling del plato:</p>
            <p>{storytelling}</p>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
              Guardar proyecto
            </button>
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="w-full max-w-md mt-10 space-y-4">
          <h3 className="text-lg font-semibold">Historial de proyectos</h3>
          {projects.map((project) => (
            <div key={project.id} className="border rounded p-4 shadow">
              <img src={project.sketchUrl} alt="Sketch" className="rounded shadow-sm mb-2" />
              <p className="text-sm text-gray-700">{project.description}</p>
              <p className="text-xs text-gray-500 italic">{project.storytelling}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
