# App
npx create-expo-app meetingsApp -t tabs

# Chat Packages
npx expo install stream-chat-expo stream-chat-react-native
npx expo install @react-native-community/netinfo expo-file-system expo-image-manipulator expo-image-picker expo-media-library react-native-gesture-handler react-native-reanimated react-native-svg expo-clipboard

# Livestream
npx expo install @stream-io/video-react-native-sdk
npx expo install @stream-io/react-native-webrtc
npx expo install @config-plugins/react-native-webrtc
npx expo install react-native-incall-manager
npx expo install @notifee/react-native

# Utils
npm install react-native-loading-spinner-overlay react-native-toast-message
npx expo install expo-secure-store
npx expo install expo-sharing

# Bottom Sheet
npm i @gorhom/bottom-sheet

# dev client
npx expo install expo-dev-client
npx expo prebuild
npx expo prebuild --clean
npx expo start --clear