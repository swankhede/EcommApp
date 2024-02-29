import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { capitalizeFirstWord } from '../commonFunctions'


const AppCommonHeader = ({navigation,title}) => {
  return (
    <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <FontAwesome5Icon name='chevron-left' color={'black'} size={25}/>
            </TouchableOpacity>
       
            <View style={{flex:1}}>
            <Text style={styles.title}>
                {title!=''?capitalizeFirstWord(title):"All Products"}
                </Text>
            </View>
        </View>
      
    
  )
}

const styles=StyleSheet.create({
    header:{
        padding:20,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    
      },
      title:{
        textAlign:'center',
      fontWeight:'bold',
      fontSize:20,
        color:'black'
    }
})  

export default AppCommonHeader