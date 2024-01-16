import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default ContactUsScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', marginLeft: 100}}>Contact Us Below</Text>
        <View>
          <TouchableOpacity
            oponPress={() => Linking.openURL('mailto:contact@isalman.dev')}>
            <Text style={{color: 'orange', marginLeft: 100}}>Email: contact@isalman.dev</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
