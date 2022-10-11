import '../../App.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
function Ingredient({ list, setList, setEditItem, setListUnit }) {
    const getAPI = () => {
        fetch("http://localhost:3001/api/ingredient")
            .then((res) => res.json())
            .then((json) => setList(json))
    }
    const getAPIUnit = () => {
        fetch("http://localhost:3001/api/unit")
            .then((res) => res.json())
            .then((json) => setListUnit(json))
    }
    useEffect(getAPI, [list, setList])
    useEffect(getAPIUnit, [setListUnit])

    const deleteHandler = (item) => {
        if (window.confirm('Bạn có muốn xóa không?')) {
            setList(list.filter((el) => el.id !== item.id));
            fetch(`http://localhost:3001/api/ingredient/${item.id}`, { method: 'DELETE' })
                .then(() => console.log('xóa thành công'))
            toast.success("Xóa thành công")
        }
        else toast.error("không thể xóa")

    }

    const editHandle = (item) => {
        setEditItem(item)
    }
    return (
        <form className='form-productsType'>
            <Link to="/create-ingredient"><button className='blue' type='submit'>Create new</button></Link>
            <table>
            <tbody>

                <tr className='title_table'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>IDUNIT</th>
                    <th>QUANTITY</th>
                    <th>DESCRIPTION</th>
                    <th>WARNING THRESHOLD</th>
                    <th>UNIT</th>
                    <th>ACTION</th>
                </tr>
                {list.map(item => {
                    return(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.idUnit}</td>
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                            <td>{item.warningThreshold}</td>
                            <td>{item.unit}</td>
                            <td>
                                <div className='action'>
                                    <Link to="/create-ingredient"><button className='green' type='submit' onClick={() => editHandle(item)} >Edit</button></Link>
                                    <Link><button className='red' type='submit' onClick={() => deleteHandler(item)}>Delete</button></Link>
                                </div>
                            </td>
                        </tr>
                    )
                })}
               
            </tbody>
            </table>
        </form>
    )
}
export default Ingredient;