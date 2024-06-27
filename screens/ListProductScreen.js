
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthConText } from '../store/auth-context';
import { useIsFocused, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { apiCar } from '../api/apiConfig';
import { Divider } from 'react-native-paper';

const categories = [
  {
    img: require('../assets/global.png'),
    label: 'Hãng xe',
  },
  {
    img: require('../assets/seat.png'),
    label: 'Số chỗ',
  },
  {
    img: require('../assets/gasoline.png'),
    label: 'Nhiên liệu',
  },
  {
    img: require('../assets/gear_stick.png'),
    label: 'Truyền động',
  },
];

export default function ListProductScreen({ navigation }) {
  const authCtx = useContext(AuthConText);
  const token = authCtx.access_token;
  const route = useRoute();
  const { startDate, endDate } = route.params;


  const isFocused = useIsFocused();
  const [carList, setCarList] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [motions, setMotions] = useState([]);
  const [seats, setSeats] = useState([]);
  const [parkingLots, setParkingLots] = useState([]);

  useEffect(() => {
    filterCar();
  }, [isFocused, brands, fuels, motions, seats, parkingLots]);

  const filterCar = async () => {
    try {
      const response = await axios.get(`${apiCar.filterCar}`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          brands: brands.join(','),
          fuels: fuels.join(','),
          motions: motions.join(','),
          seats: seats.join(','),
          parking_lots: parkingLots.join(','),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCarList(response.data);
    } catch (error) {
      console.log('Failed to filter car by date: ', error);
      // Handle error state or further actions
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          {/* Search bar */}
          <View style={styles.searchBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image style={styles.backButton} source={require('../assets/arrow_back.png')} />
            </TouchableOpacity>
            <View style={styles.searchInput}>
              <Text style={styles.searchText}>20h,08/05/ 2024 - 19h,09/05/2024</Text>
              <Image style={styles.searchIcon} source={require('../assets/search.png')} />
            </View>
          </View>

          {/* Category bar */}
          <ScrollView contentContainerStyle={styles.categoryBar} horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(({ img, label }, index) => (
              <TouchableOpacity key={index} onPress={() => { }}>
                <View style={styles.categoryItem}>
                  <Image source={img} style={styles.categoryIcon} />
                  <Text style={styles.categoryLabel}>{label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Car list */}
          <View style={styles.carListContainer}>
            {carList.map((car) => (
              <TouchableOpacity
                key={car.id}
                onPress={() => navigation.navigate('Detail', { carId: car.id, startDate: startDate, endDate: endDate })}
                style={styles.carItem}>
                <Image source={{ uri: car.images[0] }} style={styles.carImage} />
                <View style={styles.carDetails}>
                  <Text style={styles.carName}>
                    {car.car_model.brand} {car.car_model.model} {car.car_model.year}
                  </Text>


                  <View style={styles.carFooter}>
                    <View style={styles.starContainer}>
                      <Image source={require('../assets/star.png')} style={styles.starIcon} />
                      <Text style={styles.rating}>{car.rating}</Text>
                    </View>
                    <View style={styles.tripContainer}>
                      <Image source={require('../assets/completeTrip.png')} style={styles.tripIcon} />
                      <Text style={styles.tripCount}>{car.total_trip} chuyến</Text>
                    </View>
                  </View>
                  <Divider style={{ marginTop: 15 }} />
                  <View style={{ marginTop: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Text style={styles.carPrice}>{car.price.toLocaleString('en-US')} VNĐ / ngày</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    marginHorizontal: 13,
    marginVertical: 15,
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    width: 35,
    height: 35,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#E6E6E6',
    padding: 16,
  },
  searchText: {
    fontWeight: '600',
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  categoryBar: {
    paddingHorizontal: 18,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  categoryItem: {
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderColor: '#DADADA',
    borderWidth: 1,
  },
  categoryIcon: {
    width: 25,
    height: 25,
    marginBottom: 12,
  },
  categoryLabel: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    color: '#252117',
  },
  carListContainer: {
    paddingHorizontal: 24,
    marginVertical: 20
  },
  carItem: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  carImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  carDetails: {
    padding: 18,
  },
  carName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#232425',
  },
  carPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5457FB'
  },
  carFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    // marginBottom: 10
  },
  starIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
  },
  tripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  tripCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
  },
});
