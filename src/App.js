import axios from "axios";
import React, { useEffect, useState } from "react";

 function App() {
  const [lista,setLista] =  useState({})
 
  async function getUser() {
    try {
      await axios.get('http://0.0.0.0:8040/Aluno/'
    //   {
    //     nome: "Joao",
    //     email: "joao@gmail.com",
    //     birthdate: "1996-12-22",
    //     phonenumber: "+5561987475896",
    //     // picture: "./public/logo192.png",
    //     user_type: "Aluno",
    //     cpf: "56480946120",
    //     password:"33525719J",
    //     password_confirmation:"33525719J",
        
    // }
    )
      .then(res=>{
       setLista(res.data)
        console.log(lista)
      }).catch(e=>{
        console.log(e.response  )
      });
      
      
    } catch (e) {
      console.log(e);
  } }

    
  useEffect(() => {
      getUser();
    }, []);

  return <div> 
      {lista.map(l=><div>{l.nome}</div>)}
   </div>
    
  
}

export default App;
