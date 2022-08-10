import React, {Fragment, useContext} from "react";
import {Route, Routes} from "react-router-dom";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {CategoriesContext} from "../../contexts/categories.context";
import ShopCategory from "../shop-category/shop-category.component";
import "./shop.styles.scss";

const Shop = () => {
  const {categoriesMap} = useContext(CategoriesContext);
  return (
    <Routes>
      <Route
        index
        element={
          <>
            {Object.keys(categoriesMap).map((title) => (
              <CategoryPreview
                key={title}
                title={title}
                products={categoriesMap[title]}
              />
            ))}
          </>
        }
      ></Route>
      <Route path=":category" element={<ShopCategory />} />
    </Routes>
  );
};

export default Shop;
