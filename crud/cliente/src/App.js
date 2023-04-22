
import React,{useState,useEffect} from 'react';
import './App.css';
import axios from "axios"
import Card from './components/cards/card';

function App() {
  const [values,setvalues]= useState();
  const [listgames,setlistgames] = useState();

   const handlechangevalues = (value) =>{
    setvalues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
   };
 
    const handleclickbutton = () =>{
      axios.post("http://localhost:3001/register",{
        name: values.name,
        cost:values.cost,
        category:values.category,
      }).then((response)=>{
         console.log (response)
      });
    };

    useEffect(()=>{
      axios.get ("http://localhost:3001/getcards").then((response)=>{
        setlistgames(response.data);
      });
    },[]);

  return (
    <div className="app--container">
     <div classename ="register--container">
     <h1 classename ="registertitle">Gamer Shop</h1>
     <input 
     type="text" 
     name ="name" 
     placeholder="nome"
     className="register--input"
     onChange={handlechangevalues}
     />
          <input 
     type="text" 
     name ="cost" 
     placeholder="preço"
     className="register--input"
     onChange={handlechangevalues}
     />
          <input 
     type="text" 
     name ="category" 
     placeholder="categoria"
     className="register--input"
     onChange={handlechangevalues}
     />
     <button className="registro--button" onClick={()=>handleclickbutton()}>cadastrar</button>
     </div>
     
     {typeof listgames !== "undefined" && listgames.map((value)=>{
      return <Card key={value.id}
      listcard={listgames}
      setlistcard={setlistgames}
      id={value.id}
      name={value.name}
      cost={value.cost}
      category={value.category}></Card>;
     })}

    </div>
  );
}

export default App;
