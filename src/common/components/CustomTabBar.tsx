import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTabBar=({ state, descriptors, navigation }:any)=> {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented && index!=1) {
              navigation.navigate(route.name);
            }
          };
  
          
  
          let iconName;
          let color='grey'
  
            if (route.name === 'HomeScreen') {
              iconName='home'
              
                
            } else if (route.name === 'Messages') {
              iconName='logo-wechat';
             
            }else if (route.name === 'PostAdd') {
              iconName='camera';
             
            }
            if(route.name === 'HomeScreen' && isFocused){
              color='orange'
            }
            if(route.name === 'Messages' && isFocused){
              color='orange'
            }
            if(route.name === 'PostAdd'){
              color='white'
            }
  
          return (
            <View style={styles.tabBar}>
              <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.8}
              style={index==1?styles.postAddBtn:null}
            >
              
              <Ionicons name={iconName} size={20}  color={color} />
              {
                index==1?
                <Text style={{ color:'black',fontWeight:'bold' }}>
                  Post AD
              </Text>:null
              }
            </TouchableOpacity>
              </View>
          );
        })}
      </View>
    );
  }
  

  const styles=StyleSheet.create({
    tabBar:{ 
      flex: 1 ,
      padding:20,
      paddingBottom:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      flexDirection:'row',
      borderTopColor:'grey',
      elevation:1
      
      
    },
    postAddBtn:{
      backgroundColor:'orange',
      bottom:40,
      width:130,
      flexDirection:'row',
      borderRadius:30,
      padding:15,
      position:'absolute',
      justifyContent:'space-around'
    }
  })

  export default CustomTabBar