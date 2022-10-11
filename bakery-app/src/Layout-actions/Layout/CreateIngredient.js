import '../../App.css'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
function CreateIngredient({ editItem, setEditItem , listUnit}) {
    const [name, setName] = useState('');
    const [idUnit, setIdUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [warningThreshold, setWarningThreshold] = useState('');
    const [unit, setUnit] = useState('');

    const updateProduct = (name, idUnit, quantity, description, warningThreshold, unit) => {
        console.log(editItem.id)

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name,idUnit: idUnit, quantity: quantity, description: description, warningThreshold: warningThreshold, unit: unit })
        };
        fetch(`http://192.168.28.202:3001/api/ingredient/${editItem.id}`, requestOptions)
            .then(res => res.json())
        setEditItem('');
    }
    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setIdUnit(editItem.idUnit);
            setQuantity(editItem.quantity);
            setDescription(editItem.description);
            setWarningThreshold(editItem.warningThreshold);
        } else {
            setName('');
            setIdUnit('');
            setQuantity('');
            setDescription('');
            setWarningThreshold('');
            setUnit('');
        }
    }, [editItem]);


    const handleAdd = () => {
        if (!editItem) {
            if (name) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name, idUnit: idUnit, quantity: quantity, description: description, warningThreshold: warningThreshold, unit: unit })
                };
                fetch('http://localhost:3001/api/ingredient', requestOptions)
                    .then(res => res.json())
            }
        } else {
            updateProduct(name, idUnit, quantity, description, warningThreshold, unit)
        }
    }

    const handleExit = () => {
        setEditItem('')
    }

    return (
        <form className='create-ingredient'>
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
                    <td><input type="text" value={name} onChange={(e) => setName(e.target.value)} required/></td>
                </tr>
                <tr>
                    <td>Quantity:</td>
                    <td><input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td><textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea></td>
                </tr>
                <tr>
                    <td>Warning threshold:</td>
                    <td><input type="text" value={warningThreshold} onChange={(e) => setWarningThreshold(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Unit:</td>
                    <td>
                        <select value={idUnit} onChange={(e) => setIdUnit(e.target.value)}>
                            {listUnit.map(unit => {
                                return (
                                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
            </tbody>
            </table>
           <div className='button-action'>
                <Link to="/ingredient"><button className={editItem ? "green" : "blue"} type='submit'  onClick={handleAdd}>{editItem ? "Edit" : "Create"}</button></Link>
                <Link to="/ingredient"><button type='submit' className='red' onClick={handleExit}>Exit</button></Link>
           </div>
            
        </form>
    )
}
export default CreateIngredient;