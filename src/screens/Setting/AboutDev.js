import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';


export default AboutDev = () => {

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
                <Image style={styles.heroImg} source={{uri: 'https://avatars.githubusercontent.com/u/18418340?s=400&u=b5fe00151650174cfff9ff47dd3e0699c33f1774&v=4'}} />
            </View>
           
            <View style={{padding: 30, backgroundColor: '#181818', borderRadius: 15, margin: 20}}>

                <Text style={{color: 'white'}}>This is an open-source application is developed & maintained by Salman Qureshi and others</Text>
                <View style={{marginLeft: 10, marginTop: 10}}>
                    <TouchableOpacity onPress={()=>handleClick('https://github.com/hotheadhacker')}>
                        <Text style={{color: 'orange'}}>1. GitHub</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleClick('https://twitter.com/salmanually')}>
                        <Text style={{color: 'orange'}}>2. Twitter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleClick('https://instagram.com/salmanually')}>
                        <Text style={{color: 'orange'}}>3. Instagram</Text>
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