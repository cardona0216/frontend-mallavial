// // utils/fetchSegmento.ts

// import { Segmento } from "@/pages/types";

// const API_URL = 'https://tu-api.com/segmentos'; // Reemplaza esto con la URL de tu API

// // Función para obtener un segmento por su ID
// export const fetchSegmento = async (id: string) => {
//   const response = await fetch(`${API_URL}/${id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch segmento');
//   }
//   const data = await response.json();
//   return data;
// };

// // Función para actualizar un segmento
// export const updateSegmento = async (id: string, segmento: Segmento) => {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(segmento),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update segmento');
//   }
//   const data = await response.json();
//   return data;
// };
