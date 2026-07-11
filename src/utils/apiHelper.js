// Fungsi universal untuk hantar data (POST/PUT/DELETE) - Menyokong JSON & FormData
export async function apiRequest(endpoint, data = {}, token = null) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const headers = {};

 
  headers['ngrok-skip-browser-warning'] = '69420';

  // Jika data ialah objek biasa, set application/json macam biasa.
  if (!(data instanceof FormData)) { 
    // Jika bukan formdata maka header akan jadi itu, jika bukan maka tiada header itu
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    // Jika ada token maka akan header itu ada
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Jika data adalah formdata maka terus hantar data, jika bukan akan hantar json
  const bodyData = data instanceof FormData ? data : JSON.stringify(data); 

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: headers,
    body: bodyData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'ralat berlaku');
  }

  return await response.json();
}
