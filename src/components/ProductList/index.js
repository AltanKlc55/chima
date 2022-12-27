import { useCallback, useRef, useMemo, useState, memo } from "react";
import { FlatList, ImageBackground, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import FastImage from "react-native-fast-image";
import { isEmpty, windowHeight, windowWidth } from "../../helpers";
import { lazyLoadImage, loadingGif } from "../../config/application";
import { webService } from "../../config/webservice";
import { consoleLog } from "../../helpers/development";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const getRowIndex = (index, rows, rowIndex = 0) => {
  if (index < rows.slice(0, rowIndex + 1).reduce((sum, current) => sum + current, 0)) return rowIndex;
  return getRowIndex(index, rows, rowIndex + 1);
}

const ProductList = ({ navigation, items, badgePositions, totalProductsCount, viewType = "2", filterQuery, categoryId, sortBy }) => {

  const responseWaiting = useRef(false);
  const containerRef = useRef();

  const [page, setPage] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [products, setProducts] = useState(items);
  useEffect(() => {
    setProducts(items);
    setPage(1);
  }, [items]);

  useEffect(() => {
    if (completed) consoleLog(
      "components/ProductList",
      `Listeleme son sayfaya ulaştı. Artık yeni sayfa için istek atılmayacak.`,
      [
        ["completed", completed],
        ["page", page],
        ["totalProductsCount", totalProductsCount],
        ["products.length", products.length]
      ]
    );
    if (totalProductsCount !== null && !completed) consoleLog(
      "components/ProductList",
      `Toplam ürün sayısı belirlendi. (Tükenen ürünler bu sayıya dahil olmayabilir...)`,
      [
        ["totalProductsCount", totalProductsCount],
        ["completed", completed],
        ["page", page]
      ]
    );
  }, [completed, totalProductsCount]);

  const viewTypeRows = useMemo(() => viewType.split("v").map(x => Number(x)), [viewType]);

  const viewTypeGroupLength = useMemo(() => {
    return viewTypeRows.reduce((prev, current) => prev + current, 0);
  }, [viewTypeRows]);

  const groupedProducts = useMemo(() => {
    'worklet';
    const newGroupedProducts = [];
    products.map((x, i) => {
      const inGroupIndex = i % viewTypeGroupLength;
      const groupIndex = Math.floor(i / viewTypeGroupLength);
      const rowIndex = getRowIndex(inGroupIndex, viewTypeRows);
      if (newGroupedProducts.length <= groupIndex) newGroupedProducts.push([]);
      if (newGroupedProducts[groupIndex].length <= rowIndex) newGroupedProducts[groupIndex].push([]);
      newGroupedProducts[groupIndex][rowIndex].push(x);
      const r = viewTypeRows[rowIndex];
      const columnWidth = (r <= 2) ? (windowWidth / r) : (windowWidth - spaceBetweenProducts * (r - 2)) / r;

      x.styles = {
        columnWidth,
        columnIndexInRow: newGroupedProducts[groupIndex][rowIndex].length - 1,
        columnCountOfRow: r,
        height: columnWidth * 3 / 2 + (r < 3 ? 100 : spaceBetweenProducts),
        isInfoSideVisible: r < 3 // bir satırda 2'den fazla ürün varsa ürün bilgileri gizlensin
      };
      x.campaingName = (Array.isArray(x.campaign) && x.campaign.length) ? x.campaign[0] : x.campaign ?? null;
    });
    return newGroupedProducts;
  }, [products, page, viewType]);

  const renderItem = useCallback(
    ({ item, index }) => <ListGroup groupedProducts={item} groupIndex={index} />,
    [products.length]
  );

  const getNewProducts = () => {
    'worklet';
    if (completed) return;
    const newPage = page + 1;
    consoleLog(
      "components > ProductList > index.js",
      "Flatlist > onEndReached() > getNewProducts()",
      [["page", `${newPage}.sayfa için istek atılacak...`]]
    );
    webService.getProductList(categoryId, newPage, sortBy, filterQuery)
      .then(res => {
        if (!res.data?.data) throw { errorNo: 1, responseData: res.data };
        if (res.data?.data?.status === false && res.data?.data?.errorMessage === "NoProducts") {
          setCompleted(true);
          return null;
        }
        if (!res.data.status) throw { errorNo: 2, responseData: res.data };
        return res.data.data;
      })
      .then(res => {
        if (!res) return;
        setProducts([...products, ...res.products]);
        setPage(newPage);
      })
      .catch(err => {
        console.warn("ProductListScreen : components/ProductList/index.js : getNewProducts() : webService.getProducttList() catch'e düştü!", err);
        setCompleted(true);
      })
      .finally(() => {
        responseWaiting.current = false;
      });
  };

  return (
    <FlatList
      ref={containerRef}
      data={groupedProducts}
      keyExtractor={(item, index) => index}
      renderItem={renderItem}
      onScroll={(e) => {
        if (responseWaiting.current) return;
        const scrollPos = e.nativeEvent.contentOffset.y;
        const contentSize = e.nativeEvent.contentSize.height;
        if (scrollPos > contentSize - (3 * windowHeight)) {
          responseWaiting.current = true;
          getNewProducts();
        }
      }}
      getItemLayout={(item, index) => {
        const length = item[0].map(x => x[0].styles.height).reduce((sum, current) => sum + current);
        return {
          length,
          index,
          offset: length * index
        }
      }}
      ListFooterComponent={() => {
        if (completed) return null;
        return (
          <View style={{ alignItems: "center", justifyContent: "center", height: 100 }}>
            <FastImage source={loadingGif} style={{ width: 50, height: 50 }} />
          </View>
        )
      }}
    />
  )
}

export default ProductList;

/************************************************************************/

const ListGroup = memo(({ groupedProducts, groupIndex }) => {
  return (
    <View style={styles.listGroup}>
      {groupedProducts.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.listGroupRow}>
          {row.map((product, productIndex) => (
            <View key={productIndex} style={styles.listGroupColumn}>
              <Product data={product} />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
})

/************************************************************************/

const spaceBetweenProducts = 10; // Ürünler arası boşluğu ayarlamak için

const Product = ({ data }) => {

  const isLastItemOfRow = useMemo(() => {
    return data.styles.columnIndexInRow === data.styles.columnCountOfRow - 1;
  }, [data.styles.columnIndexInRow, data.styles.columnCountOfRow]);

  const isSingleItem = useMemo(() => {
    return data.styles.columnCountOfRow === 1
  }, [data.styles.columnCountOfRow])

  const width = useMemo(() => {
    if (isSingleItem) return data.styles.columnWidth;
    return data.styles.columnWidth - spaceBetweenProducts / data.styles.columnCountOfRow;
  }, [data.styles.columnWidth, data.styles.columnCountOfRow]);

  const marginRight = useMemo(() => {
    return isLastItemOfRow ? 0 : spaceBetweenProducts;
  }, [isLastItemOfRow]);

  const navigation = useNavigation();

  const ProductSlider = useCallback(({ item, index }) => {
    return (
      <ImageBackground source={lazyLoadImage} resizeMode="cover">
        <Pressable onPress={onPress}>
          <FastImage
            source={{ uri: item }}
            style={{
              width,
              aspectRatio: 2 / 3,
            }}
          />
        </Pressable>
      </ImageBackground>
    )
  }, [width]);

  const onPress = () => {
    navigation.navigate("ProductDetailScreen", { item: data })
  }

  return (
    <View style={{ width, height: data.styles.height, marginRight }}>
      <View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={data.images}
          pagingEnabled
          getItemLayout={(_, index) => ({ length: width, index, offset: index * width })}
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%" }}
          keyExtractor={(item, index) => index}
          renderItem={ProductSlider}
        />
        {!data.stockAll && (<Text value="TÜKENDİ" style={styles.outOfStockBadge((data.styles.height - 100) / 2)} pointerEvents={"none"} />)}
      </View>
      {data.styles.isInfoSideVisible !== false && (
        <View style={styles.productInformations}>
          <Pressable onPress={onPress}>
            <Text
              value={data.name}
              weight={3}
              ellipsizeMode={"tail"}
              numberOfLines={1}
              style={styles.productName}
            />
            {!isEmpty(data.campaingName) && (
              <Text
                value={data.campaingName}
                style={styles.campaing}
                weight={3}
                ellipsizeMode={"tail"}
                numberOfLines={1}
              />
            )}
            <View style={styles.priceRow}>
              {!isEmpty(data.calculatedPrices.linedPrice) && (
                <Text
                  value={data.calculatedPrices.linedPrice}
                  weight={3}
                  style={styles.linedPrice}
                />
              )}
              <Text
                value={data.calculatedPrices.salePrice}
                weight={3}
                style={styles.salePrice(!isEmpty(data.calculatedPrices.linedPrice))}
              />
            </View>
            {data.color.length > 1 && (
              <Text
                value={`${data.color.length} Renk`}
                weight={3}
                style={styles.colorCount}
              />
            )}
          </Pressable>
        </View>
      )}
    </View>
  )
}

/************************************************************************/

const styles = StyleSheet.create({
  listGroup: {

  },
  listGroupRow: {
    flexDirection: "row"
  },
  listGroupColumn: {

  },
  outOfStockBadge: top => ({
    position: "absolute",
    top,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 12
  }),
  productInformations: {
    padding: 7,
    flex: 1,
  },
  productName: {
    fontSize: 11
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  linedPrice: {
    textDecorationLine: "line-through",
    paddingTop: 5,
    color: "#444",
    fontSize: 11,
    marginRight: 5
  },
  salePrice: active => ({
    paddingTop: 5,
    fontSize: 12,
    color: active ? "#c00" : "#000"
  }),
  colorCount: {
    color: "#888",
    paddingTop: 5,
    fontSize: 11
  },
  campaing: {
    color: "#c00",
    marginTop: 5,
    fontSize: 11
  }
});

/************************************************************************/

