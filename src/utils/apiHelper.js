// Fungsi universal untuk hantar data (POST/PUT/DELETE) - Menyokong JSON & FormData
export async function apiRequest(endpoint, data = {}, token = null) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;


  const headers = {};

 
  // Jika data ialah objek biasa,set application/json macam biasa.
  if (!(data instanceof FormData)) { //jika bukan formdata maka header akan jadi itu,jika bukan maka tiada header itu
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;//jika ada token makan akan header itu ada
  }

  
  const bodyData = data instanceof FormData ? data : JSON.stringify(data); //jika data adalah formdata maa terus hantar data jika bukan akan hantar json

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
