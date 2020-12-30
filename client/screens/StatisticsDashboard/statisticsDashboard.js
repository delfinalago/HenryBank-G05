import React, {useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {Line} from "react-chartjs-2"

export default function statisticsDashboard() {
    const [chartData, setChartData] = useState({})

    const chart = () => {
        setChartData({
            labels:["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",],
            datasets:[{
                label:"Resumen",
                data:[10, 30, 50, 90],
                backgroundColor:['rgba(0, 0, 0, 0.1)'],
                boderWidth: 4,
            }],
        })
    }

    useEffect(() => {
        chart();
    }, [])

    return (
        <ScrollView>
            <Text>Analisis de Gastos</Text>
            <View>
                <Line data={chartData}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})


