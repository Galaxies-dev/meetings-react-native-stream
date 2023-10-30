import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import Toast from 'react-native-toast-message';

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const InitialLayout = () => {
  const { authState, initialized } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const segments = useSegments();
  const router = useRouter();

  // Navigate the user to the correct page based on their authentication state
  useEffect(() => {
    if (!initialized) return;

    // Check if the path/url is in the (inside) group
    const inAuthGroup = segments[0] === '(inside)';

    if (authState?.authenticated && !inAuthGroup) {
      // Redirect authenticated users to the list page
      router.replace('/(inside)');
    } else if (!authState?.authenticated) {
      // Redirect unauthenticated users to the login page
      client?.disconnectUser();
      router.replace('/');
    }
  }, [initialized, authState]);

  // Initialize the StreamVideoClient when the user is authenticated
  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      const user: User = { id: authState.user_id! };

      try {
        const client = new StreamVideoClient({ apiKey: STREAM_KEY!, user, token: authState.token });
        setClient(client);
      } catch (e) {
        console.log('Error creating client: ', e);
      }
    }
  }, [authState]);

  // Conditionally render the correct layout
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
            <Toast />
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
