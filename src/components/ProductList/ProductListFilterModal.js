import { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Pressable } from "react-native";
import ReactNativeModal from "react-native-modal";
import CheckBox from "react-native-bouncy-checkbox";
import { isEmpty, windowWidth } from "../../helpers";
import { IconButton, TextButton } from "../Button";
import Icon from "../Icon";
import Text, { fontFamily } from "../Text";
import LinearGradient from "react-native-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { ProductListContext, sortFilters } from "../../contexts/ProductListContext";
import { Slider } from "@miblanchard/react-native-slider";
import { useSelector } from "react-redux";
import { SelectBox } from "../SelectBox";

export const sortValues = [
  { key: 0, value: 'photoSort,desc', text: 'YENİ EKLENEN' },
  { key: 1, value: 'price,asc', text: 'FİYAT ARTAN' },
  { key: 2, value: 'price,desc', text: 'FİYAT AZALAN' },
  { key: 4, value: 'order,desc', text: 'EN ÇOK SATANLAR' },
  { key: 3, value: 'sort,asc', text: 'ÖNERİLEN' },
];

const ProductListFilterModal = ({ isVisible, setIsVisible, allFilters, defaultSortKey, filterQuery, sortBy, onApplyButtonPress }) => {

  console.log("[RENDERED] ProductListFilterModal");

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackButtonPress={() => { setIsVisible(false) }}
      onBackdropPress={() => { setIsVisible(false) }}
      useNativeDriver
      useNativeDriverForBackdrop
      style={{ margin: 0, alignItems: "flex-end" }}
      animationIn="slideInRight"
      animationOut={"slideOutRight"}
    >
      <SafeAreaView>
        <View style={styles.container}>

          <View style={styles.header}>

            <ModalTitle />

            <IconButton
              code="e90b"
              style={styles.headerCloseButton}
              fontSize={11}
              onPress={() => { setIsVisible(false); }}
            />
          </View>

          <ScrollView nestedScrollEnabled>
            {allFilters.map((x, i) => {
              if (x.items.length > 1 && x.type === "list") return (
                <Group
                  key={i}
                  title={x.title}
                  items={x.items}
                  groupKey={x.key}
                />
              );
              if (x.type === "price") return (
                <PriceGroup
                  key={i}
                  title={x.title}
                  items={x.items}
                  groupKey={x.key}
                />
              )
            })}
          </ScrollView>

          <Ordering defaultSortKey={defaultSortKey} />

          <View style={styles.footer}>
            <ApplyButton
              onPress={onApplyButtonPress}
              filterQuery={filterQuery}
              sortBy={sortBy}
            />
          </View>

        </View>
      </SafeAreaView>
    </ReactNativeModal >
  )
}
export default ProductListFilterModal;

/************************************************************************/

const ModalTitle = () => {

  const { selectedFilters, removeAllSelectedFilters } = useContext(ProductListContext);

  if (!selectedFilters.length) return (
    <Text
      value="FİLTRELER"
      weight={3}
      style={styles.headerTitle}
    />
  )
  if (selectedFilters.length > 0) return (
    <TextButton
      text="Filtreleri kaldır"
      weight={3}
      style={styles.removeFiltersButton}
      textStyle={styles.removeFiltersButtonText}
      onPress={() => { removeAllSelectedFilters(); }}
    />
  )
}

/************************************************************************/

const GroupTitleButton = ({ title, groupFilterKey, itemsCount, status, setStatus }) => {

  const { selectedFilters } = useContext(ProductListContext);

  const selectedFiltersOfThisGroup = useMemo(() => {
    return selectedFilters.filter(x => x.filterQueryKey === groupFilterKey).length;
  }, [selectedFilters]);

  return (
    <Pressable
      style={styles.groupButton}
      onPress={() => { setStatus(status > 0 ? 0 : 1) }}
      android_ripple={{ color: "#eee" }}
    >
      <>
        <Text
          value={title}
          weight={3}
          style={styles.groupButtonTitle}
        />
        {selectedFiltersOfThisGroup > 0 && (
          <Text
            value={selectedFiltersOfThisGroup}
            weight={3}
            style={styles.groupButtonNumber}
          />
        )}
        <Icon
          code={status === 0 ? "2b" : "f068"}
          fontawesome
          style={styles.groupButtonIcon}
        />
      </>
    </Pressable>
  )
}

/************************************************************************/

const findFilter = (list, item) => {
  return list.find(x => (x.filterQueryKey === item.filterQueryKey && x.filterQueryVal === item.filterQueryVal));
}

const Group = ({ title, items, groupKey }) => {

  const { selectedFilters, addToSelectedFilters, removeFromSelectedFilters, selectableFilters, protectedFilters } = useContext(ProductListContext);

  const [status, setStatus] = useState(0);

  const height = useSharedValue(0);

  const anim = useAnimatedStyle(() => ({
    height: height.value
  }));

  const activeItems = items.filter(x => { return (!selectableFilters || findFilter(protectedFilters, x) || findFilter(selectableFilters, x)) ? true : false; });

  const sortedItems = items.sort((a, b) => {
    const isActive_a = findFilter(activeItems, a);
    const isActive_b = findFilter(activeItems, b);
    if (isActive_a && isActive_b) return 0;
    if (isActive_a) return -1;
    return 1;
  });

  useEffect(() => {
    if (status > 0) {
      if (status === 1 && items.length >= 6) {
        if (!height.value) height.value = withSpring(6 * 35);
        else height.value = withTiming(6 * 35, { duration: 500 });
      }
      else if (items.length > 6) height.value = withTiming((items.length + 1.3) * 35, { duration: 500 });
      else height.value = withTiming((items.length) * 35, { duration: 500 });
    }
    else {
      height.value = withTiming(0, { duration: 300 });
    }
  }, [status]);

  return (
    <View style={styles.group}>

      <GroupTitleButton
        title={title}
        groupFilterKey={items[0].filterQueryKey}
        itemsCount={activeItems.length}
        status={status}
        setStatus={setStatus}
      />

      <Animated.View style={[styles.groupItemsContainer, anim]}>

        <ScrollView
          style={styles.groupItemContainer(status === 1 && items.length > 6 ? 200 : "auto")}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {sortedItems.map((item, index) => {
            const isSelected = findFilter(selectedFilters, item) ? true : false;
            const isProtected = findFilter(protectedFilters, item) ? true : false;
            const isSelectable = !selectableFilters ? true : findFilter(selectableFilters, item) ? true : false;
            return (
              <Item
                key={index}
                item={item}
                isColored={groupKey === 'fcolor'}
                isSelected={isSelected}
                isProtected={isProtected}
                isSelectable={isSelectable}
                onPress={() => {
                  if (isSelected) removeFromSelectedFilters(item, items);
                  else addToSelectedFilters(item, items);
                }}
              />
            )
          })}
        </ScrollView>

        {items.length > 6 && <>
          <LinearGradient
            colors={['#ffffff00', '#ffffffcc', '#ffffffff', '#ffffffff']}
            style={styles.groupItemsGradient}
            pointerEvents={"none"}
          />
          <TextButton
            text={status === 2 ? "Daha az göster" : "Daha fazla göster..."}
            weight={3}
            style={styles.groupShowMoreButton}
            textStyle={styles.groupShowMoreButtonText}
            onPress={() => { setStatus(status === 1 ? 2 : 1); }}
          />
        </>}

      </Animated.View>

    </View>
  )
}

/************************************************************************/

const Item = ({ item, isColored, isSelected, isProtected, isSelectable, onPress }) => {

  const disabled = isProtected ? false : !isSelectable;

  return (
    <CheckBox
      isChecked={isSelected}
      disableBuiltInState
      disabled={disabled}
      unfillColor={isColored ? item.colorCode : "#fff"}
      fillColor={"#000"}
      useNativeDriver
      innerIconStyle={[styles.groupItemIcon, { borderRadius: 3, borderColor:"#777" }]}
      iconStyle={[styles.groupItemIcon, { marginRight: 15, borderRadius: 3 }]}
      textComponent={(
        <Text
          value={item.name}
          weight={1}
          style={{ color: "#333", textDecorationLine: disabled ? "line-through" : "none" }}
        />
      )}
      style={[styles.groupItem, { opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
    />
  )
};

/************************************************************************/

const PriceGroup = ({ title, items, groupKey }) => {

  const { currency } = useSelector(state => state.app);

  const [status, setStatus] = useState(0);

  const { selectedFilters } = useContext(ProductListContext);

  const [priceFrom, setPriceFrom] = useState(selectedFilters.find(x => x.filterQueryKey === "priceFrom")?.filterQueryVal ?? items[0]);
  const [priceTo, setPriceTo] = useState(selectedFilters.find(x => x.filterQueryKey === "priceTo")?.filterQueryVal ?? items[1]);

  const height = useSharedValue(0);

  const anim = useAnimatedStyle(() => ({
    height: height.value
  }));

  useEffect(() => {
    if (status === 1) {
      if (height.value === 0) height.value = withSpring(70);
      else height.value = withTiming(70, { duration: 500 });
    }
    else height.value = withTiming(0, { duration: 500 });
  }, [status]);

  return (
    <View style={styles.group}>

      <Pressable
        style={styles.groupButton}
        onPress={() => { setStatus(status > 0 ? 0 : 1) }}
        android_ripple={{ color: "#eee" }}
      >
        <>
          <Text
            value={title}
            weight={3}
            style={styles.groupButtonTitle}
          />
          <Text
            value={`${priceFrom} ${currency} - ${priceTo} ${currency}`}
            weight={3}
            style={styles.groupButtonNumber}
          />
          <Icon
            code={status === 0 ? "2b" : "f068"}
            fontawesome
            style={styles.groupButtonIcon}
          />
        </>
      </Pressable>

      <Animated.View style={[styles.groupItemsContainer, anim, { paddingHorizontal: 15 }]}>

        <FilterPriceSlider
          priceFrom={priceFrom}
          priceTo={priceTo}
          minPrice={items[0]}
          maxPrice={items[1]}
          currency={currency}
          onChange={({ priceFrom, priceTo }) => {
            setPriceFrom(priceFrom);
            setPriceTo(priceTo)
          }}
        />

      </Animated.View>

    </View>
  )
}

/************************************************************************/

const FilterPriceSlider = ({
  priceFrom,
  priceTo,
  minPrice,
  maxPrice,
  currency,
  onChange = () => { },
  disabled = false,
}) => {

  const [value, setValue] = useState([priceFrom, priceTo]);

  const { selectedFilters, setSelectedFilters } = useContext(ProductListContext);

  useEffect(() => {

    let newSelectedFilters = JSON.parse(JSON.stringify(selectedFilters));
    let didSelectedFilterChange = false;
    if (priceFrom === minPrice) {
      if (newSelectedFilters.find(x => x.filterQueryKey === "priceFrom")) {
        newSelectedFilters = newSelectedFilters.filter(x => x.filterQueryKey !== "priceFrom");
        didSelectedFilterChange = true;
      }
    }
    else {
      const oldPriceFrom = newSelectedFilters.find(x => x.filterQueryKey === "priceFrom");
      if (oldPriceFrom) oldPriceFrom.filterQueryVal = priceFrom;
      else newSelectedFilters.push({ filterQueryKey: "priceFrom", filterQueryVal: priceFrom });
      didSelectedFilterChange = true;
    }

    if (priceTo === maxPrice) {
      if (newSelectedFilters.find(x => x.filterQueryKey === "priceTo")) {
        newSelectedFilters = newSelectedFilters.filter(x => x.filterQueryKey !== "priceTo");
        didSelectedFilterChange = true;
      }
    }
    else {
      const oldPriceTo = newSelectedFilters.find(x => x.filterQueryKey === "priceTo");
      if (oldPriceTo) oldPriceTo.filterQueryVal = priceTo;
      else newSelectedFilters.push({ filterQueryKey: "priceTo", filterQueryVal: priceTo });
      didSelectedFilterChange = true;
    }
    if (didSelectedFilterChange) setSelectedFilters(newSelectedFilters);
    setValue([priceFrom, priceTo]);

  }, [priceFrom, priceTo]);

  useEffect(() => {
    if (selectedFilters.length === 0 && (value[0] !== minPrice || value[1] !== maxPrice)) {
      setValue([minPrice, maxPrice]);
    }
  }, [selectedFilters]);

  if (isEmpty(priceTo) || isEmpty(priceFrom)) return null;

  return (
    <View style={styles.priceSlider}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          weight={1}
          style={{ fontSize: 13 }}
          value={`${value[0]} ${currency}`}
        />
        <Text
          weight={1}
          style={{ fontSize: 13 }}
          value={`${value[1]} ${currency}`}
        />
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        disabled={disabled}
        minimumValue={minPrice}
        maximumValue={maxPrice}
        onSlidingComplete={() => {
          onChange({ priceFrom: value[0], priceTo: value[1] });
        }}
        step={1}
        trackStyle={{ height: 4.5, borderWidth: 1, borderColor: '#aaa' }}
        thumbStyle={{ width: 13, height: 13 }}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#fff"
        thumbTintColor="#000"
      />
    </View>
  );
};

/************************************************************************/

const Ordering = ({ defaultSortKey }) => {

  const { ordering, setOrdering } = useContext(ProductListContext);

  const list = useMemo(() => {
    return sortValues.map(x => {
      return { label: x.text, value: x.value }
    })
  }, []);

  const [selectedValue, setSelectedValue] = useState(ordering ?? sortValues.find(x => x.key == defaultSortKey).value);

  useEffect(() => {
    if (ordering !== selectedValue) setOrdering(selectedValue);
  }, [selectedValue]);

  return (
    <View style={styles.ordering}>
      <Text
        value="Sırala:"
        weight={3}
        style={{ marginRight: 15, fontSize: 12 }}
      />
      <View style={{ flex: 1, height: 35 }}>
        <SelectBox
          list={list}
          placeholder={{}}
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
          textInputStyle={{ fontSize: 10, height: 35 }}
          iconStyle={{ top: 12, fontSize: 11 }}
        />
      </View>
    </View>
  )
}

/************************************************************************/

const ApplyButton = ({ onPress, filterQuery, sortBy }) => {

  const { selectedFilters, ordering } = useContext(ProductListContext);

  const isFiltersDiffrent = JSON.stringify(selectedFilters) !== JSON.stringify(filterQuery);
  const isOrderingDiffrent = ordering !== sortBy;
  const isDiffrent = isFiltersDiffrent || isOrderingDiffrent;

  return (
    <TextButton
      text="Uygula"
      style={styles.applyButton(!isDiffrent)}
      textStyle={styles.applyButtonText}
      disabled={!isDiffrent}
      onPress={() => {
        onPress({
          selectedFilters: selectedFilters.length > 1 ? sortFilters(selectedFilters) : selectedFilters,
          ordering
        });
      }}
    />
  )
}

/************************************************************************/

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 8 / 10,
    maxWidth: windowWidth,
    minWidth: 250,
    backgroundColor: "#fff",
    height: "100%",
    marginLeft: "auto"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  headerTitle: {
    fontSize: 12,
    paddingHorizontal: 15,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center"
  },
  removeFiltersButton: {
    paddingHorizontal: 15,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  removeFiltersButtonText: {
    fontSize: 12,
    color: "#777"
  },
  headerCloseButton: {
    height: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    justifyContent: "space-between",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  applyButton: disabled => ({
    backgroundColor: disabled ? "#ccc" : "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  }),
  applyButtonText: {
    color: "#fff",
    fontSize: 13
  },
  group: {
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  groupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    height: 45,
    zIndex: 3,
    backgroundColor: "#fff"
  },
  groupButtonTitle: {
    fontSize: 12,
  },
  groupButtonNumber: {
    marginLeft: 10,
    color: "#222",
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  groupButtonIcon: {
    fontSize: 10,
    marginLeft: "auto"
  },
  groupItemsContainer: {

  },
  groupItemContainer: height => ({
    height
  }),
  groupItem: {
    paddingHorizontal: 15,
    height: 35,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  groupItemIcon: {
    borderRadius: 0,
    width: 20,
    height: 20
  },
  groupItemsGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 1
  },
  groupShowMoreButton: {
    paddingHorizontal: 15,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 2
  },
  groupShowMoreButtonText: {
    color: "#999",
    fontSize: 11
  },
  ordering: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
});