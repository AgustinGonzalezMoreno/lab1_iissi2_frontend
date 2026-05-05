import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, Pressable, View } from 'react-native'
import { getAll } from '../../api/RestaurantEndpoints'
import TextSemiBold from '../../components/TextSemiBold'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import { API_BASE_URL } from '@env'

export default function RestaurantsScreen({ navigation, route }) {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    console.log('Loading restaurants, please wait 2 seconds')
    setTimeout(() => {
      setRestaurants(getAll)
      console.log('Restaurants loaded')
    }, 2000)
  }, [])

  const renderRestaurant = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}
      >
        <TextRegular>{item.name}</TextRegular>
      </Pressable>
    )
  }

  return (
    <FlatList
      style={styles.container}
      data={restaurants}
      renderItem={renderRestaurant}
      keyExtractor={item => item.id.toString()}
    />
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
  }
})
