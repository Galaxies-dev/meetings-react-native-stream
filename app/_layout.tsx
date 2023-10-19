import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const InitialLayout = () => {
  const { authState, initialized } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('INITIALIZED: ', initialized);

    if (!initialized) return;

    // Check if the path/url is in the (inside) group
    const inAuthGroup = segments[0] === '(inside)';

    if (authState?.authenticated && !inAuthGroup) {
      // Redirect authenticated users to the list page
      console.log('Redirecting to tabs');
      router.replace('/(inside)');
    } else if (!authState?.authenticated) {
      console.log('Redirecting to login');
      client?.disconnectUser();
      // Redirect unauthenticated users to the login page
      router.replace('/');
    }
  }, [initialized, authState]);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      console.log('INIT CLIENT: ', authState);
      const user: User = { id: authState.user_id! };
      console.log('create client...');

      try {
        const client = new StreamVideoClient({ apiKey: STREAM_KEY!, user, token: authState.token });
        setClient(client);
        console.log('Finished init client');
      } catch (e) {
        console.log('Error creating client: ', e);
      }
    }
  }, [authState]);

  return (
    <>
      {!client && (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      )}
      {client && (
        <StreamVideo client={client}>
          <OverlayProvider>
            <Slot />
          </OverlayProvider>
        </StreamVideo>
      )}
    </>
  );
};

// Wrap the app with the AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
