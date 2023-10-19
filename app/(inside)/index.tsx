import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { rooms } from '../../assets/data/rooms';
import { Link } from 'expo-router';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const onStartMeeting = () => {
    console.log('Start Meeting');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <TouchableOpacity onPress={onStartMeeting} style={styles.button}>
        <Ionicons name="videocam" size={24} color="white" />
        <Text style={styles.buttonText}>Start new Meeting</Text>
      </TouchableOpacity>
      <View style={styles.divider}>
        <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#000' }} />
        <Text style={{ fontSize: 18 }}>or join public room</Text>
        <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#000' }} />
      </View>

      <View style={styles.wrapper}>
        {rooms.map((room, index) => (
          <Link href={`/(inside)/(room)/${room.id}`} key={index} asChild>
            <TouchableOpacity>
              <ImageBackground
                key={index}
                source={room.img}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}>
                <View style={styles.overlay}>
                  <Text style={styles.text}>{room.name}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
    gap: 20,
  },
  button: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b83fe',
    margin: 20,
    padding: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },

  image: {
    width: WIDTH > HEIGHT ? WIDTH / 4 - 30 : WIDTH - 40,
    height: 300,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Page;
