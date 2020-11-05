import React, { useState, useEffect } from 'react';
import { AppRegistry, View, Dimensions, StyleSheet, ImageBackground, Text, Image, ScrollView } from 'react-native';
import { Button, ListItem, CheckBox , Header} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CountDown from 'react-native-countdown-component';
import RadioGroup, { Radio } from "react-native-radio-input";
import { faRedo, faPowerOff, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { connect } from 'react-redux';


function VoteHost(props){

     // liste  titres Redux
     const list = props.playlisToDisplay;

     
      

  var headerLeft = <FontAwesomeIcon icon={faArrowLeft} size={35} style={{color: "white"}} onPress={() => props.navigation.navigate('TimerConfigFIRST')} />;
  var headerCenter = <Text style={{color: 'white'}} >Vote de l'hôte</Text>;
  var headerRight = <FontAwesomeIcon icon={faBars} size={35} style={{color: "white"}} onPress={() => props.navigation.openDrawer()}/>;

  //COUNTDOWN 
  const [TIMER, setTIMER] = useState(0)

  
  useEffect(() => {

    const findTIMER = async () => {


      // ----------------------------------------- METTRE A JOUR l'IP --------------------------------------------
      var TIMERdata = await fetch('http://192.168.144.4:3000/afficheTimer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idUserFromFront=${props.hostId}`
      })


      var timer = await TIMERdata.json();
      setTIMER(timer.reboursFinal)
      console.log("rebours", timer)
    }

    findTIMER()

    console.log('Comptes à rebours FRONT ici ->', TIMER)
    console.log('hostIdState', props.hostId)

  }, [])


  var handleRefreshTIMER = async () => {

    var rawResponse = await fetch('http://192.168.144.4:3000/afficheTimer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idUserFromFront=${props.hostId}`
    })

    var timer = await rawResponse.json();

    setTIMER(timer.reboursFinal)
    console.log("rebours", timer)

    if (timer) {
      navigation.navigate("VoteHost")
    }
  }




  var handleVoteHost = async () => {

    // --------------------------------- VOS IP ICI -----------------------------------------
    // Flo IP : 192.168.0.17
    // Vlad : 192.168.0.40
    var rawResponse = await fetch('http://192.168.144.4:3000/enregistrement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titleFromFront=${title}&idUserFront=${props.hostId}`
    })

    var response = await rawResponse.json();

    console.log("response", response)

    if (response === true) {
      props.navigation.navigate('Validationvote')
    }

  }





 // BOUCLE QUE AFFICHE LES TITRES A VOTER

 var voteList = []

 for (let i = 0; i < list.length; i++) {
   voteList.push(<Radio iconName={"lens"} label={list[i]} value={i} />)
 }


 var getChecked = (value) => {
  console.log(value)
}








  return (


<View style={styles.container}>
        
  <Header
    containerStyle={{backgroundColor: '#131313'}}
    leftComponent={headerLeft}
    centerComponent={headerCenter}
    rightComponent={headerRight}
  />
  <ScrollView style={styles.wrap}>


    <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 10 }}>
      <Text style={styles.text}>Bienvenue dans la soirée de</Text>

    </View>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.subtext}> {props.nameToDisplay} </Text>
      <Image source={require('../../assets/picto-fete2.png')} style={{ height: 150, width: 170, marginTop: '5%' }} />
    </View>


    <View style={{ flex: 1, borderColor: 'white', borderWidth: 2, margin: 50, padding: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} >

      {TIMER <= 0 && (<Text style={{ color: '#FF0060', marginBottom: 10 }}>Pas de vote en cours</Text>)}
      {TIMER > 0 && (<Text style={{ color: '#FF0060', marginBottom: 10 }}>Vote en cours, il te reste :</Text>)}

      {TIMER > 0 && (<CountDown
        size={30}
        until={TIMER}
        onFinish={() => props.navigation.navigate('Winnerguest')}
        digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FF0060' }}
        digitTxtStyle={{ color: '#FF0060' }}
        timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
        separatorStyle={{ color: '#FF0060' }}
        timeToShow={['M', 'S']}
        timeLabels={{ m: null, s: null }}
        showSeparator
      />)}

    </View>


    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }} >

      {TIMER > 0 && (
      
      <View>

        <Text style={{ color: 'white', fontSize: 20, marginTop: '10%', marginBottom: '10%', marginLeft: '5%' }} >Votez pour le prochain titre:</Text>

        <RadioGroup getChecked={getChecked} RadioGroupStyle={{ flex: 1, flexDirection: 'column', marginBottom: '10%', marginLeft: '5%' }} IconStyle={{ backgroundColor: '#FF0060' }} coreStyle={{ backgroundColor: '#FF0060' }} labelStyle={{ color: 'white', fontSize: 18 }} >
          {voteList}
        </RadioGroup>

        <Button
          title='  Valider mon vote'
          buttonStyle={{
            backgroundColor: '#FF0060',
            borderRadius: 10,
            color: 'white',
            marginTop: '5%',
            marginBottom: '5%',
            fontSize: 18
          }}
          titleStyle={{
            fontSize: 20,
            fontFamily: 'Roboto-Bold'
          }}

          icon={
            <FontAwesomeIcon icon={faCheck} size={15} style={{ color: "white" }} />
          }

        />
      </View>
    
      )}

      {TIMER <= 0 && (<Button
        title='REFRESH'
        buttonStyle={{
          backgroundColor: '#E59622',
          borderRadius: 10,
          marginTop: '5%',
          marginBottom: '5%',

        }}
        titleStyle={{
          fontFamily: 'Staatliches',
          fontSize: 25
        }}


        icon={
          <FontAwesomeIcon icon={faRedo} size={25} style={{ color: "white" }} />
        }

        onPress={() => handleRefreshTIMER()}


      />)}

      </View>
  </ScrollView>
</View>

);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131313',

  },

  wrap: {
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center',
    textAlign: 'center',
    height: hp('100%'), // 70% of height device screen
    width: wp('100%'),  // 80% of width device screen 
    backgroundColor: '#131313',
    borderTopColor: '#fff',
    borderTopWidth: 1
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
    fontFamily: 'Staatliches'
  },
  subtitle: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Staatliches',
    textAlign: 'left',
    marginTop: '2%',
    marginLeft: '2%'

  },
  subtext: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Staatliches',
    textAlign: 'center',
    marginTop: '5%',
    marginLeft: '2%'

  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    marginTop: '5%',
    marginLeft: '4%'


  },

  ListItem: {
    backgroundColor: '#131313',
    color: '#fff',
    justifyContent: 'flex-start',

  }

});

function mapStateToProps(state) {
  return {
    nameToDisplay: state.EventName,
    hostId: state.hostId,
    playlisToDisplay: state.EventPlaylist
  }
}

export default connect(
  mapStateToProps,
  null
)(VoteHost);