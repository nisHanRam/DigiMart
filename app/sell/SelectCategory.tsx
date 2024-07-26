"use client";
import React, { useState } from "react";
import { categoryItems } from "../lib/categoryItems";
import { Card, CardHeader } from "@/components/ui/card";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory === item.name
                ? "border-primary border-2"
                : "border-primary/10 border-2"
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              {item.image}
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
