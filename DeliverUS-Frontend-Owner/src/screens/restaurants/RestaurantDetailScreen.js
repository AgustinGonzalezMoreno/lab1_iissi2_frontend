import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import { getDetail } from '../../api/RestaurantEndpoints'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantDetailScreen({ route }) {
  const [restaurant, setRestaurant] = useState({})

  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurant(getDetail(route.params.id))
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])

  const renderProduct = ({ item }) => {
    return (
      <Pressable style={styles.row} onPress={() => {}}>
        <TextRegular>{item.name}</TextRegular>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <TextRegular style={styles.textTitle}>{restaurant.name}</TextRegular>

      <TextRegular style={styles.text}>{restaurant.description}</TextRegular>

      <TextRegular style={styles.text}>
        shippingCosts: {restaurant.shippingCosts}
      </TextRegular>

      <FlatList
        style={styles.container}
        data={restaurant.products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  text: {
    marginHorizontal: 10,
    marginBottom: 10
  },
  textTitle: {
    fontSize: 20,
    margin: 10
  }
})
