import React from 'react';
import '../../App.css'
import {Link} from 'react-router-dom'
function Menu(){
    return(
        <ul className = 'menu'>
            <Link to="/">
                <div className='menu-li'>Products</div>
            </Link>
            <Link to="/productsType">
                <div className='menu-li'>Type of products</div>
            </Link>
            <Link to="/ingredient">
                <div className='menu-li'>Ingredient</div>
            </Link>
            <Link to="/unit">
                <div className='menu-li'>Unit</div>
            </Link>
            
        </ul>
    )
}
export default Menu;