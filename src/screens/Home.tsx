import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, Platform, Alert, ActionSheetIOS, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import fetchData from '../api/apiAction'
import { BASE_URL } from '../api/apiUrls'
import { useDispatch, useSelector } from 'react-redux'
import {STORE_PRODUCTS_FAILURE, STORE_PRODUCTS_REQUEST, STORE_PRODUCTS_SUCCESS } from '../redux/actions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { capitalizeFirstWord, getRandomData } from '../common/commonFunctions'

const Home = ({ navigation }: any) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [categories, setCategories] = useState([])
  const [trendingData,setTrendingData]=useState([])
  const[isLoading,setIsLoading]=useState(false)


  const fetchProduct = async () => {
    setIsLoading(true)
    dispatch({ type: STORE_PRODUCTS_REQUEST})
    fetchData(BASE_URL)
      .then(res => {
       
        if (res?.products?.length > 0) {
          setIsLoading(false)
          dispatch({ type: STORE_PRODUCTS_SUCCESS, payload: res })
        }
      })
      .catch(Error => {
        setIsLoading(false)
        dispatch({ type: STORE_PRODUCTS_FAILURE})
        Alert.alert("Something went wrong",Error)
        console.log("Error", Error)
      })

  }

  useEffect(()=>{
    fetchProduct()
  },[])

  useEffect(() => {
   
      const products = state?.products
      if (products?.length > 0) {
        let categories = products?.map(prod => prod?.category)
        categories = Array.from(new Set(categories))
        setCategories(categories)

        const randomData:any=getRandomData(products)
        setTrendingData(randomData)



      }
    

  }, [state?.products?.length])

  const renderItem = ({ item }: any) => {

    return (
    <View style={styles.products}>
      <View style={{ width: '50%',}}>
        <Text style={styles.trendTitle}>{item?.name}</Text>
      
        {item?.price?
        <Text 
        style={{ color: 'black',fontWeight:500,fontSize:18,paddingBottom:10,}}>
          ₹{item?.price}</Text>
          :null
          }
        
          <Text  numberOfLines={2}>{item?.details}</Text>
          
       
     
      </View>

      <View style={{ width: '50%' }}>
          <Image
              source={item?.image ?{ uri: item?.image }:require('../images/demo.png')}
              style={{ width: '100%', height: 150 }}
              resizeMode={'contain'}
            /> 
            

        
      </View>

    </View>

    )
  }



  const getImages = (category: string) => {
    switch (category) {
      case 'electronics': return <Image
        source={require('../images/electronics.png')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />
      case 'properties': return <Image
        source={require('../images/home.png')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />
      case 'jobs': return <Image
        source={require('../images/jobs.png')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />
      case 'furniture': return <Image
        source={require('../images/furniture.jpeg')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />
      case 'cars': return <Image
        source={require('../images/cars.png')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />

      case 'bikes': return <Image
        source={require('../images/bike.png')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />



      case 'mobiles': return <Image
        source={require('../images/mobile.jpeg')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />
      case 'pets': return <Image
        source={require('../images/pets.jpeg')}
        resizeMode={'contain'}
        style={{ width: 50, height: 50 }}
      />

    }
  }

  const handlePress = (category: string='') => {
    if(category=='trending'){
      navigation.navigate('Products', { title: 'trending' ,trendingData})
    }else if(category=='All Products'){
    navigation.navigate('Products', { title: 'All Products' })
    }else {
      navigation.navigate('Products', { title: category })
    }
  }



  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{paddingHorizontal:20,flexDirection:'row',justifyContent:'space-between'}}>
       <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
       <FontAwesome5Icon name='bars' color={'black'} size={25} />
       </TouchableOpacity>

        <FontAwesome5Icon name='bell' color={'black'} size={25} />
        </View>
        </View>
      </SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.searchBarContainer}>
          <View style={{padding:Platform.OS=='ios'?0:15}}>
          <FontAwesome5Icon name='search' color={'orange'} size={15} />
          </View>
          <TextInput
            style={styles.searchBar}
            placeholder={"What're you looking for?"}
            placeholderTextColor={'grey'}
          />
        </View>

     <ScrollView>
     <View>
          <View style={styles.header}>
            <Text>
              Shop for
            </Text>
            <TouchableOpacity onPress={()=>handlePress()}>
            <Text style={{ color: 'orange' }}>
              Show all
            </Text>
            </TouchableOpacity>
          </View>

          {isLoading?
          <ActivityIndicator size="small" color="orange" />
          :categories?.length>0?
            <View style={styles.categories}>
            {
              categories?.map(category =>
                <TouchableOpacity
                  key={category?.id}
                  onPress={() => handlePress(category)}
                  activeOpacity={0.8} style={styles.category}>
                  <View>
                    {getImages(category)}
                  </View>
                  <Text>{capitalizeFirstWord(category)}</Text>
                </TouchableOpacity>
              )
            }
          </View>:null
          }
          {trendingData?.length>0 && !isLoading?
            <View>
            <View style={styles.header}>
              <Text style={{fontWeight:400}}>Trending</Text>
              <TouchableOpacity
              onPress={()=>handlePress('trending')}
              >
                <Text style={{color:'orange'}}>Show all</Text>
              </TouchableOpacity>
            </View>
            
            
              <FlatList
            data={trendingData}
            extraData={state}
            renderItem={renderItem}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}

            
            />
            </View>
            :null
          }
          
        </View>
     </ScrollView>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'whitesmoke'

  },
  container: {
    backgroundColor: 'orange',
    flex: 0.4,
  },
  mainContainer: {
    flex: 1,

  },

  searchBarContainer: {
    width: '90%',
    flexDirection: 'row',
    padding:Platform.OS=='ios' ?17:0,
    backgroundColor: 'white',
    alignSelf: 'center',
    bottom: 30,
    borderRadius: 20,
    shadowColor: 'grey',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 30,
    shadowOpacity: 0.3
  },
  searchBar: {
    marginHorizontal: 10,


  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-around'
  },
  category: {
    width: 80,
    height: 100,
    backgroundColor: 'white',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:5,
    borderRadius:5,
  },
  products:
  {
    flexDirection:'row',
    backgroundColor:'white',
    flex:1,
    width:'30%',
    borderRadius:10,
    shadowColor:'grey',
    shadowOpacity:0.5,
    margin:10,
    padding:5,
    elevation:10,
   

    },
   trendTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color:'black'
    ,
    paddingBottom:10,

  }

})

export default Home