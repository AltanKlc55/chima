import React, { createContext, useState, useEffect } from "react";
import { webService } from "../config/webservice";
import { consoleLog } from "../helpers/development";

export const ProductListContext = createContext();

export const sortFilters = (a, b) => {
  const aName = `${a.filterQueryKey}-${a.filterQueryVal}`;
  const bName = `${b.filterQueryKey}-${b.filterQueryVal}`;
  return aName > bName ? 1 : aName < bName ? -1 : 0;
};

const ProductListContextProvider = ({ route, children }) => {

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [protectedFilters, setProtectedFilters] = useState([]);
  const [selectableFilters, setSelectableFilters] = useState(false);
  const [ordering, setOrdering] = useState(null);

  useEffect(() => {
    if (selectableFilters === false) {
      setSelectableFilters(null);
      return;
    }
    const filtersForRequest = selectedFilters.sort(sortFilters);
    webService.getCategoryFilter(route.params.categoryId, filtersForRequest)
      .then(res => {
        const { classes, colorGroups, sizes } = res.data.data.filters;
        const splittedClasses = [];
        Object.values(classes).map(x => { splittedClasses.push(...x) });
        setSelectableFilters([
          ...splittedClasses.map(x => ({ filterQueryKey: x.filterQueryKey, filterQueryVal: x.filterQueryVal })),
          ...colorGroups.map(x => ({ filterQueryKey: x.filterQueryKey, filterQueryVal: x.filterQueryVal })),
          ...sizes.map(x => ({ filterQueryKey: x.filterQueryKey, filterQueryVal: x.filterQueryVal }))
        ]);
      })
      .catch(err => { });
  }, [selectedFilters]);

  useEffect(() => {
    consoleLog("ProductListContext > useEffect[selectedFilters]", "State güncellendi", [["selectedFilters:", selectedFilters]]);
  }, [selectedFilters]);
  useEffect(() => {
    consoleLog("ProductListContext > useEffect[protectedFilters]", "State güncellendi", [["protectedFilters:", protectedFilters]]);
  }, [protectedFilters]);
  useEffect(() => {
    consoleLog("ProductListContext > useEffect[selectableFilters]", "State güncellendi", [["selectableFilters:", selectableFilters]]);
  }, [selectableFilters]);

  const addToSelectedFilters = (item, group) => {
    setSelectedFilters([
      ...selectedFilters,
      { filterQueryKey: item.filterQueryKey, filterQueryVal: item.filterQueryVal }
    ]);

    const newProtectedFilters = group.filter(x => {
      // eğer bir item zaten koruma altındaysa yeniden eklenmesine gerek yok.
      if (protectedFilters.find(f => f.filterQueryKey === x.filterQueryKey && f.filterQueryVal === x.filterQueryVal)) return false;

      // seçilebilir bir itemse koruma altına girecek.
      if (!selectableFilters || selectableFilters.find(f => f.filterQueryKey === x.filterQueryKey && f.filterQueryVal === x.filterQueryVal)) return true;

      return false;
    }).map(x => ({ filterQueryKey: x.filterQueryKey, filterQueryVal: x.filterQueryVal }));

    setProtectedFilters([...protectedFilters, ...newProtectedFilters]);
  }

  const removeFromSelectedFilters = (item) => {
    const newSelectedFilters = selectedFilters.filter(x => !(x.filterQueryKey === item.filterQueryKey && x.filterQueryVal === item.filterQueryVal));
    setSelectedFilters(
      newSelectedFilters
    );
    if (!newSelectedFilters.find(x => x.filterQueryKey === item.filterQueryKey)) {
      const newProtectedFilters = protectedFilters.filter(x => x.filterQueryKey === item.filterQueryKey);
      setProtectedFilters(newProtectedFilters);
    }
  }

  const removeAllSelectedFilters = () => {
    setSelectedFilters([]);
  }

  return (
    <ProductListContext.Provider value={{
      selectedFilters,
      addToSelectedFilters,
      removeFromSelectedFilters,
      removeAllSelectedFilters,
      setSelectedFilters,
      protectedFilters,
      selectableFilters,
      ordering,
      setOrdering
    }}>
      {children}
    </ProductListContext.Provider>
  )
}
export default ProductListContextProvider