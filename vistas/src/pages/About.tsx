import React from 'react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">¿Quiénes Somos?</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <img
          src="https://www.almerianoticias.es/wp-content/uploads/2024/10/241031-CEMENTERIOS-2.jpeg"
          alt="Historia del Cementerio"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Historia</h2>
          <p className="text-gray-600 mb-4">
            Fundado en 1890, el Cementerio Parroquial San Agustín ha sido testigo de la historia
            de nuestra comunidad por más de un siglo. Lo que comenzó como un humilde camposanto
            se ha convertido en un lugar de memoria y honor para nuestros seres queridos.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
          <p className="text-gray-600 mb-4">
            Nos dedicamos a preservar la dignidad y la memoria de quienes descansan en nuestro
            cementerio, proporcionando un espacio de paz y reflexión para sus familias. Nuestro
            compromiso es mantener vivo el recuerdo de cada persona que forma parte de nuestra
            historia.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestros Valores</h2>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Respeto por la dignidad humana</li>
            <li>Compromiso con la preservación de la memoria</li>
            <li>Excelencia en el servicio a las familias</li>
            <li>Innovación en la gestión cementerial</li>
          </ul>
        </div>
      </div>
    </div>
  );
}