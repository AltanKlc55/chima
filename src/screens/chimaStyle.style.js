import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
   
  // Main Top

   topContainer:{position:"absolute",zIndex:10,width:width},
   mainScLogo:{height:30,width:100},
   logoZone:{justifyContent:"center",alignItems:"center",alignContent:"center",paddingTop:5,top:10},
   serchBarZone:{alignContent:"center",alignItems:"center",position:"absolute",zIndex:5,width:"100%",top:50,flexDirection:"row",left:15},
   searchBtn:{borderWidth:1,height:35,width:"85%",borderRadius:5,paddingLeft:10,paddingBottom:5,paddingTop:5,flexDirection:"row",color:"white"},
   searchBtnTxt:{fontSize:14,color:"white",paddingTop:0,paddingLeft:5},
   searchIcon:{fontSize:15,paddingRight:5,paddingTop:2,color:"white"},
   ScannBtnMain:{color:"rgba(236,236,236,0.8)",left:5},

   
   // Bottom Bar

   bottomMenuZone:{backgroundColor:"rgba(236,236,236,0.7)",height:70,width:"100%",position:"absolute",zIndex:4,bottom:-1,flexDirection:"row",borderTopWidth:1,borderTopColor:"rgba(236,236,236,0.4)"},
   bottomBtnZone:{width:Math.round(width/5),justifyContent:"center",alignItems:"center",alignContent:"center"},
   iconStyle:{fontSize:10},
   iconStyleMenuBtn:{fontSize:10},


   // Menü Ekranı
   
   headers:{backgroundColor:"white",borderBottomColor:"#dddd",borderBottomWidth:1},
   headersZone:{borderTopColor:"#e6e6e6",paddingTop:15},
   headerBtn:{paddingLeft:10,paddingRight:10,paddingTop:20,paddingBottom:15},
   chilList:{padding:10},
   headerBtnActive:{borderBottomColor:"#666666",borderBottomWidth:2,paddingLeft:10,paddingRight:10,paddingTop:20,paddingBottom:20},
   listTxt:{color:"#666666",fontSize:13,paddingLeft:15},
   lists:{paddingBottom:280,paddingTop:0},
   listItem:{color:"#0c0906",fontSize:16,position:"absolute",zIndex:5,bottom:15,left:15},
   menuButtonsZone:{borderColor:"#dddd",borderWidth:1,marginBottom:3,borderRadius:5,backgroundColor:"#e8e3df"},
   menuButtons:{paddingTop:0},
   generalListZone:{padding:5},
   menuSearchTxt:{backgroundColor:"transparent",width:"80%",paddingBottom:8,paddingLeft:10},
   menuSearchZone:{backgroundColor:"white",borderRadius:2,flexDirection:"row",height:40,borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderColor:"black"},
   topbarSearchZone:{paddingLeft:15,paddingRight:15,flexDirection:"row",top:10},
   searchButtonIcon:{paddingTop:10,marginLeft:10,color:"#red"},
   searchButton:{color:"black",width:40,textAlign:"center",bottom:2},
   headerBtnTxtActive:{color:"black",paddingLeft:15,paddingRight:15},
   headerBtnTxt:{color:"#666666",paddingLeft:15,paddingRight:15},
   searchListzone:{},
   searchListzoneActive:{backgroundColor:"white",height:500},
   listItemZone:{backgroundColor:"white"},
   menuListImage:{height:100,width:"100%",borderRadius:3},
   barcodeScannBtn:{alignContent:"center",alignItems:"center",textAlign:"center",width:45},
   ScannBtn:{color:"black",top:10},

   subCategoryScreen:{padding:15,backgroundColor:"white",flex:1},
   childSubItem:{color:"#121315",fontSize:13,paddingLeft:10},
   backMenuButton:{paddingBottom:20,paddingTop:5},
   childSubIBtn:{padding:10},
   childSubHeader:{color:"#121315",fontSize:18,paddingBottom:10,paddingTop:5},
   subBackIcon:{fontSize:16}
})

export default styles;