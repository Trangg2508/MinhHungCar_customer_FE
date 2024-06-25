import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const IMAGES = [
  'https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dGVzbGElMjBtb2RlbCUyMHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1639358336404-b847ac2a3272?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  'https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlc2xhJTIwbW9kZWwlMjBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];

const characters = [
  {
    img: require('../assets/transmission.png'),
    label: 'Truyền động',
    content: 'Số tự động'
  },
  {
    img: require('../assets/seat.png'),
    label: 'Số ghế',
    content: '4 chỗ'
  },
  {
    img: require('../assets/gasoline.png'),
    label: 'Nhiên liệu',
    content: 'Điện'
  },
];

const comments = [
  {
    id: 1,
    author: 'Jane Doe',
    authorAvatar: 'https://www.bootdey.com/img/Content/avatar/avatar2.png',
    text: 'Dịch vụ tốt!',
  },
  {
    id: 2,
    author: 'John Smith',
    authorAvatar: 'https://www.bootdey.com/img/Content/avatar/avatar3.png',
    text: 'Xe chất lượng ok, giá cả hợp lý, MinhHungCar hỗ trợ khách hàng nhiệt tình',
  },
];

export default function DetailScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon
                  color="#000"
                  name="arrow-left"
                  size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>Tesla Model S</Text>

            <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon
                  color="#000"
                  name="more-vertical"
                  size={24} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.photos}>
              {/* <View style={styles.photosTop}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.photosTopItem}>
                  <FeatherIcon color="#000" name="star" size={18} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.photosTopItem}>
                  <FeatherIcon
                    color="#000"
                    name="share"
                    size={16} />
                </TouchableOpacity>
              </View> */}

              <Swiper
                renderPagination={(index, total) => (
                  <View style={styles.photosPagination}>
                    <Text style={styles.photosPaginationText}>
                      {index + 1} of {total}
                    </Text>
                  </View>
                )}>
                {IMAGES.map((src, index) => (
                  <Image
                    alt=""
                    key={index}
                    source={{ uri: src }}
                    style={styles.photosImg} />
                ))}
              </Swiper>
            </View>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.picker}>
              <FeatherIcon color="#000" name="calendar" size={18} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.pickerDates}>
                  <Text style={{ marginBottom: 2, color: "grey", fontSize: 15 }}>
                    Thời gian nhận xe
                  </Text>
                  <Text style={styles.pickerDatesText}>
                    Sun, Feb 26 at 10:00 AM
                  </Text>
                </View>
                <View style={styles.pickerAction}>
                  <Text style={styles.pickerActionText}>Change</Text>
                  <FeatherIcon
                    color="#4C6CFD"
                    name="chevron-right"
                    size={18} />
                </View>
              </View>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.picker}>
              <FeatherIcon color="#000" name="calendar" size={18} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.pickerDates}>
                  <Text style={{ marginBottom: 2, color: "grey", fontSize: 15 }}>
                    Thời gian trả xe
                  </Text>
                  <Text style={styles.pickerDatesText}>
                    Sun, Feb 26 at 10:00 AM
                  </Text>
                </View>
                <View style={styles.pickerAction}>
                  <Text style={styles.pickerActionText}>Change</Text>
                  <FeatherIcon
                    color="#4C6CFD"
                    name="chevron-right"
                    size={18} />
                </View>
              </View>

            </TouchableOpacity>

            <View style={styles.info}>
              <Text style={styles.infoTitle}>Tesla Model S 2022</Text>

              <View style={styles.infoRating}>
                <Text style={styles.infoRatingLabel}>5.0</Text>

                <FeatherIcon
                  color="#4c6cfd"
                  name="star"
                  size={15} />

                <Text style={styles.infoRatingText}>(7 ratings)</Text>
              </View>

              <Text style={styles.infoDescription}>
                Tesla 2022 mới có viền lưới tản nhiệt đổi từ mạ crôm sang đen. La-zăng 16 inch trên hai bản Premium và Luxury có thiết kế mới. Kiểu dáng tổng thể vẫn giữ nguyên như bản tiền nhiệm.
              </Text>
            </View>

            <Divider style={{ marginTop: 20 }} />
            <View style={styles.character}>
              <Text style={styles.characterTitle}>Đặc điểm</Text>
              <View
                style={styles.characterContent}
              >
                {characters.map(({ img, label, content }, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.card}>
                      <Image source={img} style={styles.cardImg} />
                      <Text style={styles.cardLabel}>{label}</Text>
                      <Text style={styles.cardContent}>{content}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Divider style={{ marginBottom: 5 }} />
            <View style={styles.require}>
              <Text style={styles.requireTitle}>Giấy tờ thuê xe</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginLeft: 8 }}>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/IDCard.png')} />
                <Text style={styles.requireContent}> Xuất trình đầy đủ GPLX, CCCD (chụp hình đối chiếu) hoặc Hộ chiếu (passport) bản gốc giữ lại</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, marginLeft: 8 }}>
                <Image style={{ width: 35, height: 35 }} source={require('../assets/money.png')} />
                <Text style={styles.requireContent}>Đặt cọc tài sản thế chấp tiền mặt(15 triệu hoặc theo thỏa thuận) hoặc xe máy có giá trị tương đương 15 triệu trở lên (xe máy và cavet gốc) trước khi nhận xe.</Text>
              </View>
            </View>

            <Divider style={{ marginTop: 10, marginBottom: 5 }} />
            <View style={styles.regulation}>
              <Text style={styles.regulationTitle}>Điều khoản</Text>
              <View style={styles.containerRegulation}>
                <View style={styles.bullet}>
                  <Text>{'\u2022'}</Text>
                </View>
                <View style={styles.bulletTextContainer}>
                  <Text style={styles.bulletText}>
                    Sử dụng xe đúng mục đích.
                  </Text>
                </View>
              </View>
              <View style={styles.containerRegulation}>
                <View style={styles.bullet}>
                  <Text>{'\u2022'}</Text>
                </View>
                <View style={styles.bulletTextContainer}>
                  <Text style={styles.bulletText}>
                    Không hút thuốc, nhả kẹo cao su, xả rác trong xe.
                  </Text>
                </View>
              </View>
              <View style={styles.containerRegulation}>
                <View style={styles.bullet}>
                  <Text>{'\u2022'}</Text>
                </View>
                <View style={styles.bulletTextContainer}>
                  <Text style={styles.bulletText}>
                    Không chở hàng quốc cấm, hàng dễ cháy nổ.
                  </Text>
                </View>
              </View>
              <View style={styles.containerRegulation}>
                <View style={styles.bullet}>
                  <Text>{'\u2022'}</Text>
                </View>
                <View style={styles.bulletTextContainer}>
                  <Text style={styles.bulletText}>
                    Không chở hoa quả, thực phẩm nặng mùi trong xe.
                  </Text>
                </View>
              </View>
              <View style={styles.containerRegulation}>
                <View style={styles.bullet}>
                  <Text>{'\u2022'}</Text>
                </View>
                <View style={styles.bulletTextContainer}>
                  <Text style={styles.bulletText}>
                    Không sử dụng xe thuê vào mục đích phi pháp, trái  pháp luật...
                  </Text>
                </View>
              </View>
            </View>

            <Divider style={{ marginTop: 20, marginBottom: 5 }} />
            <View style={styles.comment}>
              <Text style={styles.commentTitle}>Đánh giá</Text>
              <View>
                {comments.map((item) => (
                  <View key={item.id.toString()} style={styles.commentContainer}>
                    <Image source={{ uri: item.authorAvatar }} style={styles.commentAvatar} />
                    <View style={styles.commentTextContainer}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.commentAuthor}>{item.author}</Text>
                        <Text style={styles.commentDate}>19/05/2024</Text>
                      </View>

                      <View style={styles.commentRating}>
                        <Image source={require('../assets/star.png')} style={{width: 20, height: 20}}/>
                        <Text>5</Text>
                      </View>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  </View>
                ))}
                <TouchableOpacity 
                style={styles.seeMoreContainer} 
                onPress={() => {

                }}>
                  
                      <Text style={styles.seeMore}>Xem thêm</Text>
                   
                  </TouchableOpacity>
              </View>



            </View>

          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>

            <Text style={styles.overlayContentPrice}>683.000 đ/ngày</Text>
          </View>

        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Checkout')
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Chọn thuê</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  /** Photos */
  photos: {
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },
  photosPagination: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#fbfbfb',
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
  },
  /** Picker */
  picker: {
    marginTop: 12,
    paddingTop: 0,
    paddingBottom: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 15,
    fontWeight: '500',
  },
  pickerAction: {
    marginLeft: 'auto',
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  pickerActionText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    color: '#4c6cfd',
  },
  /** Info */
  info: {
    marginTop: 12,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  infoRating: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRatingLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 2,
  },
  infoRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    marginLeft: 2,
  },
  infoDescription: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#8e8e93',
  },
  /** character */
  character: {
    marginTop: 3,
    // backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: -15
  },
  characterTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  characterContent: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  /** Card */
  card: {
    width: 100,
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cardImg: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  cardLabel: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 18,
    color: '#838383',
  },
  cardContent: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: 'black',
    marginTop: 4
  },
  /** require */
  require: {
    marginTop: 0,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: -15

  },
  requireTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  requireContent: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 18,
    fontSize: 13,
    color: '#6E6D6D'
  },
  /** regulation */
  regulation: {
    marginTop: 0,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: -15
  },
  regulationTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  containerRegulation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 2,
  },
  bullet: {
    width: 10,
  },
  bulletTextContainer: {
    flex: 1,
    paddingLeft: 5,
  },
  bulletText: {
    lineHeight: 18,
    fontSize: 13,
    color: '#6E6D6D'
  },
  /** comment */
  comment: {
    marginTop: 0,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: -15
  },
  commentTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginVertical: 8,
    borderRadius: 8,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 15
  },
  commentDate: {
    color: '#787878',
    marginTop: 2,
    fontSize: 13
  },
  commentRating: {
    marginTop: 5,
    flexDirection: 'row',
  },
  commentText: {
    color: '#333',
    marginTop: 5,
    fontSize: 13
  },
  seeMoreContainer: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#828282',
    marginVertical: 8,
    borderRadius: 5,
    justifyContent: 'center'
  },
  seeMore: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  /** Overlay */
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  overlayContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  overlayContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },

  overlayContentPrice: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#5457FB',
  },

  /** Button */
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#773BFF',
    borderColor: '#773BFF',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});