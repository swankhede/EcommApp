import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import AppCommonHeader from '../common/components/AppCommonHeader'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
const Products = ({ navigation, route }: any) => {
  const { title, trendingData } = route?.params

  const state = useSelector(state => state)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (title == '') {
      setProducts(state?.products)
    } else if (title == 'trending') {
      setProducts(trendingData)
    } else {
      const products = state?.products?.filter(prod => prod.category == title)
      setProducts(products)
    }

  }, [])

  const renderItem = ({ item }: any) => {

    return (

      <View
        style={styles.productCard}>
        <View style={{margin:10,alignSelf:'flex-end'}}>
        <FontAwesome5Icon name='heart' color={'yellow'} size={20} />
        </View>
          {
          item?.image ?
            <Image
              source={{ uri: item?.image }}
              style={{ width: '100%', height: 200 }}
              resizeMode={'contain'}
            /> :
            <Image
              source={require('../images/demo.png')}
              style={{ width: '100%', height: 200 }}
              resizeMode={'contain'}
            />

        }

        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' ,color:'black'}}>
            {item?.name}
          </Text>
          <View style={{ marginVertical: 10, padding: 5, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center',color:'black' }}>{item?.details}</Text>
            <Text style={{ color: 'grey' }}>Price: ₹{item?.price}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.addBtn}>
            <Text style={{color:'white'}}>Add</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }






  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.root}>

        <AppCommonHeader
          navigation={navigation}
          title={title}
        />


        <View style={{flex:1}}>
          <FlatList

            data={products}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={title}

          />
        </View>
      </SafeAreaView>


    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

  },
  container: {
    backgroundColor: 'orange',
    flex: 0.5,
  },


  productCard: {

    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    margin: 10,
    elevation:5,


  },
  addBtn:{
    borderRadius:10,
    backgroundColor:'green',
    marginHorizontal:10,
    bottom:10,
    alignItems:'center',
    padding:6,
  }


})

export default Products