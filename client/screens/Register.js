// ALTA USER 
import { useFormik} from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ImageBackground  } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

const background = require('../assets/Fondo1.png');

export default function register(){
        


    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues:{
            name: "",
            lastname: "",
            phone: "",
            dni: "",
            address: "",
            province:"",
            city:"",
            nacimiento:""
          }, 
          validationSchema: Yup.object({
            name: Yup
              .string()
              .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
              .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
              .required("Campo requerido"),
            lastname: Yup
              .string()
              .min(4, "El nombre ingresado debe tener mas de 4 caracteres")
              .max(50, "El nombre ingresado debe tener tener menos de 50 caracteres")
              .required("Campo requerido"),
            phone: Yup    
              .string()
              .required("Ingrese su numero de telefono")
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Numero de telefono no valido"
              )
          }), onSubmit: ({name, lastname,phone}) => {
            alert(`name: ${name}, lasname: ${lastname}, phone: ${phone}`);
          }
        })
          

    return(

      
        <ScrollView style={styles.scrollView}>
        <View style={{backgroundColor:"#FFF",height:"100%"}} >
        <ImageBackground source={background} style={styles.image}>
            <Text
             style={{
                 paddingTop: 30,
                 fontSize:50,
                 alignSelf:"center",
                 color: "#FFF",
                 fontFamily:"Verdana",
             }}
            >Alta de cliente</Text>

            <Text
            style={{
                fontFamily:"Verdana",
                fontSize:20,
                marginHorizontal:55,
                textAlign:'center',
                marginTop:10,
                opacity:0.8,
                color:"#FFF" 
            }}
            >
               Complete los campos para registrarse.
            </Text>

                    <TextInput 

                         placeholder="Nombre"
                         placeholderTextColor="#fff"
                         onChangeText={handleChange('name')}
                         value={values.name}


                         style={{flexDirection:"row",
                         height: 50,
                         color:"#FFF",
                         alignItems:"center",
                         marginHorizontal:55,
                         borderWidth:3,
                         marginTop:50,
                         paddingHorizontal:10,
                         borderColor:"#00716F",
                         borderRadius:23,
                         paddingVertical:2}}
                    />
                    
                     {touched.name && errors.name ? (
                     <div>{errors.name}</div>
                      ): null}
                    
                    <TextInput 
                        placeholder="Apellido"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('lastname')}
                        
                        value={values.lastname}


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />
                     {touched.lastname && errors.lastname ? (
                     <div>{errors.lastname}</div>
                      ): null}


                    <TextInput 
                        placeholder="Telefono"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('phone')}
                        value={values.phone}
                        keyboardType='numeric'


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />
                     {touched.phone && errors.phone ? (
                     <div>{errors.phone}</div>
                      ): null}


                    <TextInput 
                        placeholder="DNI"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('dni')}
                        value={values.dni}
                        keyboardType='numbers-and-punctuation'


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />


                    <TextInput 
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('nacimiento')}
                        value={values.nacimiento}
                        keyboardType=''


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />

                    <TextInput 
                        placeholder="Direccion"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('address')}
                        value={values.address}


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />

                    <TextInput 
                        placeholder="Provincia"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('province')}
                        value={values.province}


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />

                    <TextInput 
                        placeholder="Ciudad"
                        placeholderTextColor="#fff"
                        onChangeText={handleChange('city')}
                        value={values.city}


                        style={{flexDirection:"row",
                        height: 50,
                        alignItems:"center",
                        marginHorizontal:55,
                        borderWidth:3,
                        marginTop:50,
                        paddingHorizontal:10,
                        borderColor:"#00716F",
                        borderRadius:23,
                        paddingVertical:2}}
                    />

                    

                    <TouchableOpacity 
                    mode='contained' secureTextEntry={true} title='Register' 
                    onPress={handleSubmit}
                        style={{
                        backgroundColor:"#FFF",
                        marginHorizontal:55,
                        alignItems:"center",
                        justifyContent:"center",
                        marginTop:30,
                        marginBottom:30,
                        backgroundColor:"#00716F",
                        paddingVertical:10,
                        borderRadius:23
                    }}>
					<Text>Enviar</Text>
					</TouchableOpacity> 
          </ImageBackground>
        </View>
    </ScrollView>
   
    )
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'gray',
    },
    text: {
      fontSize: 50,
    },
    image:{
      
      
    }
  });