"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import SubmitButton from "./SubmitButton";
import { useFormState } from "react-dom";
import { State, updateUserSettings } from "../actions";
import { toast } from "sonner";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsForm = ({ firstName, lastName, email }: iAppProps) => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(updateUserSettings, initialState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state?.message);
    } else if (state?.status === "success") {
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input type="text" name="firstName" defaultValue={firstName} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input type="text" name="lastName" defaultValue={lastName} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input type="email" name="email" defaultValue={email} disabled />
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Update your settings" />
      </CardFooter>
    </form>
  );
};

export default SettingsForm;
