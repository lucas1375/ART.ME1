import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import axios from "axios";
import Estilo from './Estilo';

const Cadastro = ({ navigation }) => {

  // Axios Cadastro
const handleClickCadastro = async (values) => {
  // Coloque o ip do seu pc. Para isso, abra o console e digite
  // 'ipconfig' copie o endereço IPV4 e cole na linha abaixo
  axios.post("http://192.168.100.6:3005/cadastrarUsuario", {
    nome: values.nome,
    email: values.email,
    password: values.password,
    telefone: values.telefone,
    uf: values.uf
  }, {mode: 'no-cors'})

  .then((response) => {
    if(response == 201){
      handleCadastroSuccess();
    } else if(response == 400){
      console.log("algo errado")
    }
    
  })
  .catch((error) => {
    console.log(error);
  })  
}

// Validação dos dados
const validationCadastro = yup.object().shape({
  
  nome: yup
  .string()
  .required("Este campo é obrigatório"),
    
  email: yup
  .string()
  .email('Não é um Email')
  .required("Este campo é obrigatório"),

  password: yup
    .string()
    .min(8, 'A senha deve ter 8 caracteres')
    .required("Este campo é obrigatório"),

  telefone: yup
  .string()
  .required("Este campo é obrigatório"),

  uf: yup
  .string()
  .required("Este campo é obrigatório"),
  
})

  // const [showModal, setShowModal] = useState(false);
  // const [enviar, setEnviar] = useState(false);
  // const [dados, setDados] = useState();
  // const [message, setMessage] = useState(null);

  //informaria caso o cadastro fosse completado
  // const handleCadastroSuccess = () => {
  //   setShowModal(true);
  // }

  // useEffect(()=>{
  //   if(enviar==true){ 
  //     console.log(dados)
  //     handleClickCadastro(dados)
  //     setDados({})
  //     setEnviar(false)
  //   }
   
  //   return () => {
  //     setDados([])
  //     setEnviar(false)
  //   }

  // }, [enviar]);

  // teoricamente não usado
  // const userInfo = {
  //   nome: '',
  //   email: '',
  //   password: '',
  //   telefone: '',
  //   uf: '',
  // };

  const [error, setError] = useState('');

  // teoricamente não usado
  // const { nome, email, password, telefone, uf } = userInfo;

  return (
    <Formik
      
    // validationSchema={validationCadastro}
    initialValues={{
        nome: '',
        email: '',
        password: '',
        telefone: '',
        uf: '',
      }}

    onSubmit={values=>{handleClickCadastro(values)}}
    // onSubmit={values => console.log(values)}
      >

      {({ handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          values 
        }) => (

        <View style={Estilo.tela}>
          <Image source={require('../../assets/Imagens/artmelogo4.png')} style={Estilo.image} />
          <View style={Estilo.containerCadastro}>

            <View style={Estilo.titulo}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={Estilo.logoCadastro}>Login</Text>
              </TouchableOpacity>
              <Text style={Estilo.logo}>Cadastrar</Text>
            </View>

            {/* input nome */}
            < View style={Estilo.inputView}>
              {error.nome &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{error.nome}</Text>
              }
              <TextInput
                style={Estilo.inputText}
                placeholder="Nome"
                placeholderTextColor="#F97316"
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
              />
            </View>

            {/* input email */}
            <View style={Estilo.inputView}>
              {error.email &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{error.email}</Text>
              }
              <TextInput
                style={Estilo.inputText}
                placeholder="Email"
                placeholderTextColor="#F97316"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
            </View>

            {/* input senha */}
            <View style={Estilo.inputView}>
              {error.password &&
                  <Text style={{ fontSize: 10, color: 'red' }}>{error.password}</Text>
              }
              <TextInput
                style={Estilo.inputText}
                placeholder="Senha"
                placeholderTextColor="#F97316"
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
            </View>

            {/* input curtos */}
            <View style={Estilo.campos}>

              {/* input telefone */}
              <View style={Estilo.inputcurto}>
                {error.telefone &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{error.telefone}</Text>
                }
                <TextInput
                  style={Estilo.inputText}
                  placeholder="Telefone"
                  placeholderTextColor="#F97316"
                  value={values.telefone}
                  onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                />
              </View>

              {/* input estado */}
              <View style={Estilo.inputcurto}>
                {error.uf &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{error.uf}</Text>
                }
                <TextInput
                  style={Estilo.inputText}
                  placeholder="UF"
                  placeholderTextColor="#F97316"
                  value={values.uf}
                  onChangeText={handleChange('uf')}
                  onBlur={handleBlur('uf')}
                />
              </View>
            </View>
            
            {/* <TouchableOpacity style={Estilo.loginButton} onPress={() => navigation.navigate('Menu')}>
              <Text style={Estilo.loginText}>Entrar</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={Estilo.loginButton} onPress={handleSubmit} disabled={!isValid}>
              <Text style={Estilo.loginText}>Cadastrar</Text>
            </TouchableOpacity>

            {/* <Modal visible={showModal}>
              <View style={Estilo.modalContainer}>
                  <Text style={Estilo.modalText}>Cadastro realizado com sucesso!</Text>
                  <TouchableOpacity style={Estilo.modalButton} onPress={() => setShowModal(false)}>
                  <Text style={Estilo.modalButtonText}>OK</Text>
                  </TouchableOpacity>
              </View>
            </Modal> */}


          </View>
        </View>


      )
      }

    </Formik >


  );

}

export default Cadastro;