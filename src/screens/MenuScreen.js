import { useEffect, useRef, useState } from "react";
import { View, FlatList, TouchableOpacity, Dimensions, ScrollView, TextInput, Keyboard, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import styles from "./chimaStyle.style";
import Text from "../components/Text";
import Icon from "../components/Icon";
import { useNavigation } from "@react-navigation/native";


const windowWidth = Dimensions.get("window").width;

const realMenu = [
  {
    "name": "Yeni",
    "id": 47144,
    "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
    "linkType": "ProductListScreen",
    "img": "",
    "targetId": 47144,
    "subCategories": [
      {
        "name": "VTK Teen",
        "id": 48989,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://www.shutterstock.com/image-photo/smiling-african-woman-standing-arms-260nw-1817471336.jpg",
        "linkType": "ProductListScreen",
        "targetId": 48989,
        "subCategories": [
        {
          "id":1,
          "name":"Ayakkabı"
        },
        {
          "id":2,
          "name":"Ceket"
        },
        {
          "id":3,
          "name":"Mont"
        },
        {
          "id":4,
          "name":"Jean"
        }
      ]
      },
      {
        "name": "Party time",
        "id": 49315,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://c8.alamy.com/comp/2AEYE38/body-language-concept-portrait-of-upset-black-woman-standing-with-crossed-arms-over-white-background-empty-space-2AEYE38.jpg",
        "linkType": "ProductListScreen",
        "targetId": 49315,
        "subCategories": []
      },
      {
        "name": "Yeni",
        "id": 47160,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://img.freepik.com/free-photo/sensual-black-woman-with-beautiful-wavy-hairs-golden-shiny-dress-posing-full-length_273443-4005.jpg?w=2000",
        "linkType": "ProductListScreen",
        "targetId": 47160,
        "subCategories": []
      },
      {
        "name": "Özel Fiyatlar",
        "id": 47149,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://www.shutterstock.com/image-photo/smiling-african-woman-standing-arms-260nw-1817471336.jpg",
        "linkType": "ProductListScreen",
        "targetId": 47149,
        "subCategories": []
      },
      {
        "name": "Pantolon",
        "id": 47177,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://c8.alamy.com/comp/2AEYE38/body-language-concept-portrait-of-upset-black-woman-standing-with-crossed-arms-over-white-background-empty-space-2AEYE38.jpg",

        "linkType": "ProductListScreen",
        "targetId": 47177,
        "subCategories": []
      },
      {
        "name": "Jean",
        "id": 47178,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://img.freepik.com/free-photo/sensual-black-woman-with-beautiful-wavy-hairs-golden-shiny-dress-posing-full-length_273443-4005.jpg?w=2000",

        "linkType": "ProductListScreen",
        "targetId": 47178,
        "subCategories": []
      },
      {
        "name": "Kazak",
        "id": 47170,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "https://img.freepik.com/free-photo/sensual-black-woman-with-beautiful-wavy-hairs-golden-shiny-dress-posing-full-length_273443-4005.jpg?w=2000",
        "linkType": "ProductListScreen",
        "targetId": 47170,
        "subCategories": []
      }
    ]
  },
  {
    "name": "Giyim",
    "id": 47662,
    "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
    "linkType": "ProductListScreen",
    "img": "",
    "targetId": 47662,
    "subCategories": [
      {
        "name": "Çanta",
        "id": 48357,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48357,
        "subCategories": []
      },
      {
        "name": "Kemer",
        "id": 48358,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48358,
        "subCategories": []
      },
      {
        "name": "Kolye",
        "id": 48359,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48359,
        "subCategories": []
      }
    ]
  },



  {
    "name": "Aksesuar",
    "id": 67865,
    "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
    "linkType": "ProductListScreen",
    "img": "",
    "targetId": 67865,
    "subCategories": [
      {
        "name": "Çanta",
        "id": 48357,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48357,
        "subCategories": []
      },
      {
        "name": "Kemer",
        "id": 48358,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48358,
        "subCategories": []
      },
      {
        "name": "Kolye",
        "id": 48359,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48359,
        "subCategories": []
      }
    ]
  },



  {
    "name": "İndirim",
    "id": 67867,
    "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
    "linkType": "ProductListScreen",
    "img": "",
    "targetId": 67867,
    "subCategories": [
      {
        "name": "Çanta",
        "id": 48357,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48357,
        "subCategories": []
      },
      {
        "name": "Kemer",
        "id": 48358,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48358,
        "subCategories": []
      },
      {
        "name": "Kolye",
        "id": 48359,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48359,
        "subCategories": []
      }
    ]
  },


  {
    "name": "Kombin",
    "id": 5888,
    "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
    "linkType": "ProductListScreen",
    "img": "",
    "targetId": 5888,
    "subCategories": [
      {
        "name": "Çanta",
        "id": 48357,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48357,
        "subCategories": []
      },
      {
        "name": "Kemer",
        "id": 48358,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48358,
        "subCategories": []
      },
      {
        "name": "Kolye",
        "id": 48359,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 48359,
        "subCategories": []
      }
    ]
  },




  {
    "name": "Çok Satanlar",
    "id": 47999,
    "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
    "linkType": "ProductListScreen",
    "img": "",
    "targetId": 47146,
    "subCategories": [
      {
        "name": "Üst giyim",
        "id": 47197,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47197,
        "subCategories": []
      },
      {
        "name": "Alt giyim",
        "id": 47198,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47198,
        "subCategories": []
      },
      {
        "name": "Dış giyim",
        "id": 47199,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47199,
        "subCategories": []
      },
      {
        "name": "Ofis kıyafetleri",
        "id": 47263,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47263,
        "subCategories": []
      },
      {
        "name": "Spor koleksiyon",
        "id": 47264,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47264,
        "subCategories": []
      },
      {
        "name": "Sokak giyim",
        "id": 47266,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47266,
        "subCategories": []
      },
      {
        "name": "TÜM KOLEKSİYONLAR",
        "id": 47267,
        "filter": "fcolor|1,fvariation|1,fprice|1,cl03|1,cl05|1,",
        "img": "",
        "linkType": "ProductListScreen",
        "targetId": 47267,
        "subCategories": []
      }
    ]
  }
];



const fakeAxios = (url, config) => {
  return new Promise((resolve, reject) => {
    const responseTime = 300 + Math.random() * 2000;
    const isError = Math.random() * 100 < 5;
    if (url === "webservis/menu"){
      setTimeout(() => {
        if (!isError) resolve({status:200,data:{status:true,data:realMenu}});
        else reject({status: 500})
      },responseTime);
    }
    else {
      setTimeout(() => {
        reject({ status: 404, error: "Page not found" })
      }, 300);
    }
  });
}





const MenuScreen = ({navigation}) => {

  const [activeIndex, setActiveIndex] = useState(47144);
  const [activePlaceholder, setActivePlaceholder] = useState("");

  const [items, setItems] = useState([]);

  useEffect(() => {
    fakeAxios("webservis/menu").then((response) => {
      if (response.status === 200) {
        setItems(response.data.data);
      }
      else {
        console.log("veri yok")
      }
    });
  }, []);

  const [searchHeaderText, setSearchHeaderText] = useState("Yeni");
  const [searchUpInputText, setSearchUpInputText] = useState("Ne Arıyorsunuz ?");
  const [key, setKey] = useState("");

  const [activeSubCategory,setActiveSubCategory] = useState();

  return(
    <View onStartShouldSetResponder={() => Keyboard.dismiss()}>


      <View style={styles.headers}>
        
        <View style={styles.topbarSearchZone}>
           <View style={styles.menuSearchZone}>
           <TouchableOpacity style={styles.ScannBtn}>
            <Icon style={styles.searchButton} code="e902"/>
           </TouchableOpacity>
       
           <TextInput onFocus={() => (setSearchHeaderText(searchUpInputText),
            setSearchUpInputText(""),
            console.log(searchUpInputText))}
            onChangeText={setKey}
            autoCapitalize='none'
            onBlur={()=>Keyboard.dismiss()}
            onEndEditing={() => (
            setSearchUpInputText(searchHeaderText),
            setSearchHeaderText(""),
            console.log(searchUpInputText)
            )} cursorColor={"#666666"} 
            placeholderTextColor="#cacaca" 
            placeholder={activePlaceholder+" içerisinde ara"}
            style={styles.menuSearchTxt}/>
      
        </View>

        <TouchableOpacity style={styles.barcodeScannBtn}>
       <Icon style={styles.ScannBtn} code="f464" fontawesome/>
       </TouchableOpacity>
        </View>
        
        <View style={styles.headersZone}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {items.map((x,i)=> {return(
           <View key={i} style={styles.headerBtns}>
            <TouchableOpacity style={[styles.headerBtn, activeIndex === x.id ? styles.headerBtnActive : styles.headerBtn]}
             onPress={(e) => {
               setActiveIndex(x.id);
               setActivePlaceholder(x.name);
             }}>
           
             <Text style={activeIndex === x.id ? styles.headerBtnTxtActive : styles.headerBtnTxt } value={x.name} weight={2} />
           </TouchableOpacity>
         </View>



         );
         })}

         </ScrollView>


        </View>
      </View>
    <View style={searchUpInputText === "" && key !== "" ? styles.searchListzoneActive : styles.searchListzone}>

    </View>
      <View>
        <View style={styles.listItemZone}>
          <ScrollView contentContainerStyle={styles.lists}>
            <View style={[{ width: windowWidth }]}>

              {items.filter((x) => { return (x.id === activeIndex) }).map((y, z) => {

                console.log(y.name);

                return (
                <View style={styles.generalListZone} key={z}>
                  {y.subCategories.map((x, i) => {
                    return (

                      <View style={styles.menuButtonsZone} key={i} >
                        <TouchableOpacity onPress={(e) => {x.subCategories.length <= 0 ? console.log("Alt Kategori Yok") : navigation.navigate("MenuDetails",{subCategories:x.subCategories,headerName:x.name})}} style={styles.menuButtons}>
                        { 
                        //<Text style={styles.listItem} value={x.name} weight={2} /> 
                        }
                        <Image style={styles.menuListImage} source={{uri:x.img}}/>
                       
                        </TouchableOpacity>
                      </View>
                    )
                  })} 
                </View>
                );
              })
              }
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default MenuScreen;