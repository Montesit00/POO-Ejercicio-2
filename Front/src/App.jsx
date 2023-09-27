import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [producto,setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', marca: '', precio: 0, stock: 0 });

  const baseUrl = "http://localhost:3000";

  const fetchProductos = async () => {
    const data = await axios.get(baseUrl);

    return setProductos(data.data.todoProductos);
  };
  
  const venderProducto = async (id)=>{
    try {
      const productos={productos:[{producto:id, cantidad:1}]}
      await axios.post('http://localhost:3000/crear',productos)
      fetchProductos()
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`)
      fetchProductos()
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      const response = await axios.post(`${baseUrl}/`, nuevoProducto);
      setProductos((prevProductos) => [...prevProductos, response.data.nuevoProducto]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  useEffect(()=>{
    fetchProductos();
  },[]);
  
  return (
    <>
      <div className='container'>
        <h1 style={{margin:10}}>POO - Ejercicio 2</h1>
          <div className='table-responsive'>
            <table>
              <thead style={{backgroundColor: "#ccc"}}>
                <tr>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th colSpan={2}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {producto.map((product,i)=>(
                  <tr key={i}>
                    <td>{product.nombre}</td>      
                    <td>{product.marca}</td>
                    <td>{product.precio}</td>
                    <td>{product.stock}</td>
                    <td><button type='button' className="btn btn-success" onClick={()=>venderProducto(product._id)}>Comprar</button></td>
                    <td><button type="button" className="btn btn-danger" onClick={() => deleteProducto(product._id)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='botones'>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{margin:'10px'}}>Agregar</button>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Agrega un nuevo producto</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="form-floating mb-3">
                    <input 
                      type="nombre" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="Notebook"
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}  
                    />
                    <label htmlFor="floatingInput">Nombre</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                      type="marca" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="Red Dragon"
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, marca: e.target.value })}  
                    />
                    <label htmlFor="floatingPassword">Marca</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                    type="precio" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="200000"
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                  />
                    <label htmlFor="floatingPassword">Precio</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input 
                      type="stock" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="10000"
                      onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                    />
                    <label htmlFor="floatingPassword">Stock</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Atras</button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => {
                      agregarProducto(nuevoProducto);
                      setNuevoProducto({ nombre: '', marca: '', precio: 0, stock: 0 });
                    }}
                  >
                      Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
