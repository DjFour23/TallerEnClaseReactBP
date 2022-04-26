import React from "react";
import {firebase} from '../firebase'
import {nanoid} from 'nanoid'

const Formulario = () => {
    const[item, setItem] = React.useState('')
    const[descripcion, setDescripcion] = React.useState('')
    const[item3, setItem3] = React.useState('')
    const[item4, setItem4] = React.useState('')
    const[item5, setItem5] = React.useState('')
    const[item6, setItem6] = React.useState('')
    
    
    const[lista, setLista] = React.useState([])
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const[id, setId] = React.useState('')
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('items').get()
                const array = data.docs.map(item =>(
                    {
                        id:item.id, ...item.data(),
                    }
                ))
                setLista(array)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    })
    
      const getRandomInt = (min, max) => {
        let cosa = Math.floor(Math.random() * (max - min)) + min;
        let link = "https://picsum.photos/id/"+cosa+"/30/30"

        return link
      };
      
      
    const guardarDatos = async(e) => {
        e.preventDefault()

        //Alertas para comprobacion de campos vacios agregar

        if(!item.trim()){
            setError('Campo item 1 vacío')
            return
        }
        if(!descripcion.trim()){
            setError('Campo item 2 vacío')
            return
        }
        if(!item3.trim()){
            setError('Campo item 3 vacío')
            return
        }
        if(!item4.trim()){
            setError('Campo item 4 vacío')
            return
        }
        if(!item5.trim()){
            setError('Campo item 5 vacío')
            return
        }

        try {
            const db = firebase.firestore()
            const nuevoItem = {
                nombreItem: item,
                nombreDescripcion: descripcion,
                nombreItem3: item3,
                nombreItem4: item4,
                nombreItem5: item5,
                nombreItem6:getRandomInt(1,999)
            }
            await db.collection('items').add(nuevoItem)
            setLista([...lista,
                {id:nanoid(), nombreItem: item, nombreDescripcion: descripcion, nombreItem3: item3, nombreItem4: item4
                    , nombreItem5: item5,  nombreItem6:getRandomInt(1,999)}
            ])
        } catch (error) {
            console.log(error)
        }
        setModoEdicion(false)
        setItem('')
        setDescripcion('')
        setItem3('')
        setItem4('')
        setItem5('')
        setItem6('')
        setError(null)

        //Fin alertas para comprobacion de campos vacios
        
    }
    
    const eliminar = async(id)  =>{
        try {
            const db = firebase.firestore()
            await db.collection('items').doc(id).delete()
            const aux = lista.filter(item => item.id !== id)
            setLista(aux)
        } catch (error) {
            console.log(error)
        }
    }

    const auxEditar = (item)=>{
        setItem(item.nombreItem)
        setDescripcion(item.nombreDescripcion)
        setItem3(item.nombreItem3)
        setItem4(item.nombreItem4)
        setItem5(item.nombreItem5)
        setItem6(item.nombreItem6)
        setModoEdicion(true)
        setId(item.id)
    }

    const editar = async e =>{
        e.preventDefault()

        //Comprobacion campos vacios editar
        
        if(!item.trim()){
            setError('Campo fruta vacío')
            return
        }
        if(!descripcion.trim()){
            setError('Campo item 2 vacío')
            return
        }
        if(!item3.trim()){
            setError('Campo item 3 vacío')
            return
        }
        if(!item4.trim()){
            setError('Campo item 4 vacío')
            return
        }
        if(!item5.trim()){
            setError('Campo item 5 vacío')
            return
        }
       
        //Fin comprobacion campos vacios editar

        try {
            const db = firebase.firestore()
            await db.collection('items').doc(id).update(
                {
                    nombreItem:item,
                    nombreDescripcion:descripcion,
                    nombreItem3:item3,
                    nombreItem4:item4,
                    nombreItem5:item5,
                    nombreItem6:getRandomInt(1,999),
                }
            )
            setModoEdicion(false)
        } catch (error) {
            console.log(error)
        }
        setItem('')
        setDescripcion('')
        setItem3('')
        setItem4('')
        setItem5('')
        setItem6('')
        setError(null)
    }

    const cancelar = () => {
        setModoEdicion(false)
        setItem('')
        setDescripcion('')
        setItem3('')
        setItem4('')
        setItem5('')
        setItem6('')
        setError(null)
    }
    return(
        <div className='container mt-5'>
            <h1 className="text-center">Formulario</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Listado de items</h4>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Item 1</th>
                                <th>Item 2</th>
                                <th>Item 3</th>
                                <th>Item 4</th>
                                <th>Item 5</th>
                                <th>Imagen Picsum</th>
                                <th>OPCIONES</th>
                            </tr>
                        </thead>
                        {lista.map((item)=>(
                        <tbody>
                            <tr key={item.id}>
                                <td>{item.nombreItem}</td>
                                <td>{item.nombreDescripcion}</td>
                                <td>{item.nombreItem3}</td>
                                <td>{item.nombreItem4}</td>
                                <td>{item.nombreItem5}</td>
                                <td><img src={item.nombreItem6} alt="img de picsum"/></td>
                                <td>
                                    <center>
                                        <button className="btn btn-danger btn-sm float-end mx-2" onClick={()=> eliminar(item.id)}>Eliminar</button>
                                        <button className="btn btn-warning btn-sm float-end mx-2" onClick={()=> auxEditar(item)}>Editar</button>
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                        ))}   
                    </table>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar Elementos' : 'Agregar Elementos'
                        }</h4>
                    <form onSubmit={modoEdicion ? editar : guardarDatos}>
                        {
                            error ? <span className="text-danger">{error}</span> : null
                        }
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder='Ingrese nombre item'
                            onChange={(e) => setItem(e.target.value)}
                            value = {item}
                        />
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder='Ingrese nombre item 2'
                            onChange={(e) => setDescripcion(e.target.value)}
                            value = {descripcion}
                        />
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder='Ingrese nombre item 3'
                            onChange={(e) => setItem3(e.target.value)}
                            value = {item3}
                        />
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder='Ingrese nombre item 4'
                            onChange={(e) => setItem4(e.target.value)}
                            value = {item4}
                        />
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder='Ingrese nombre item 5'
                            onChange={(e) => setItem5(e.target.value)}
                            value = {item5}
                        />
                        {
                            modoEdicion? (
                                <>
                                    <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                    <button className='btn btn-danger btn-block mx-2' onClick={()=> cancelar()}>Cancelar</button>
                                </>
                            ):(
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Formulario;