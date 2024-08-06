import React from "react";
import { LoadingProductCard } from "../components/ProductCard";

const LoadingFile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid gril-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-10">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
};

export default LoadingFile;
