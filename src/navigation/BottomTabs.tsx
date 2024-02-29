import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Prodcuts from '../screens/Products';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabs=()=> {
    const configure=({ route }) => ({
        headerShown:false,
        tabBarStyle:{
            borderColor:'',
            // bottom:20,
            // width:'80%',
            // alignSelf:'center',
            // borderRadius:500,
            // display:'flex',
            // alignItems:'center'
        },
        keyboardHidesTabBar: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName='home'
              
          } else if (route.name === 'Messages') {
            iconName='logo-wechat';
          }
          else if (route.name === 'Search') {
            iconName='search';
          }else if (route.name === 'Account') {
            iconName='person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#EA3C16',
        tabBarInactiveTintColor: 'gray',
      })

  return (
    <Tab.Navigator screenOptions={configure}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Messages" component={Home} />
    </Tab.Navigator>
  );
}
export default BottomTabs