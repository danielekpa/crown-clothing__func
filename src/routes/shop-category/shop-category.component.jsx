import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {CategoriesContext} from "../../contexts/categories.context";

import "./shop-category.styles.scss";

export default function ShopCategory() {
  const {category} = useParams();
  const {categoriesMap} = useContext(CategoriesContext);
  return (
    <div className="shop-category">
      <h2 className="title">{category.toUpperCase()}</h2>
      <div className="shop-category-container">
        {categoriesMap[category]?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
