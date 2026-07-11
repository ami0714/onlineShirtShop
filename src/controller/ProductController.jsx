import { useState, useEffect } from 'react';
import { productsKatalog,products, productVariants } from '../dummyData/dummyProduct';
import {apiRequest} from '../utils/apiHelper'


export function useProductKatalog() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setProductData(productsKatalog);
  }, []);

  return { productData };
}


export function useProductHomeUser() {
  const [productDataHome, setProductDataHome] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Panggil fail PHP untuk dapatkan senarai produk halaman utama
        const response = await apiRequest('getProductsHomeApi.php');
        
        // Semak status respons mengikut format JSON standard kita
        if (response.status === 'success') {
          setProductDataHome(response.data); // PHP akan pulangkan array produk dalam key 'data'
        } else {
          setError(response.message || 'Gagal mengambil data produk');
        }
      } catch (err) {
        console.error("Ralat fetching produk homepage:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []); // Kosongkan dependency supaya dia cuma 'run' sekali sahaja masa homepage dibuka

  return { 
    productDataHome, 
    loading, 
    error 
  };
}


export function useGetDetailproduct(idProduct) {
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      // Jika tiada idProduct hantar, jangan membazir buat fetch
      if (!idProduct) return;

      try {
        setLoading(true);
        setError(null);

        // Hantar method POST bersama body membawa idProduct
        const response = await apiRequest('getProductDetailApi.php', { idProduct: Number(idProduct) });

        if (response.status === 'success') {
          // Data yang dipulangkan oleh PHP nanti dah siap pecah mengikut struktur ini
          setProductData(response.productInfo);
          setSize(response.sizeList);
          setColor(response.colorList);
        } else {
          setError(response.message || 'Gagal memuatkan butiran produk');
        }
      } catch (err) {
        console.error("Gagal mendapatkan data detail produk:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [idProduct]);

  return {
    productData,
    size,
    color,
    loading,
    error
  };
}






