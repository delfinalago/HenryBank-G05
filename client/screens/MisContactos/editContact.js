import React, { Component, useEffect } from 'react'
import { useFormik } from "formik";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,  
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Input
} from 'react-native'
import { Card, ListItem, Button, Icon,Avatar } from 'react-native-elements'


export default function editContact({ navigation }) {
    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors
      } = useFormik({
        initialValues: {
          name: ""
        },
        onSubmit: ({ name, email}) => {
            console.log("register params: ", values);
        }
    })

    return (
        <ScrollView style={styles.fondo}>
            <Card>
                <Card.Title style={styles.title}>Editar Contacto</Card.Title> 
            <Card.Divider/>
                <Text style={styles.text}>Nombre</Text>
                <Card.Divider/>
                <TextInput style={styles.input} onChangeText={handleChange("name")}  placeholder='Cambiar Nombre'/>
            </Card>
                <Button type="outline" onPress={handleSubmit} title="Guardar" style={styles.boton}/>
                <Button type="outline" onPress={() => navigation.goBack()} title="Volver" style={styles.boton}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: "#fff"
    },
    boton: {
        paddingTop: 15,
        marginBottom: 5,
        flex : "row",
        color:"#03bb85",
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: "#fff",
    },
    title: {
        marginTop: 15,
        fontSize: 30,
        color: "#00aae4",
        alignSelf: "center"
    },
    text:{
        marginBottom: 5,
        color: "#00aae4",
        fontSize: 20,
    },
    input: {
        flexDirection: "row",
        height: 40,
        alignItems: "auto",
        borderWidth: 3,
        marginTop: 10,
        paddingHorizontal: 10,
        borderColor: "#00aae4",
        borderRadius: 23,
      },

})
