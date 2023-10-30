import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { rooms } from '../../assets/data/rooms';
import { Link, useRouter } from 'expo-router';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const Page = () => {
  const router = useRouter();

  // Create random id and navigate to the room
  const onStartMeeting = async () => {
    const randomId = Math.floor(Math.random() * 1000000000).toString();
    router.push(`/(inside)/(room)/${randomId}`);
  };

  // Prompt user to enter a call id and navigate to the room
  const onJoinMeeting = () => {
    Alert.prompt(
      'Join',
      'Please enter your Call ID:',
      (id) => {
        console.log('Joining call: ', id);
        router.push(`/(inside)/(room)/${id}`);
      },
      'plain-text'
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={onStartMeeting} style={styles.button}>
          <Ionicons name="videocam-outline" size={24} />
          <Text style={styles.buttonText}>Start new Meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onJoinMeeting} style={styles.button}>
          <Ionicons name="business-outline" size={24} />
          <Text style={styles.buttonText}>Join Meeting by ID</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: Colors.secondary,
    margin: 20,
    padding: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
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
