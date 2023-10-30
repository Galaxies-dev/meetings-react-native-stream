import {
  Text,
  StyleSheet,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuth } from '../context/AuthContext';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { onLogin, onRegister } = useAuth();

  // Sign in with email and password
  const onSignInPress = async () => {
    setLoading(true);

    try {
      const result = await onLogin!(email, password);
    } catch (e) {
      Alert.alert('Error', 'Could not log in');
    } finally {
      setLoading(false);
    }
  };

  // Create a new user
  const onSignUpPress = async () => {
    setLoading(true);
    try {
      const result = await onRegister!(email, password);
    } catch (e) {
      Alert.alert('Error', 'Could not log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Spinner visible={loading} />
      <Text style={styles.header}>Meet Me</Text>
      <Text style={styles.subheader}>The fastest way to meet</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="john@doe.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={{ color: '#fff' }}>Sign in</Text>
      </TouchableOpacity>
      <Button onPress={onSignUpPress} title="Create Account" color={Colors.primary}></Button>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: '20%',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 4,
  },
});
export default Page;
