import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, View } from "react-native"
import { IconButton, TextButton } from "../Button";
import Text from "../Text";

const ProductListHeader = ({ title, onFilterButtonPress }) => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <IconButton
          code="e913"
          fontSize={11}
          style={styles.backButton}
          onPress={() => { navigation.goBack(); }}
        />
        <Text
          value={title}
          style={styles.title}
          numberOfLines={2}
          ellipsisMode="tail"
          weight={3}
        />
        <TextButton
          text="Filtreler"
          weight={3}
          style={styles.filterButton}
          textStyle={styles.filterButtonText}
          onPress={onFilterButtonPress}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  contentContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    paddingHorizontal: 15,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    width: 50,
    marginRight:20
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    textAlign:"center"
  },
  filterButton: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width:70
  },
  filterButtonText: {
    fontSize:12
  },
});

export default ProductListHeader;