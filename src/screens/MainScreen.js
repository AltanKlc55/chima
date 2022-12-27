import { useState } from "react";
import { Dimensions, Image, ScrollView,View,TouchableOpacity,TouchableHighlight,Pressable,Text } from "react-native"
import MainScTop from "./MainScTop";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styles from "./chimaStyle.style";
import Icon from "../components/Icon";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
 

const MainScreen = () => {
  const AnimatedTouchableHighlight = Animated.createAnimatedComponent(Pressable);
  const navigation = useNavigation(); 

  
  const [lastTouchIndex, setLastTouchIndex] = useState(0);
  const [touchStatus ,setTouchStatus] = useState("");

  const onTouchStart = ((e)=>{
     firstTouch = Math.round(e.nativeEvent.contentOffset.y);
   
     setLastTouchIndex(firstTouch);
  });

  const onTouchEnd = ((e)=>{
    const lastTouch = Math.round(e.nativeEvent.contentOffset.y);
     const rangeOffset = 4;
      const range = Math.round(windowHeight/rangeOffset);

      if(lastTouchIndex > lastTouch){
        setTouchStatus("up");
      }else if(lastTouchIndex < lastTouch){
        setTouchStatus("down");
      }else if(lastTouchIndex == lastTouch){
        setTouchStatus("zero");
      }

   });


   const srcBtnBorder = useSharedValue("rgba(236,236,236,0.7)");
   const srcBtnLocation = useSharedValue(0);
   const txtOpacity = useSharedValue(1);
   const iconOpacity = useSharedValue(0);
   const iconOpacityR = useSharedValue(1);

 
   const animStyle = useAnimatedStyle(() => ({
     borderColor: srcBtnBorder.value,
     bottom: srcBtnLocation.value,
   }));


   const txtAnim = useAnimatedStyle(() => ({
    opacity:txtOpacity.value
   }));


   const iconAnim = useAnimatedStyle(() => ({
    opacity:iconOpacity.value
   }));


   const iconAnimRevers = useAnimatedStyle(() => ({
    opacity:iconOpacityR.value
   }));

   
  return(
  <View style={{flex:1 ,backgroundColor:"black"}}>
  <MainScTop activeTouch={touchStatus}/>


      <AnimatedTouchableHighlight onPress={(e) => {alert("Arama Butonu Küçük")}} style={[iconAnim,{width:"100%",paddingLeft:25,position:"absolute",zIndex:5,top:0,height:60,backgroundColor:"transparent",paddingTop:20}]}>
        <View style={{height:45,width:"100%", backgroundColor:"transparent"}}>
          <Icon style={styles.searchIcon} code="e902" />
        </View>
      </AnimatedTouchableHighlight>
 

      <ScrollView onScroll={(e) => {

        if(e.nativeEvent.contentOffset.y >= 33){
          iconOpacity.value = withTiming(1,{duration:200})
          iconOpacityR.value = withTiming(0,{duration:200});

          srcBtnBorder.value = withTiming ("rgba(236,236,236,0.0)",{duration:200})
          txtOpacity.value = withTiming (0,{duration:200})

        }else if(e.nativeEvent.contentOffset.y < 33){
          iconOpacity.value = withTiming(0,{duration:200})
          iconOpacityR.value = withTiming(1,{duration:200});

          srcBtnBorder.value = withTiming("rgba(236,236,236,0.7)",{duration:200})
          txtOpacity.value = withTiming(1,{duration:200});
        }


      }} nestedScrollEnabled >
         <View style={styles.serchBarZone}>
          <AnimatedTouchableHighlight style={[animStyle, styles.searchBtn]} onPress={(e) => {alert("Arama Butonu")}}>
           <Animated.View style={iconAnimRevers}>
            <Icon style={styles.searchIcon} code="e902" />
            </Animated.View>
           <Animated.Text style={[styles.searchBtnTxt,txtAnim]} weight={3}>ARA</Animated.Text>        
          </AnimatedTouchableHighlight>  
         
          <AnimatedTouchableHighlight style={txtAnim} onPress={()=>{navigation.navigate("BarcodeScanner")}}>

          <Icon style={styles.ScannBtnMain} code="f464" fontawesome/>
            
          </AnimatedTouchableHighlight>

         </View>
           <View>
            <Image style={{ width: windowWidth, height: windowHeight }} source={{ uri: "https://farktorcdn.com/Library/Upl/5500191/Product/vtk21-t1222-30-2022111617388.jpg" }} />
             <Image style={{ width: windowWidth, height: windowHeight }} source={{ uri: "https://farktorcdn.com/Library/Upl/5500191/Product/tkm-bd-22-150-5-2022101112938.jpg" }} />
            <Image style={{ width: windowWidth, height: windowHeight }} source={{ uri: "https://farktorcdn.com/Library/Upl/5500191/Product/ckt-bd-22-151-5-2022101112421.jpg" }} />
           </View>
          </ScrollView>
         </View>
  );
}

export default MainScreen;