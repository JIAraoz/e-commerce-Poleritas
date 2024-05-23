import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Footer from '../Footer/Footer';

export default function Home() {
 const [categories, setCategories] = useState([]);

 useEffect(() => {
   async function fetchCategories() {
     try {
       const response = await axios.get(
         'https://e-commerce-grupo03.onrender.com/getCategory'
       );
       setCategories(response.data.result);
     } catch (error) {
       alert(error.message);
     }
   }

   fetchCategories();
 }, []);

 return (
   <div className='home'>
     <div className='home-background'>
       <div className='categories'>
         <div>
           <img className='image' src='../../public/camisetaMasVendida.jpg' alt='Men' />
           <h3>Men</h3>
         </div>
         <div>
           <img className='image' src='../../public/CamisetaDeportivaDeMujer.jpg' alt='Womens' />
           <h3>Womens</h3>
         </div>
         <div>
           <img className='image' src='../../public/Polounisex-2.jpg' alt='Unise' />
           <h3>Unisex</h3>
         </div>
       </div>
       <div className='featured-products'>
         <h2>Featured Products</h2>
         <div className='featured-carousel'>
           {/* componente carrusel para feature products*/}
         </div>
       </div>
       <div className='new-products'>
         <h2>New Products</h2>
         <div className='new-carousel'>
           {/* componente carrusel para new product */}
         </div>
       </div>
     </div>
     <div className='free-shipping'>
       <div className='free-shipping-content'>
         <h2>Free Shipping</h2>
         <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
           aliquip ex ea commodo consequat.
         </p>
       </div>
       <div className='delivery-truck'>
         <div className=''>
           <img className='carrito' src="../../public/gratis.png" alt="" />
           <img className='carrito' src="../../public/carrito.png" alt="" />
         </div>
       </div>
     </div>
     <Footer />
   </div>
 );
}