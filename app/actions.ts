"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { CategoryTypes } from "@prisma/client";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z
    .string()
    .min(5, { message: "The name has to have at least 5 characters." }),
  category: z.string().min(1, { message: "Category is required." }),
  price: z.number().min(1, { message: "The price must be 1 or higher." }),
  smallDescription: z
    .string()
    .min(10, { message: "Please summarize your product more." }),
  description: z.string().min(10, { message: "Description is required." }),
  images: z.array(z.string(), { message: "Images are required." }),
  productFile: z
    .string()
    .min(1, { message: "Please upload a zip of your product." }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs...",
    };

    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      smallDescription: validateFields.data.smallDescription,
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      description: JSON.parse(validateFields.data.description),
      sellerId: user.id,
    },
  });
  const state: State = {
    status: "success",
    message: "Product created successfully",
  };

  return state;
}
