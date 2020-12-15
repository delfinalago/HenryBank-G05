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
                <Card.Title style={styles.title}>Editar Contacto : </Card.Title> 
            <Card.Divider/>
            
            </Card>
                <Button type="outline" onPress={handleSubmit} title="Guardar" style={styles.boton}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: "#fff"
    },

})
