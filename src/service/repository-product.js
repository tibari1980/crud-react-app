import axios from "axios";
import { createContext, useState } from "react";

export const AppContext=createContext();

const baseUrl="http://localhost:9800";

export const findAllProducts=(keyword="",page=1,size=8 )=>{
    console.log("Inside methode findAllProducts in Respository-product");
    return  axios.get(baseUrl+`/products?description_like=${keyword}&_page=${page}&_limit=${size}`);
}

export const deleteProduct=(id)=>{
    console.log('Inside method deleteProduct in repository-product '+id);
   return axios.delete(baseUrl+`/products/${id}`);
}

export const findProductById=(id)=>{
    console.log('Inside method findProductById in repository-product'+id);
    return axios.get(baseUrl+`/products/${id}`);
}

export const saveProduct=(product)=>{
    console.log("Inside methode saveProduct in Repository-product"+JSON.stringify(product));
    return axios.post(baseUrl+`/products`,product);
}

export const checkProduct=(product)=>{
    console.log(`Inside methode checkProduct in repository-product : ${JSON.stringify(product)}`);
    return axios.patch(baseUrl+`/products/${product.id}`,{checked:!product.checked})
}

export const updateProduct=(product)=>{
    return axios.put(baseUrl+`/products/${product.id}`,product);
}

export const useAppState=()=>{
   const initialeState= {
    products: [],
    currentPage: 1,
    sizePage: 8,
    keyword: "",
    totalPages: 0
  }
  const appState=useState(initialeState)
  return appState;
}

