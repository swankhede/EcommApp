import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './BottomTabs'
import { createStackNavigator } from '@react-navigation/stack'
import Products from '../screens/Products'
import Home from '../screens/Home'
const Stack=createStackNavigator()


import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerComponent=()=> {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Home" component={BottomTabs} />
      
    </Drawer.Navigator>
  );
}

const MainStack=()=>(
 
<NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Drawer"
          component={DrawerComponent}
          
        />
        <Stack.Screen name="Products" component={Products} />
       
      </Stack.Navigator>
    </NavigationContainer>

)

export default MainStack