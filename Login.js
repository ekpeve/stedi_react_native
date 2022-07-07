import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import {Text, TouchableOpacity, View }from "react-native";

var uname = "";
export function set_uname(e) {uname = e; }
export function get_uname() {return uname; }


const sendText=async (phoneNumber)=>{
  console.log("PhoneNumber: ",phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  })

}

const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn}) =>{
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/json'
    }
  });

  const responseCode = tokenResponse.status;//200 means logged in successfully
  console.log("Response Status Code", responseCode);

  

  const tokenResponseString = await tokenResponse.text();
  console.log("Token", tokenResponseString);

  let loggedInUser_response = await fetch("https://dev.stedi.me/validate/" + tokenResponseString, {
    method: "GET",
    headers: {"content-type":"application/text"}
  });

  const loggedInUser = await loggedInUser_response.text();
  console.log(loggedInUser);
  set_uname(loggedInUser);

  if(responseCode==200){
    setUserLoggedIn(true);
  }
}

const Login = (props) => {
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
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          sendText(phoneNumber);
        }}
    >
        <Text>Send OTP</Text>
      </TouchableOpacity>
      
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
        onPress={()=>{
          getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn });
        //props.setUserLoggedIn(true)
        }}
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