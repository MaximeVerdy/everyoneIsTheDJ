import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Header, Input, Badge } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faServer, faRedo, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'


function SongListCreation(props) {

  var headerCenter = <Text style={styles.title}>DJ Hôte</Text>
  var headerRight = <FontAwesomeIcon icon={faBars} size={35} style={{ color: "white" }} onPress={() => props.navigation.openDrawer()} />
  var headerLeft = <FontAwesomeIcon style={{ color: 'white' }} icon={faArrowLeft} size={30} onPress={() => props.navigation.navigate('EventCreation')} />

  const [titreProposeHote, setTitreProposeHote] = useState();
  const [TOPlist, setTOPlist] = useState([]);
  const [errorArtist, setErrorArtist] = useState();

  const [error, setError] = useState()

  var listHote;


  useEffect(() => {
    const findTOP = async () => {
      // ----------------------------------------- METTRE A JOUR l'IP --------------------------------------------
      const TOPdata = await fetch('http://192.168.0.40:3000/findTOP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `userIdFromFront=${props.hostId}`
      })
      var TOP = await TOPdata.json();
      
     
      setTOPlist(TOP.randomTitles)
    }
    setError()
    setTitreProposeHote();
    findTOP()

  },[])

  console.log('TOPlist passé par un set ici ->', TOPlist)
  

  var handleAjouterTitre = async () => {

    if (titreProposeHote === undefined) {
      setErrorArtist(<Badge status="error" badgeStyle={{ color: 'white', backgroundColor: '#FF0060' }} value="Le champ est vide"></Badge>)
      
    } else {
      
       setErrorArtist()
       setTOPlist([...TOPlist, titreProposeHote])
       setTitreProposeHote();
    }

    var rawResponse = await fetch('http://192.168.0.40:3000/ajoutertitre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${titreProposeHote}&userIdFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();
    setError()

    console.log("titre proposé ========= ", titreProposeHote)
    
  }

  

  var handleSupprimerTitre = async (element) => {

    setTOPlist(TOPlist.filter((e)=>(e !== element)))



    var rawResponse = await fetch('http://192.168.0.40:3000/supprimertitre', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `titreFromFront=${element}&idUserFromFront=${props.hostId}`
    })

    var response = await rawResponse.json();
    setError()

    console.log(response);
  }



  var handleValidationList = async () => {

    console.log('>3', TOPlist)
    if (TOPlist.length > 2) {
      setError()
      console.log('>3', TOPlist)
      props.onSettingPlaylist(TOPlist)
      props.navigation.navigate("TimerConfigFIRST")
    }

    else {
      console.log('else')
      setError(<Badge status="error" badgeStyle={{color:'#fff', backgroundColor:'#FF0060'}} value='Merci de choisir au moins 3 titres'></Badge>)
    }
  }



  var listHote = TOPlist.map((titre, i) => {
    return (
      <View style={styles.titre} key={i}>
        <FontAwesomeIcon 
          onPress={()=> handleSupprimerTitre(titre)} 
          icon={faTrash} 
          size={20} 
          style={{color: "#fff", marginLeft: '2%'}}
        />
        <Text style={styles.songtext}>{titre}</Text>
      </View>
    )
  }
)

  

  return (
    <View style={styles.container}>
      <View>
        <Header
          leftComponent={headerLeft}
          centerComponent={headerCenter}
          rightComponent={headerRight}
          containerStyle={{
            backgroundColor: "#131313",
            alignItems: 'flex-start',
            borderBottomWidth: 0,
            marginBottom: '5%'
          }}
        />
      </View>


      <KeyboardAwareScrollView style={styles.wrap}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#fff" }}>

          {/* <View style={{ flex: 1, backgroundColor:'#2ecc71', justifyContent: 'center', alignItems: 'center'}}>   */}
          <Text style={styles.text}>Bienvenu dans la soirée</Text>
          <Text style={styles.subtitle} >{props.nameToDisplay}</Text>
          <Text style={styles.bodytext}>Compose ta liste de titres candidats aux votes (3 titres minimum).</Text>

          {errorArtist}

          

            <View style={{ flex: 1, flexDirection: 'column' }}>
            
              {listHote}
            </View>
          

          {/* <View style={{flexDirection:'column'}}>
                                  {listHote}
                            </View>  */}


        </View>

        <View>
          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5%' }}>
            <Input
              label='Artiste - Titre :'
              placeholder='Lady Gaga - Poker Face'
              type='text'
              containerStyle={{
                color: '#fff',
                width: 290,
                marginTop: '3%',
                alignItems: 'stretch'

              }}
              inputStyle={{
                fontFamily: 'Roboto-Bold',
                fontSize: 16,
                color: '#fff',

              }}
              labelStyle={{
                fontFamily: 'Roboto-Bold',
                fontSize: 18,
                color: '#584DAD',

              }}
              onChangeText={text => setTitreProposeHote(text)}
              value={titreProposeHote}
            />

             

            <Button
              title='+'
              buttonStyle={{
                backgroundColor: '#584DAD',
                borderRadius: 10,
                width: 40,
                height: 40,
                color: 'white',
                marginRight: '2%'

              }}
              onPress={() => handleAjouterTitre()}
            />
            

          </View>


          {/* CHAMPS INPUT OPTIONNEL NE PAS SUPRRIMER

                        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'5%'}}>
                              <View style={{alignItems: 'center', flexDirection: 'column', borderBottomColor:"grey", borderBottomWidth:1, marginTop:'5%'}}>
                                <Text style={{fontFamily:'Roboto-Bold', fontSize: 18, color: '#584DAD', marginLeft:'3%', marginBottom:'5%'}}>Artiste - Titre aléatoire : </Text>
                                <Text style={{fontFamily:'Roboto-Bold',fontSize: 16, color: '#fff', marginBottom:'2%'}}> %TitresBdd% </Text>
                              </View>
                            <Button 
                            title= ''

                            buttonStyle={{
                                backgroundColor: '#E59622',
                                borderRadius: 10,
                                width: 40,
                                height: 40,
                                color: 'white',
                             
                            }}
                            icon={<FontAwesomeIcon
                              icon={faRedo}
                              size={15}
                              color="white"
                            />
                            }
                            //onPress={()=> handleAjouterTitre()}
                            
                            />
                            <Button 
                            title= '+'
                            buttonStyle={{
                                backgroundColor: '#584DAD',
                                borderRadius: 10,
                                width: 40,
                                height: 40,
                                color: 'white',
                                marginRight:'2%'
                            
                            }}
                            //onPress={()=> handleAjouterTitre()}
                            />
                        </View> */}

          {/* 
                        <View style={{ flexDirection: 'column' }}>
                          {listHote}
                        </View> */}
        </View>



      </KeyboardAwareScrollView>

      {error}

      <Button
        title="Valider la liste"
        onPress={() => handleValidationList()}
        buttonStyle={{
          backgroundColor: '#584DAD',
          marginTop: '3%',
          borderRadius: 10,
        }}

      />
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
    textAlign: 'center',
    //height: hp('100%'), // 70% of height device screen
    width: wp('100%'),  // 80% of width device screen 
    backgroundColor: '#131313',
    borderTopWidth: 1,
    borderTopColor: "#fff",

  },

  title: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'Staatliches'
  },

  subtitle: {
    color: '#584DAD',
    fontSize: 40,
    fontFamily: 'Staatliches',
    textAlign: 'center',
    marginTop: '6%',

  },

  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    paddingRight: '10%',
    paddingLeft: '5%',
    textAlign: 'center',
    marginTop: '6%',

  },
  songtext: {
    color: '#E59622',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginLeft: '5%',
    paddingRight: '5%',
    textAlign: 'left',
    marginTop: '6%'
  },
  songtextAjout: {
    color: '#584DAD',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    paddingRight: '10%',
    paddingLeft: '5%',
    textAlign: 'left',
    marginTop: '6%',

  },
  bodytext: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'left',
    marginTop: '10%',
    marginBottom: '6%'
  },
  titre: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: '5%',
    marginRight: '2%'
  }

});


function mapStateToProps(state) {
  return {
    nameToDisplay: state.EventName, hostId: state.hostId,
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSettingPlaylist: function(playlist) {
      dispatch({type: 'setPlaylist', reduxPlaylist: playlist})
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongListCreation);