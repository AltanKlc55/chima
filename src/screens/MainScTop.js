import { Image, TouchableOpacity, View } from "react-native";
import styles from "./chimaStyle.style";
import Icon from "../components/Icon"
import Text from "../components/Text"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";



const MainScTop = ({ activeTouch }) => {


  return (
    <View style={styles.topContainer}>
      <View style={styles.logoZone}>
        <Image style={styles.mainScLogo} source={require("../assets/images/chima-logo.png")} />
      </View>
    </View>
  );
}


export default MainScTop; 
