import React from "react";
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function Setting(props) {
  var uname = props.loggedInUser;
  if (uname == undefined){uname = "Guest";}
    return(
      <View>
        <Text>Welcome, {uname}!</Text>
      </View>
    )
  }

export default Setting;