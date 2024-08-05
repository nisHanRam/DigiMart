import ProductCard from "@/app/components/ProductCard";
import prisma from "@/app/lib/db";
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

async function getData(category: string) {
  let input;
  switch (category) {
    case "template":
      input = "template";
      break;
    case "uiKit":
      input = "uiKit";
      break;
    case "icon":
      input = "icon";
      break;
    case "all":
      input = undefined;
      break;
    default:
      return notFound();
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      smallDescription: true,
      name: true,
      price: true,
    },
  });

  return data;
}

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const data = await getData(params.category);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            images={item.images}
            price={item.price}
            name={item.name}
            smallDescription={item.smallDescription}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
