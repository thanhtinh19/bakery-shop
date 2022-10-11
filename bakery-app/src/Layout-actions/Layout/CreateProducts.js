import '../../App.css'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'


function CreateProduct({editItem, setEditItem}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [viewNumber, setViewNumber] = useState('');
    const [image, setImage] = useState(null)
    const [filesPreview, setFilesPreview] = useState([])
    const [fileBase64ObjArr, setFileBase64ObjArr] = useState([])
    const imgObjArr = []


    const updateProduct = (name, description, unitPrice, viewNumber, image) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ name: name, description: description, unitPrice: unitPrice, viewNumber: viewNumber, images: image })
        };
        fetch(`http://localhost:3001/api/product/${editItem.id}`, requestOptions)
            .then(response => response.json())
        setEditItem('');
    }

    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setDescription(editItem.description);
            setUnitPrice(editItem.unitPrice);
            setViewNumber(editItem.viewNumber);
            setImage(editItem.images)
        } else {
            setName('')
            setDescription('')
            setUnitPrice('')
            setViewNumber('')
            setImage([])
        }
    }, [editItem]);
    const handleAdd = () => {
        if(!editItem ){
            if(name){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({ name: name, description: description, idUnit: 4, idTypes: '2;5', ingredients: '1-100', unitPrice: unitPrice, viewNumber: viewNumber, fileBase64ObjArr: fileBase64ObjArr})
                };
                fetch('http://localhost:3001/api/product', requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data) )
            }
        } else{
            updateProduct(name, description, unitPrice, viewNumber, image)
        }

    }

    const handleExit = () => {
        setEditItem('')
    }

    console.log(fileBase64ObjArr)
    useEffect(() => {
        if(editItem){
            for (let img of editItem.images.split(";")) {
                imgObjArr.push(img)
            }
            setImage(imgObjArr)
        }
    },[])


    const handleUploadFiles = (e) => {
        const filePre = []
        const fileBase = []
        for (let file of e.target.files) {
            filePre.push(URL.createObjectURL(file))

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                fileBase.push({
                    base64: reader.result
                })
            };
            reader.onerror = function (error) {
                toast.error("Upload ảnh lỗi!");
            };
        }
        setFilesPreview(filePre)
        setFileBase64ObjArr(fileBase)
    };

    const handleDeleteImg = (type, name) => {
        if(type === 'old'){
            const imgArr = [...image]
            const deleteImg = imgArr.find(img => img === name)
            imgArr.splice(imgArr.indexOf(deleteImg), 1)
            setImage(imgArr)
        }
        else {
            const fileBase = [...fileBase64ObjArr]
            const filePre = [...filesPreview]
            const deleteFileBase = fileBase.find(file => file === name)
            fileBase.splice(fileBase.indexOf(deleteFileBase), 1)

            const deleteFilePre = filePre.find(file => file === name)
            filePre.splice(filePre.indexOf(deleteFilePre), 1)


            setFileBase64ObjArr(fileBase)
            setFilesPreview(filePre)
        }
    }

    return (
        <form className='create-products' >
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
                    <td>Description:</td>
                        <td><textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea></td>
                </tr>
                <tr>
                    <td>Price:</td>
                        <td><input value={unitPrice} type="text" onChange={(e) => setUnitPrice(e.target.value)} required /></td>
                </tr>
                <tr>
                    <td>View:</td>
                        <td><input type="text" value={viewNumber} onChange={(e) => setViewNumber(e.target.value)} /></td>
                </tr>
            </tbody>
                
            </table>
            <div className='pre-img'>
                <input type="file" multiple className='loadImg' onChange={handleUploadFiles} accept="image/*"/>
                <div className='list-img'>
                    {editItem ? 
                        image && image.map((img, index) => {
                            if (!img["isDeleted"]) {
                                return (
                                    <div className='image' key={index}>
                                        <img src={`http://localhost:3001/public/img/${img}`} alt='' />
                                        <i className="fa fa-times-circle" onClick={() => handleDeleteImg("old", img)}></i>
                                    </div>
                                )
                            }
                        })
                        :
                        filesPreview && filesPreview.map((file, index) => {
                            return (
                                <div className='image' key={index}>
                                    <img src={file} alt='' />
                                    <i className="fa fa-times-circle" onClick={() => handleDeleteImg("new", file)}></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
           <div className='button-action'>
                <Link to="/" ><button className={editItem ? "green" : "blue"} type='submit' onClick={handleAdd}>{editItem ? "Edit" : "Create"}</button></Link>
                <Link to="/"><button className='red' onClick={handleExit}>Exit</button></Link>
           </div>
            
        </form>
    )
}
export default CreateProduct;