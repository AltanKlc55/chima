import { TouchableOpacity, View } from "react-native";
import Icon from "../components/Icon";
import Text from "../components/Text";
import styles from "./chimaStyle.style";
import { useNavigation } from "@react-navigation/native";

const MenuDetails = ({ navigation, route }) => {

  console.log(route.params.subCategories);
  return (
    <View style={styles.subCategoryScreen}>
      <TouchableOpacity style={styles.backMenuButton} onPress={(e) => navigation.navigate("MenuScreen")}>
        <Icon style={styles.subBackIcon} code="e913"/>
      </TouchableOpacity>

      <Text style={styles.childSubHeader} weight={3} value={route.params.headerName} />

      {route.params.subCategories.map((x, i) => {
        return (
      <TouchableOpacity key={i} style={styles.childSubIBtn}>
          <Text style={styles.childSubItem} weight={2} value={x.name} />
      </TouchableOpacity>
        )
      }
      )
      }
    </View>
  );
}

export default MenuDetails;