import './App.css';
import axios from "axios";
import { Component } from 'react';


class App extends Component {
  async componentDidMount() {
    try {
      axios.post('http://0.0.0.0:8040/Aluno/',{
        nome: "CAIO GABRIEL ARAUJO MEDEIROS",
        email: "caio@gmail.com",
        birthdate: "1996-12-22",
        phonenumber: "+5561987475896",
        // picture: "./public/logo192.png",
        user_type: "Aluno",
        cpf: "56480946120",
        password:"33525719J",
        password_confirmation:"33525719J",
        
    })
      .then(res=>{
        console.log(res)
      }).catch(e=>{
        console.error(e.response.data)
      });
      
      
    } catch (e) {
      console.log(e);
  }

  }
  render(){
    return <h1> oi</h1>
  }
}

export default App;
