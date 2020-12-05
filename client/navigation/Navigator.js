
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Register from '../screens/Register';



const stackNavigatorOptions = {
    headreShown:false
    
}
const AppNavigator = createStackNavigator({
    Register : {screen:Register}
},
{
    defaultNavigationOptions : stackNavigatorOptions
}
);


export default createAppContainer(AppNavigator);
