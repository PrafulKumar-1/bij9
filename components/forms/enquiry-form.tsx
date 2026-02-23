"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { enquirySchema, type EnquiryInput } from "@/lib/validators/enquiry";

type EnquiryFormProps = {
  productId?: string;
  type?: "product" | "general";
  compact?: boolean;
};

export function EnquiryForm({ productId, type = "general", compact = false }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      type,
      productId,
      message: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, type, productId }),
    });

    if (!response.ok) {
      return;
    }

    setSubmitted(true);
    reset({ ...values, message: "" });
  });

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-200">
        Thank you. Our export desk will get back to you shortly with sourcing and pricing details.
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Carter" {...register("name")} />
          {errors.name ? <p className="text-xs text-rose-300">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="buyer@company.com" type="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-rose-300">{errors.email.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+1 555 123 1234" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Northstar Imports" {...register("company")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" placeholder="United States" {...register("country")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Share specs, packaging preferences, required quantity, and timeline."
          {...register("message")}
        />
        {errors.message ? <p className="text-xs text-rose-300">{errors.message.message}</p> : null}
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Request Quote"}
      </Button>
    </form>
  );
}
