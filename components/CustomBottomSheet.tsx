import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ChatView from './ChatView';
import Colors from '../constants/Colors';
export type Ref = BottomSheet;

interface Props {
  channelId: string;
}

// Custom Bottom Sheet to display the chat
const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const snapPoints = useMemo(() => ['15%', '100%'], []);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.primary }}
      backgroundStyle={{ backgroundColor: '#fff' }}>
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Chat</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={120}
          style={{ flex: 1 }}>
          <ChatView channelId={props.channelId} />
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    textAlign: 'center',
  },
});

export default CustomBottomSheet;
