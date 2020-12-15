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


export default function addContact({ navigation }) {
    const {
        handleSubmit,
        handleChange,
        values,
        touched,
        errors
      } = useFormik({
        initialValues: {
          name: "",
          email: "",
        },
        onSubmit: ({ name, email}) => {
            console.log("register params: ", values);
        }
    })

    return (
        <ScrollView style={styles.fondo}>
            <Card>
                <Card.Title style={styles.title}>Agregar Contacto : </Card.Title> 
            <Card.Divider/>
             <TextInput onChangeText={handleChange("name")} onSubmit={handleSubmit}
            value={values.name} style={styles.input} placeholder='Nombre'/>
            <Card.Divider/>
             <TextInput onChangeText={handleChange("email")} onSubmit={handleSubmit}
            value={values.email} style={styles.input} placeholder='Email'/>
            </Card>
                <Button type="outline" onPress={handleSubmit} title="Guardar" style={styles.boton}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: "#fff",
        height: 100,
    },
    title: {
        marginTop: 15,
        fontSize: 20,
        color: "#00aae4",
        alignSelf: "center"
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
    boton: {
    marginTop: 5,
      margin: 60,
      alignSelf: "auto",
      
    }
})
