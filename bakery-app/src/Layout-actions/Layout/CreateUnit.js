import '../../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
function CreateUnit({ editItem, setEditItem }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const updateProduct = (name, description) => {
        console.log(editItem.id)

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, description: description })
        };
        fetch(`http://192.168.28.202:3001/api/unit/${editItem.id}`, requestOptions)
            .then(res => res.json())
        setEditItem('');
    }



    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setDescription(editItem.description);
        } else {
            setName('')
            setDescription('')
        }
    }, [editItem]);

    const handleAdd = () => {
        if (!editItem) {
            if (name) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, description: description })
                };
                fetch('http://localhost:3001/api/unit', requestOptions)
                    .then(res => res.json())
            }
        } else {
            updateProduct(name, description)
        }

    }

    const handleExit = () => {
        setEditItem('')
    }

    return (
        <form className='create-products'>
            <table className='create'>
                <tbody>
                    {editItem &&
                        <tr>
                            <td>Id:</td>
                            <td>{editItem.id}</td>
                        </tr>
                    }
                    <tr>
                        <td>Name:</td>
                        <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td><textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea></td>
                    </tr>
                </tbody>
            </table>
            <div className='button-action'>
                <Link to="/unit"><button className={editItem ? "green" : "blue"} onClick={handleAdd} type='submit'>{editItem ? "Edit" : "Create"}</button></Link>
                <Link to="/unit"><button className='red' onClick={handleExit} type='submit'>Exit</button></Link>
            </div>

        </form>
    )
}
export default CreateUnit;