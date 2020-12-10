import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,  
  View,
} from 'react-native'

const styles = StyleSheet.create({
  

 })

class Home extends Component {
  render() {
    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <text>
            Contenido del home !
            </text>
        </ScrollView>
      </View>
    )
  }
}

export default Home
