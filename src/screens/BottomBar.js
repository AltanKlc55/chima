import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";
import styles from "./chimaStyle.style";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;


const BottomBar = () => {
const [activeTab, setActiveTab] = useState("MainScreen");  
const navigation = useNavigation();


return(  
   <View style={styles.bottomMenuZone}> 

       <TouchableOpacity style={styles.bottomBtnZone} onPress={() => {setActiveTab("MainScreen"),navigation.navigate("MainScreen")}}>
       <Icon styles={styles.iconStyle} color={"black"} code="e901" fontSize={15}/>
       </TouchableOpacity>

       <TouchableOpacity style={styles.bottomBtnZone}>
       <Icon styles={styles.iconStyle} color={"black"} code="e902" fontSize={15}/>
       </TouchableOpacity>

       <TouchableOpacity style={styles.bottomBtnZone} onPress={() => {setActiveTab("MenuScreen"),navigation.navigate("MenuScreen")}}>
       <Icon styles={styles.iconStyleMenuBtn} color={"black"} code="e907" fontSize={13} />
       </TouchableOpacity>

       <TouchableOpacity style={styles.bottomBtnZone}>
       <Icon styles={styles.iconStyle} color={"black"} code="e904" fontSize={15}/>
       </TouchableOpacity>

       <TouchableOpacity style={styles.bottomBtnZone}>
       <Icon styles={styles.iconStyle} color={"black"} code="e906" fontSize={15}/>
       </TouchableOpacity>
   
   </View>

      
);

}


export default BottomBar;