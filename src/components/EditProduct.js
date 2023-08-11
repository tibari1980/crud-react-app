import React, { useEffect, useState } from 'react';
import { findProductById, updateProduct } from '../service/repository-product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {  useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const navigate=useNavigate();
  const {id}=useParams();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(()=>{
     handleGetProductById(id);
  },[]);

  const handleGetProductById=(id)=>{
    findProductById(id)
    .then((response)=>{
        let product=response.data;
         setDescription(product.description);
         setPrice(product.price);
         setIsChecked(product.checked);
    })
    .catch((error)=>{
      console.log(error)
    })
  }


  const handleUpdateProduct = (event) => {
    event.preventDefault();
    
    let product = { id: id, description: description, price: price, checked: isChecked };
    updateProduct(product).then((response) => {
      setDescription(""); setPrice(0); setIsChecked(false);
      navigate("/listProduct");
    });


  }
  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='card p-3'>
          <div className='card-header'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Product : </div>
          <div className='card-body'>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-3 mt-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="form-control" id="description" placeholder="Enter Description" name="description" />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="form-control" id="price" placeholder="Enter Price" name="price" />
              </div>
              <div className="form-check mb-3">
                <label className="form-check-label">
                  <input
                    onChange={(e) => setIsChecked(e.target.value)}
                    checked={isChecked}
                    className="form-check-input" type="checkbox" name="isChecked" /> Checked
                </label>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>
          <div className='card-footer'>footer...</div>
          
        </div>
      </div>
    </div>
  );
}

export default EditProduct