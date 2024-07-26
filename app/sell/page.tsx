import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import SelectCategory from "./SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";

const SellRoute = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form action="">
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input type="text" placeholder="Name of your Product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input type="number" placeholder="$29" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Express Your Product</Label>
              <Textarea placeholder="Please describe your product shortly right here..." />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <TipTapEditor />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                className="ut-button:bg-primary ut-label:text-primary"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product File</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                appearance={{ button: "bg-primary", label: "text-primary" }}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Button>Submit Form</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default SellRoute;
