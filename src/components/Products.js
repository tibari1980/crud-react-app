import { faCheckCircle, faEdit, faListSquares, faPlusCircle, faSearch, faSearchPlus, faSpaceShuttle, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext, checkProduct, deleteProduct, findAllProducts } from '../service/repository-product';
import { useNavigate } from 'react-router-dom';
 

function Products() {
  
  const navigate=useNavigate();
  const [ motCle,setMotCle]=useState("");
  const [productsState, setProductsState] =useContext(AppContext);
  const handleDeleteProduct = (product) => {
    const res = window.confirm("Êtes-vous sur de vouloir supprimer ce produit :" + product.id);
    if (res) {
      deleteProduct(product.id).then((response) => {
        const newlistProducts = productsState.products.filter((p) => p.id !== product.id);
        setProductsState({ ...productsState, products: newlistProducts });
      })
        .catch((error) => {
          console.log(error);
        })
    }

  }
  useEffect(() => {
    
    handleGetProducts(productsState.keyword, productsState.currentPage, productsState.sizePage);
  }, [])

  const handleGetProducts = (keyword, currentPage, size) => {
    findAllProducts(keyword, currentPage, size)
      .then((response) => {
        const totalElements = response.headers['x-total-count'];
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size !== 0) ++totalPages;

        setProductsState({
          ...productsState,
          products: response.data,
          keyword: keyword,
          currentPage: currentPage,
          sizePage: size,
          totalPages: totalPages
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const handleGoToPage = (page) => {
    handleGetProducts(productsState.keyword, page, productsState.sizePage);
  }
   const handleSearchProduct=(event)=>{
    
    event.preventDefault();
    setProductsState({...productsState,keyword:motCle});
    handleGetProducts(motCle,productsState.currentPage,productsState.sizePage);


   }
  const handleCheckProduct = (product) => {
    checkProduct(product).then((response) => {
      const newList = productsState.products.map(p => {
        if (p.id === product.id) {
          p.checked = !p.checked;
        }
        return p;
      })
      setProductsState({ ...productsState, products: newList });
    })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='card p-1'>
           <div className='card-headers'><FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon> Search by key :</div>
           <div className='card-body'>
            <div className='row'>
              
              <form onSubmit={handleSearchProduct} >
  <div className="row">
    <div className="col">
    <input type="text"  value={motCle} onChange={(e)=>setMotCle(e.target.value)}
                  className="form-control"  placeholder='Search...'/>
    </div>
    <div className="col">
    <button className='btn btn-success'><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
    </div>
  </div>
</form>

            </div>

          </div>

        </div>
        <div className='card p-3'>
          <div className='card-header'><FontAwesomeIcon icon={faListSquares}></FontAwesomeIcon> List Product:</div>
         
          <div className='card-body'>
            <table className="table" data-bs-theme="dark">
              <thead>
                <tr>
                  <th>
                    <button 
                     onClick={()=>navigate("/addProduct")}
                    className='btn btn-outline-success '>
                      <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>

                    </button>
                  </th>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Checked</th>
                  <th>Action</th>
                  
                </tr>
              </thead>
              <tbody>
                {
                  productsState.products.map((product) => {
                    return <tr key={product.id}>
                       <td>
                        <button 
                           onClick={()=>navigate(`/editProduct/${product.id}`)}
                           className="btn btn-outline-info">
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>{product.id}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          onClick={() => handleCheckProduct(product)}
                          className='btn btn-outline-success'>
                          <FontAwesomeIcon
                            icon={product.checked ? faCheckCircle : faSpaceShuttle} >

                          </FontAwesomeIcon>

                        </button>
                      </td>
                      <td>
                        <button className='btn btn-outline-danger'
                          onClick={() => handleDeleteProduct(product)} >
                          <FontAwesomeIcon icon={faTrashCan} >

                          </FontAwesomeIcon>

                        </button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            <ul className="pagination">
              {
                new Array(productsState.totalPages).fill(0).map((v, index) => {

                  return <li key={index} className={index + 1 === productsState.currentPage ? "page-item active" : "page-item"}>
                    <span  className='page-link'
                      onClick={() => handleGoToPage(index + 1)}>{index + 1}</span>
                  </li>
                })
              }


            </ul>
          </div>

          <div className='card-footer'>List Of All Product</div>
        </div>
      </div>
    </div>
  )
}

export default Products