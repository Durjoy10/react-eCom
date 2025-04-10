import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import ZoomImage from '../components/ZoomImage';

export const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);


  useEffect(()=>{
    if(product){
      setSelectedImage(product?.image_url);
    }    
  },[product])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    // <div style={{ width: '600px', height: '400px', margin: '20px auto' }}>
    <div className="md:m-5">
     
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex md:flex-row flex-col gap-10 container">
        {/* Product Image */}
        {/* <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-center object-cover"
          />
        </div> */}

        <div className='flex items-center md:items-start md:flex-row flex-col gap-5'>
        <div className="nav-for-slider order-2 md:order-1">
                  <div className="flex justify-center md:gap-3 gap-4 xl:flex-col">
                    <div onClick={()=>setSelectedImage('https://pagedone.io/asset/uploads/1713943683.png')} className="swiper-slide thumbs-slide lg:!w-[126px] md:!h-[90px] !w-[65px] !h-[60px]">
                      <img src="https://pagedone.io/asset/uploads/1713943683.png" alt="Gallery image" className="gallery-image mx-auto w-full cursor-pointer h-full rounded-md md:rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-indigo-600 object-cover"/>
                    </div>
                    <div onClick={()=>setSelectedImage('https://pagedone.io/asset/uploads/1713943709.png')} className="swiper-slide thumbs-slide lg:!w-[126px] md:!h-[90px] !w-[65px] !h-[60px]">
                      <img src="https://pagedone.io/asset/uploads/1713943709.png" alt="Gallery image" className="gallery-image mx-auto w-full cursor-pointer h-full rounded-md md:rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-indigo-600 object-cover"/>
                    </div>
                    <div onClick={()=>setSelectedImage('https://pagedone.io/asset/uploads/1713943720.png')} className="swiper-slide thumbs-slide lg:!w-[126px] md:!h-[90px] !w-[65px] !h-[60px]" >
                      <img src="https://pagedone.io/asset/uploads/1713943720.png" alt="Gallery image" className="gallery-image mx-auto w-full cursor-pointer h-full rounded-md md:rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-indigo-600 object-cover"/>
                    </div>
                    <div onClick={()=>setSelectedImage('https://pagedone.io/asset/uploads/1713943731.png')} className="swiper-slide thumbs-slide lg:!w-[126px] md:!h-[90px] !w-[65px] !h-[60px]">
                      <img src="https://pagedone.io/asset/uploads/1713943731.png" alt="Gallery image" className="gallery-image mx-auto w-full cursor-pointer h-full rounded-md md:rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-indigo-600 object-cover"/>
                    </div>                   
                  </div>
        </div>

        <ZoomImage       
      src={selectedImage}
      alt="Interactive zoom example"
      zoomLevel={3}
      className="custom-zoom  rounded-lg overflow-hidden md:order-2"
      />
      
        </div>
        <div className="w-full md:w-1/2 px-4">
        <h2 className="md:text-start text-center text-3xl font-bold mb-2">{product.name}</h2>
        <p className="md:text-start text-center  text-gray-600 mb-4">SKU: WH1000XM4</p>
        <div className="mb-4 md:text-start text-center ">
          <span className="text-2xl font-bold mr-2">${product?.price?.toFixed(2)}</span>
          <span className="text-gray-500 line-through">${product?.price?.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-center md:justify-start mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="size-6 text-yellow-500">
            <path fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd" />
          </svg>
          <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
        </div>
        <p className="text-gray-700 mb-6 text-justify">Experience premium sound quality and industry-leading noise cancellation
          with
          these wireless headphones. Perfect for music lovers and frequent travelers.</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Color:</h3>
          <div className="flex space-x-2">
            <button
                            className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
            <button
                            className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
            <button
                            className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" value="1"
                        className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
                        className="bg-indigo-600 flex gap-2 text-nowrap items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </button>
          <button
                        className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        Wishlist
                    </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Industry-leading noise cancellation</li>
            <li>30-hour battery life</li>
            <li>Touch sensor controls</li>
            <li>Speak-to-chat technology</li>
          </ul>
        </div>
      </div>


        {/* Product Info
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700">{product.description}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;