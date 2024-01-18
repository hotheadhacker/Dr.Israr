import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';


export default AboutDev = () => {
    // handleClick = (url) => {
    //     Linking.canOpenURL(url).then(supported => {
    //       if (supported) {
    //         Linking.openURL(url);
    //       } else {
    //         console.log("Don't know how to open URI: " + url);
    //       }
    //     });
    // }
    handleClick = async (url) => {
      // Linking.canOpenURL(url).then(supported => {
      //   if (supported) {
          try{
              await Linking.openURL(url);
          }catch(e){
              console.log(e);
          }
      //   } else {
      //     console.log("Don't know how to open URI: " + url);
      //   }
      // }
      // );
  }
    return(<SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <View style={{marginTop: 100}}>
                <Image style={styles.heroImg} source={{uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'}} />
            </View>
           
            <View style={{padding: 30, backgroundColor: '#181818', borderRadius: 15, margin: 20}}>

                <Text style={{color: 'white'}}>This project is fully open-source. Help this project in following ways:</Text>
                <View style={{marginLeft: 10, marginTop: 10}}>
                    <TouchableOpacity onPress={()=>handleClick('https://github.com/hotheadhacker/Dr.Israr')}>
                        <Text style={{color: 'orange'}}>1. Improve code on GitHub</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleClick('https://discord.gg/6NfgfahrxX')}>
                        <Text style={{color: 'orange'}}>2. Discord Bug Tracking & Features</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleClick('https://github.com/sponsors/hotheadhacker')}>
                        <Text style={{color: 'orange'}}>3. Sponsor or Fund Developers</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    heroImg: {
      width: 110,
      height: 110,
      borderRadius: 110/2,
      alignSelf: 'center'
    },
    logo: {
      width: 66,
      height: 58,
    },
  });