import React from "react";
import {CATEGORIES} from "../../customData.js";
import CategoryItem from "../category-item/category-item.component";
import "./categories.styles.scss";

export default function Categories() {
  return (
    <div className="categories-container">
      {CATEGORIES.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
}
