import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [producto,setProductos] = useState([]);

  const baseUrl = "http://localhost:3000";

  const fetch = async () => {
    const data = await axios.get(baseUrl);

    return setProductos(data.data.todoProductos);
  }
  
  const deleteProducto = (index) => {
    setProductos((product) => product.filter((_, i) => i !== index));
  };

  useEffect(()=>{
    fetch();
  },[]);
  

  return (
    <>
      <div className='container'>
        <h1>POO - Ejercicio 2</h1>
          <div className='table-responsive'>
            <table>
              <thead style={{backgroundColor: "#ccc"}}>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Stock</th>
              </thead>
              <tbody>
                {producto.map((product,i)=>(
                  <tr key={i}>
                    <td>{product.nombre}</td>      
                    <td>{product.marca}</td>
                    <td>{product.precio}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='botones'>
              <button type="button" className="btn btn-danger">Eliminar</button>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar</button>
          </div>
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Agrega un nuevo producto</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Nombre</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Marca</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Precio</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Stock</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Atras</button>
                  <button type="button" className="btn btn-primary">Guardar</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
