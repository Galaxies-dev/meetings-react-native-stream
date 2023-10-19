import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import Spinner from 'react-native-loading-spinner-overlay';
import {
  Call,
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import ChatView from '../../../components/ChatView';
import Colors from '../../../constants/Colors';
import CustomCallControls from '../../../components/CustomCallControls';
import CustomTopView from '../../../components/CustomTopView';
import { reactions } from '../../../components/CustomCallControls';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();

  // Join the call for the workout
  useEffect(() => {
    if (!client || call) return;
    console.log('Joining call');
    const joinCall = async () => {
      const call = client!.call('default', id);
      console.log('Call created: ');

      await call.join({ create: true });
      console.log('Call joined: ');

      setCall(call);
    };

    joinCall();
  }, [call]);

  // Clean up the call when we leave the page
  const goToHomeScreen = async () => {
    // leaveCall();
    router.back();
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('UNFOCUS');
        leaveCall();
      };
    }, [])
  );

  const leaveCall = async () => {
    try {
      await call?.leave();
    } catch (e) {
      console.log('Error leaving call here');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={!call} />

      {call && (
        <StreamCall call={call}>
          <View style={styles.container}>
            <View style={styles.videoContainer}>
              <CallContent
                onHangupCallHandler={goToHomeScreen}
                landscape={true}
                CallControls={CustomCallControls}
                CallTopView={CustomTopView}
                supportedReactions={reactions}
                // layout="spotlight"
              />
            </View>

            <View style={styles.chatContainer}>{/* <ChatView channelId={id} /> */}</View>
          </View>
        </StreamCall>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 0.5,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Page;
