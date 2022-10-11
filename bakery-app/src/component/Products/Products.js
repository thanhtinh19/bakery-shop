import '../../App.css'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../img/efb900bd-4c13-4931-bcee-926538cdefec.jpg'

function Products({ list, setList, setEditItem}){
    const getAPI = () => {
        fetch("http://localhost:3001/api/product")
            .then((res) => res.json())
            .then((json) => setList(json))
    }
    useEffect(getAPI, [list, setList])

    const deleteHandler = (item) => {
        if (window.confirm('Bạn có muốn xóa không?')) {
            setList(list.filter((el) => el.id !== item.id));
            fetch(`http://localhost:3001/api/product/${item.id}`, { method: 'DELETE' })
                .then(() => console.log('xóa thành công'))
            toast.success("Xóa thành công")
        }
        else toast.error("không thể xóa")

    }

    const editHandle = (item) => {
        setEditItem(item)
    }
    const formatMoney = (x) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(x)
    }

    return(
        <form className='form-products'>
            <Link to="/create-products"><button className='blue' type='submit'>Create new</button></Link>
            <div className='list-products'>
                {list.map(item => {
                    return (
                        <div key={item.id} className='item'>
                            <img src={item.images && `http://localhost:3001/public/img/${item.images.split(';')[0]}`} alt=''/>
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p>Giá: {formatMoney(item.unitPrice)} </p>
                            <span> 
                            </span>
                            <div className='action'>
                                <Link to="/create-products"><button className='green' type='submit' onClick={() => editHandle(item)}>Edit</button></Link>
                                <Link><button className='red' type='submit' onClick={() => deleteHandler(item)}>Delete</button></Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </form>
    )
    
}

export default Products;