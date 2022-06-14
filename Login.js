import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import {Text, TouchableOpacity, View }from "react-native";
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);
  const onPress = () => setCount(prevCount => prevCount + 1);
  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
        placeholderTextColor= '#4251f5'
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor= '#4251f5'
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{console.log('Login button was clicked')}}
    >
      <Text>Login</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:300
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;