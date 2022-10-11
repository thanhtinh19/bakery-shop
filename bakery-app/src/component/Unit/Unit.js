import '../../App.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'


function Unit({ list, setList, setEditItem }) {
    const getAPI = () => {
        fetch("http://localhost:3001/api/unit")
            .then((res) => res.json())
            .then((json) => setList(json))
    }
    useEffect(getAPI, [list, setList])

    const deleteHandler = (item) => {
        if (window.confirm('Bạn có muốn xóa không?')) {
            setList(list.filter((el) => el.id !== item.id));
            fetch(`http://localhost:3001/api/unit/${item.id}`, { method: 'DELETE' })
                .then(() => console.log('xóa thành công'))
            toast.success("Xóa thành công")
        }
        else toast.error("không thể xóa")

    }

    const editHandle = (item) => {
        setEditItem(item)
    }
    
    return (
        <form className='form-unit'>
            <Link to="/create-unit"><button className='blue' type='submit'>Create new</button></Link>
            <table>
            <tbody>
                <tr className='title_table'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>ACTION</th>
                </tr>
                {list.map(item => {
                    return(
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <div className='action'>
                                    <Link to="/create-unit"><button className='green' type='submit' onClick={() => editHandle(item)}>Edit</button></Link>
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
export default Unit;