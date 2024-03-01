import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import CustomTabBar from '../common/components/CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTabs=()=> {
  const configure=() => ({
    headerShown:false,
    keyboardHidesTabBar: true,
   
  })
  return (

    <Tab.Navigator screenOptions={configure} tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="PostAdd" component={()=>null}/>
        <Tab.Screen name="Messages" component={Home} />
       
      </Tab.Navigator>
  
  );
}

export default BottomTabs
