import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { useAuth } from '../context/AuthContext';
import {
  Channel,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  OverlayProvider,
} from 'stream-chat-expo';
import { Channel as ChannelType } from 'stream-chat';

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

type Props = {
  channelId: string;
};

const ChatView = ({ channelId }: Props) => {
  const chatClient = StreamChat.getInstance(STREAM_KEY!);
  const { authState } = useAuth();
  const [channel, setChannel] = useState<ChannelType<DefaultStreamChatGenerics> | undefined>(
    undefined
  );

  useEffect(() => {
    const connectToChannel = async () => {
      const user = { id: authState?.user_id! };

      await chatClient.connectUser(user, authState?.token!);
      const channel = chatClient.channel('messaging', channelId);

      setChannel(channel);
      await channel.watch();
    };

    connectToChannel();

    return () => {
      console.log('Disconnecting user from chat...');
      channel?.stopWatching();
      chatClient.disconnectUser();
    };
  }, []);

  return (
    <>
      {chatClient && channel ? (
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <MessageList />

            <MessageInput />
          </Channel>
        </Chat>
      ) : (
        <View>
          <Text>Loading Chat...</Text>
        </View>
      )}
    </>
  );
};

export default ChatView;
