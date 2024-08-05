import React, { Suspense } from "react";
import prisma from "../lib/db";
import { notFound } from "next/navigation";
import ProductCard, { LoadingProductCard } from "./ProductCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface iAppProps {
  category: "newest" | "templates" | "uiKits" | "icons";
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          images: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });
      return { data: data, title: "Newest", link: "/products/all" };
    }

    case "templates": {
      const data = await prisma.product.findMany({
        where: {
          category: "template",
        },
        select: {
          price: true,
          images: true,
          name: true,
          smallDescription: true,
          id: true,
        },
        take: 3,
      });
      return { data: data, title: "Templates", link: "/products/template" };
    }

    case "uiKits": {
      const data = await prisma.product.findMany({
        where: {
          category: "uiKit",
        },
        select: {
          price: true,
          images: true,
          name: true,
          smallDescription: true,
          id: true,
        },
        take: 3,
      });
      return { data: data, title: "Ui Kits", link: "/products/uiKit" };
    }

    case "icons": {
      const data = await prisma.product.findMany({
        where: {
          category: "icon",
        },
        select: {
          price: true,
          name: true,
          images: true,
          smallDescription: true,
          id: true,
        },
        take: 3,
      });
      return { data: data, title: "Icons", link: "/products/icon" };
    }

    default: {
      return notFound();
    }
  }
}

const ProductRow = async ({ category }: iAppProps) => {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
};

export default ProductRow;

export async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All {data.title === "Newest" ? "Products" : data.title}{" "}
          <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.data.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            id={product.id}
            name={product.name}
            smallDescription={product.smallDescription}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
