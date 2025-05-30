"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/lib/schema";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useFetch from "@/hooks/useFetch";
import { createAccount } from "@/actions/dashboard";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: creatingAccountLoading,
  } = useFetch(createAccount);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });
    
    // running toasts if the account is successfully created
    useEffect(() => {
        if (newAccount && !creatingAccountLoading) {
            toast.success("Account successfully created!");
            reset();
            setOpen(false);
        }
    }, [creatingAccountLoading, newAccount]);

    // running toasts incase of any errors
    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to create account!")
        }
    }, [error]);
    

  // function to create account
  const onSubmit = async (values) => {
    await createAccountFn(values);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
          <div className="px-4 py-4">
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Main checking.."
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Account Type
                </label>
                <Select
                  id="type"
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue={watch("type")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CURRENT">Current</SelectItem>
                    <SelectItem value="SAVINGS">Savings</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600">{errors.type.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="balance">Balance</label>
                <Input
                  type="number"
                  id="balance"
                  placeholder="0.00"
                  step="0.01"
                  {...register("balance")}
                />
                {errors.balance && (
                  <p className="text-sm text-red-600">
                    {errors.balance.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center rounded-lg p-3">
                <div className="space-y-0 5">
                  <label htmlFor="isDefault" className="text-sm font-medium ">
                    Set as Default
                  </label>
                  <p className="text-sm text-muted-foreground">
                    This account will be selected by default for transactions
                  </p>
                </div>
                <Switch
                  id="isDefault"
                  onCheckedChange={(checked) => setValue("isDefault", checked)}
                  checked={watch("isDefault")}
                />
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <DrawerClose asChild>
                  <Button
                    type="button"
                    className="min-w-[200px] flex-1"
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
                <Button type="submit" className="min-w-[200px] flex-1" disabled={creatingAccountLoading}>
                  {creatingAccountLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-2 mr-2" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
