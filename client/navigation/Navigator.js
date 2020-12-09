
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Register from '../screens/Register';
import Login from '../screens/Login'



const stackNavigatorOptions = {
    headreShown:false
    
}
const AppNavigator = createStackNavigator({
//     Login : {
//       screen:Login,
//         navigationOptions:{
//         title: "Inicio"
//     }
//    },

   Register : {
       screen:Register,
       navigationOptions:{
        title: "Registro"
    }

    }   
},
{
    // defaultNavigationOptions : stackNavigatorOptions
});


export default createAppContainer(AppNavigator);
