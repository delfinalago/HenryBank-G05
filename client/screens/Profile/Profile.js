import React, { Component } from 'react'
import { Card, Button } from 'react-native-elements'
import BaseIcon from './Icon'

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  saldo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    fontSize: '14px',
    marginBottom: 16
  },
  saldoNumber: {
    marginTop: 4,
    fontSize: '42px'
  },
  listItemContainer: {
    height: 55,
    width: '30%',
    color: 'black'
  },
  buttons: {
    display: 'grid',
    'grid-template-columns': '3fr 3fr'
  },
  button: {
    width: '30%'
  }
})

class Contact extends Component {
  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name
    } = this.props

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: avatar}}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  onPressSetting = () => {
    this.props.navigation.navigate('Options')
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
        {this.renderHeader()}
        <View style={styles.saldo}>
        <Text>
            Tu saldo actual es:
          </Text>
          <Text style={styles.saldoNumber}>
            $22.58
          </Text>
          </View>
        <View style={styles.buttons}>
        <Button
        style={styles.listItem}
            type="outline"
            title="Currency"
            onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            icon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'font-awesome',
                  name: 'money',
                }}
              />
            }
          />
      <Button
            type="outline"
            title="Currency"
            onPress={() => this.onPressSetting()}
            containerStyle={styles.listItemContainer}
            icon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FAD291' }}
                icon={{
                  type: 'font-awesome',
                  name: 'money',
                }}
              />
            }
          /><Button
          type="outline"
          title="Currency"
          onPress={() => this.onPressSetting()}
          containerStyle={styles.listItemContainer}
          icon={
            <BaseIcon
              containerStyle={{ backgroundColor: '#FAD291' }}
              icon={{
                type: 'font-awesome',
                name: 'money',
              }}
            />
          }
        />
        <Button
        title="Currency"
        type="outline"
        onPress={() => this.onPressSetting()}
        containerStyle={styles.listItemContainer}
        icon={
          <BaseIcon
            containerStyle={{ backgroundColor: '#FAD291' }}
            icon={{
              type: 'font-awesome',
              name: 'money',
            }}
          />
        }
      />
      <Button
      title="Currency"
      type="outline"
      onPress={() => this.onPressSetting()}
      containerStyle={styles.listItemContainer}
      icon={
        <BaseIcon
          containerStyle={{ backgroundColor: '#FAD291' }}
          icon={{
            type: 'font-awesome',
            name: 'money',
          }}
        />
      }
    /><Button
    type="outline"
    title="Currency"
    onPress={() => this.onPressSetting()}
    containerStyle={styles.listItemContainer}
    icon={
      <BaseIcon
        containerStyle={{ backgroundColor: '#FAD291' }}
        icon={{
          type: 'font-awesome',
          name: 'money',
        }}
      />
    }
  />
          </View>
          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default Contact
