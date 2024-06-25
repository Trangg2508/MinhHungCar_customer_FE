import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');
const itemWidth = (width - 40) / 4; // Subtract 40 for the horizontal padding and spacing between items

const data = [
  { id: 1, text: '4 chỗ', image: require('../assets/seat.png') },
  { id: 2, text: '7 chỗ', image: require('../assets/seat.png') },
  { id: 3, text: 'Xăng', image: require('../assets/gasoline.png') },
  { id: 4, text: 'Điện', image: require('../assets/electric.png') },
  { id: 5, text: 'Diesel', image: require('../assets/oil_barrel.png') },
  { id: 6, text: 'Số sàn', image: require('../assets/transmission.png') },
  { id: 7, text: 'Tự động', image: require('../assets/transmission.png') },
];

const GridItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.box}>
      <Svg height="100%" width="100%" style={styles.background}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#447eff" />
            <Stop offset="100%" stopColor="#773bff" />
          </LinearGradient>
        </Defs>
        <Rect width="50" height="50" fill="#9EA2FE" rx="10" ry="10" />
        <Image source={item.image} style={styles.image} />
      </Svg>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  </View>
);

const Category = () => (
  <ScrollView contentContainerStyle={styles.container}>
    {data.map(item => (
      <GridItem key={item.id} item={item} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 20,
    marginLeft: 9
  },
  itemContainer: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 9
  },
  box: {
    width: "100%",
    height: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    top: 10,
    left: 10
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
    width: "100%",
    marginLeft: -20,
    color: '#773BFF'
  },
});

export default Category;
