import { View, StyleSheet, Dimensions, TouchableOpacity, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

import Spinner from 'react-native-loading-spinner-overlay';
import {
  Call,
  CallContent,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import ChatView from '../../../components/ChatView';

import CustomCallControls from '../../../components/CustomCallControls';
import CustomTopView from '../../../components/CustomTopView';
import { reactions } from '../../../components/CustomCallControls';
import { Ionicons } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();

  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={shareMeeting}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  // Join the call
  useEffect(() => {
    if (!client || call) return;

    const joinCall = async () => {
      console.log('Joining call: ', id);

      const call = client!.call('default', id);
      await call.join({ create: true });
      setCall(call);
    };

    joinCall();
  }, [call]);

  const goToHomeScreen = async () => {
    router.back();
  };

  const shareMeeting = async () => {
    Share.share({
      message: `Join my meeting: myapp://(inside)/(room)/${id}`,
    });
  };

  if (!call) return null;

  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={!call} />

      <StreamCall call={call}>
        <View style={styles.container}>
          <View style={styles.videoContainer}>
            {/* <CallContent
              onHangupCallHandler={goToHomeScreen}
              CallControls={CustomCallControls}
              CallTopView={CustomTopView}
              supportedReactions={reactions}
              layout="grid"
            /> */}
          </View>

          <View style={styles.chatContainer}>
            <ChatView channelId={id} />
          </View>
        </View>
      </StreamCall>
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
    flex: WIDTH > HEIGHT ? 0.5 : 0.8,
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
