import React, {useState} from 'react';
import {  AppRegistry, View, Dimensions, StyleSheet, ImageBackground, Text , Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


function homeinvite() {
  

    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <View>
                <Image 
                        source={require('../assets/logoMini.png')}
                        style={{ width: 90, height: 92, marginBottom: 20, marginTop: 30}}
                    />
                </View>
                
                <Icon
                    name="power-off"
                    size={30}
                    color="#fff"
                    style={{position:'relative', left:10}}
                    />
                    
            
                
            </View>
            <View style={styles.wrap}>
                <Image 
                    source={require('../assets/picto-fete2.png')}
                    style={{ width: 150, height: 150 }}
                />
            </View>
        </View>


  );
}
const styles = StyleSheet.create({
    container: {
      flex:1,
     
      
    },
    wrap: {
        flexDirection: 'column',
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: hp('100%'), // 70% of height device screen
        width: wp('100%')   // 80% of width device screen 
      },
    header: {
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",

        
    },
    title: {
      color: '#fff',
      fontSize: 40,
      fontFamily:'Staatliches'
    },
    subtitle: {
      color: '#fff',
      fontSize: 30,
      fontFamily:'Staatliches',
      textAlign: 'center',
      paddingRight: 30 ,
      paddingLeft: 30,
      paddingBottom: 40
    },

   text: {
      color: '#fff',
      fontSize: 20,
      fontFamily:'Roboto-Regular',
      paddingRight: 30 ,
      paddingLeft: 30,
    },
    // border: {
    //     color: '#fff',
    //     width: ('100%'),
    //     height: 2,
    // }
  });

export default homeinvite;