import React from 'react';
import { View, Text, } from 'react-native';


function Vote(){
    return (
      <View style={{ flex: 1, backgroundColor:'#2ecc71', justifyContent: 'center', alignItems: 'center'}}>  
        <Text>L'hôte vote ici</Text>
      </View>
    );
  }

  export default Vote;