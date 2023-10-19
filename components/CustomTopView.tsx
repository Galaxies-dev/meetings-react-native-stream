import { useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { View, StyleSheet, Text } from 'react-native';

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
    width: '100%',
    height: 50,
    backgroundColor: '#0333c17c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
  },
});

export default CustomTopView;
