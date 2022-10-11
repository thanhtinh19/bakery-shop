
import './App.css';
import Menu from './component/Menu/Menu';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ingredient from './component/Ingredient/Ingredient';
import Products from './component/Products/Products';
import ProductsType from './component/ProductsType/ProductsType';
import Unit from './component/Unit/Unit';
import CreateProduct from './Layout-actions/Layout/CreateProducts';
import CreateProductType from './Layout-actions/Layout/CreateProductsType';
import CreateIngredient from './Layout-actions/Layout/CreateIngredient';
import CreateUnit from './Layout-actions/Layout/CreateUnit';
import { useState } from 'react'

function App() {
  const [listProduct, setListProduct] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [listUnit, setListUnit] = useState([])
  const [editUnit, setEditUnit] = useState(null)
  const [listIngredient, setListIngredient] = useState([])
  const [editIngredient, setEditIngredient] = useState(null)
  const [listProductType, setListProductType] = useState([])
  const [editProductType, setEditProductType] = useState(null)

  return (
    <BrowserRouter>
      <div className='App'>
        <Menu />
        <Routes>
          <Route exact path='/'
            element={<Products listType={listProductType} list={listProduct} setList={setListProduct} setEditItem={setEditProduct} />}
          />
          <Route path='/ingredient'
            element={<Ingredient list={listIngredient} setList={setListIngredient} setEditItem={setEditIngredient} setListUnit = {setListUnit} />}
          />
          <Route path='/productsType'
            element={<ProductsType list={listProductType} setList={setListProductType} setEditItem={setEditProductType} />}
          />
          <Route path='/unit'
            element={<Unit list={listUnit} setList={setListUnit} setEditItem={setEditUnit} />}
          />
          <Route path='/create-products'
            element={<CreateProduct list={listProduct} editItem={editProduct} setEditItem={setEditProduct} />}
          />
          <Route path='/create-products-type'
            element={<CreateProductType editItem={editProductType} setEditItem={setEditProductType} />}
          />
          <Route path='/create-ingredient'
            element={<CreateIngredient editItem={editIngredient} setEditItem={setEditIngredient} listUnit={listUnit} />}
          />
          <Route path='/create-unit'
            element={<CreateUnit editItem={editUnit} setEditItem={setEditUnit} />}
          />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
