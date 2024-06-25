import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const categories = [
  {
    img: require('../assets/global.png'),
    label: 'Hãng xe',
  },
  {
    img: require('../assets/seat.png'),
    label: 'Số ghế',
  },
  {
    img: require('../assets/gasoline.png'),
    label: 'Nhiên liệu',
  },
  {
    img: require('../assets/gear_stick.png'),
    label: 'Truyền động',
  },
  {
    img: require('../assets/sale.png'),
    label: 'Giá tốt',
  },
];

const items = [
  {
    img: 'https://images.unsplash.com/photo-1623659248894-1a0272243054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2405&q=80',
    name: 'Audi R8',
    price: 158600,
    stars: 4.45,
    reviews: 124,
    saved: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    name: 'Porsche 911',
    price: 160100,
    stars: 4.81,
    reviews: 409,
    saved: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1590656364826-5f13b8e32cdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
    name: 'Nissan GTR',
    price: 225500,
    stars: 4.3,
    reviews: 72,
    saved: false,
  },
];


export default function FavoriteScreen({navigation}) {
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 24 }}>
        <ScrollView>
          {/* ListCard */}
          <View style={{ paddingHorizontal: 24 }}>
            {items.map(({ img, name, price, stars, reviews, saved }, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('Detail')
                  }}>
                  <View style={styles.card}>
                    <View style={styles.cardLikeWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          // handle onPress
                        }}>
                        <View style={styles.cardLike}>
                          <Image source={require('../assets/heart_red.png')} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardTop}>
                      <Image
                        alt=""
                        resizeMode="cover"
                        style={styles.cardImg}
                        source={{ uri: img }} />
                    </View>
                    <View style={styles.cardBody}>
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{name}</Text>
                        <Text style={styles.cardPrice}>
                          <Text style={{ fontWeight: '600' }}>{price.toLocaleString('en-US')} đ </Text>/
                          ngày
                        </Text>
                      </View>
                      <View style={styles.cardFooter}>
                        <Image style={{width: 15, height: 15}} source={require('../assets/star.png')} />
                        <Text style={styles.cardStars}>{stars}</Text>
                        <Text style={styles.cardReviews}>({reviews} reviews)</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    paddingHorizontal: 24,
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** List */
  list: {
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: '#323142',
  },
  listAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listActionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#706f7b',
    marginRight: 2,
  },
  listContent: {
    paddingBottom: 18,
    paddingTop: 5,
    paddingHorizontal: 18,
  },
  /** tag */
  tag: {
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  tagImg: {
    width: 25,
    height: 25,
    marginBottom: 12,
  },
  tagLabel: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    color: '#252117',
  },
  /** Card */
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#232425',
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '400',
    color: '#232425',
  },
  cardFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#232425',
  },
  cardReviews: {
    fontSize: 14,
    fontWeight: '400',
    color: '#595a63',
  },
});