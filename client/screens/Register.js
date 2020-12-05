import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function register(){
    return (
        <View style={styles.container}>
            <Text>Estamos en register!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})