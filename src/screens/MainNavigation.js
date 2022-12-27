import { View } from "react-native";
import MainScreen from "./MainScreen";
import MainScTop from "./MainScTop";
import MenuScreen from "./MenuScreen";


export function MainNavigation({tabStatus}) {

  if(tabStatus === ""){
    <MainScTop/>,
    <MainScreen/> 
  }

  if(tabStatus === "mainScreen"){   
   <MainScTop/> 
  }

  if(tabStatus === "menu"){
   <MenuScreen/>
  }


}