import { useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { View, StyleSheet, Text } from 'react-native';

// Custom View to display the number of participants in the call
const CustomTopView = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <View style={styles.topContainer}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.topText}>
        {participants.length} participant{participants.length > 1 ? 's' : ''} in the Video Call
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: '75%',
    position: 'absolute',
    left: '25%',
    height: 50,
    backgroundColor: '#0333c17c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
    fontSize: 14,
    padding: 10,
  },
});

export default CustomTopView;
