import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Register from "../screens/Register";
import Login from "../screens/Login";
import PreRegister from "../screens/preRegister";

const stackNavigatorOptions = {
  headreShown: false,
};
const AppNavigator = createStackNavigator(
  {
    // Login: {
    //   screen: Login,
    //   navigationOptions: {
    //     title: "Inicio",
    //   },
    // },

    Register: {
      screen: Register,
      navigationOptions: {
        title: "Registro",
      },
    },

    // PreRegister: {
    //   screen: PreRegister,
    //   navigationOptions: {
    //     title: "pre-Registro",
    //   },
    // },
  },
  {
    // defaultNavigationOptions : stackNavigatorOptions
  }
);

export default createAppContainer(AppNavigator);
