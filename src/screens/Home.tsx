import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import fetchData from '../api/apiAction'
import { BASE_URL } from '../api/apiUrls'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS } from '../redux/actions'
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
    fetchData(BASE_URL)
      .then(res => {
        console.log("line 17", res)
        if (res?.products?.length > 0) {
          setIsLoading(false)
          dispatch({ type: STORE_PRODUCTS, payload: res })
        }
      })
      .catch(Error => {
        setIsLoading(false)
        console.log("Error", Error)
      })

  }

  useEffect(() => {
    if (!state?.products?.length) {
      fetchProduct()
    } else {
      const products = state?.products
      if (products?.length > 0) {
        let categories = products?.map(prod => prod?.category)
        categories = Array.from(new Set(categories))
        setCategories(categories)

        const randomData:any=getRandomData(products)
        setTrendingData(randomData)



      }
    }

  }, [state?.products?.length])

  const renderItem=({item}:any)=>{
    
    return(
      
            <View 
            style={styles.products}>
            
                
               <View style={{width:'50%',justifyContent:'center',alignItems:'center'}}>
               <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}}>{item?.name}</Text>
               <View style={{padding:5,alignItems:'center'}}>
               <Text style={{textAlign:'center'}}>{item?.details}</Text>
                <Text style={{color:'grey'}}>Price: ₹{item?.price}</Text>
               </View>
               </View>

               <View style={{width:'50%'}}>
              {
              item?.image?
              <Image
                source={{uri:item?.image}}
                style={{width:'100%',height:150}}
                resizeMode={'contain'}
                />:
                <Image
                source={require('../images/demo.png')}
                style={{width:'100%',height:150}}
                resizeMode={'contain'}
                />

            }
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
            placeholder={"What are you looking for?"}
            placeholderTextColor={'black'}
          />
        </View>

     <ScrollView>
     <View style={styles?.subContainer}>
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

          <View style={styles.categories}>
            {
              categories?.map(category =>
                <TouchableOpacity
                  onPress={() => handlePress(category)}
                  activeOpacity={0.8} style={styles.category}>
                  <View>
                    {getImages(category)}
                  </View>
                  <Text>{capitalizeFirstWord(category)}</Text>
                </TouchableOpacity>
              )
            }
          </View>
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
     </ScrollView>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

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
    padding:Platform.OS=='ios' ?20:0,
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
    borderRadius:10,
    shadowColor:'grey',
    shadowOpacity:0.5,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    elevation:10,
   

    }

})

export default Home