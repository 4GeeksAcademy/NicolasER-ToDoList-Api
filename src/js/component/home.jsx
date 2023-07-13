import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [tarea, setTarea] = useState("")

	const [lista, setLista] = useState([]) 

	const crearUsuario = async () => {
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolaser", {
			method: "POST", 
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			}

		})
		const data = await response.json()
		console.log(data)
	}
	
	useEffect(()=>{
		//crearUsuario()
		obtenerListado()
	},[])

	useEffect(()=>{
		actualizarTareas()
	},[lista])

	const obtenerListado = async () => {
		try {
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolaser") 
			const data = await response.json()
			setLista(data) 
		} catch(error){
			console.log(error)
		}
	}

	function nuevaTarea(e) {
		e.preventDefault()
		setLista([...lista,{"label":tarea, "done":false}])
		setTarea("")
	}

	const actualizarTareas = async () => {
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/nicolaser", {
			method: "PUT", 
			body: JSON.stringify(lista),
			headers: {
				"Content-Type": "application/json",
			}

		})
		const data = await response.json()
		console.log(data)
	}

	function eliminar(id) {
		let nuevoArray = []
		nuevoArray = lista.filter((item, index)=>{
			if(index!== id){
				return item
			}
		})
		setLista(nuevoArray)

	}
		

	return (
		<div className="container text-center">
			<input
			type="text" 
			className="form-control"
			value={tarea}
			onChange={(e)=> setTarea(e.target.value)} />
			<button className="btn btn-outline-secondary" onClick={nuevaTarea}>Agregar Tarea</button>
			<div>
				<ul className="list-group">
					{lista.map((item, id)=>(
						<li key={id} className="list-group-item">{item.label}
						<button className="btn btn-outline-secondary float-end" onClick={()=> eliminar(id)}>
							{/* <i className="fa-solid fa-trash"></i> */}
							X
						</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Home;
