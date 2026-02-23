"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INCOTERMS } from "@/lib/constants";
import { requirementRequestSchema } from "@/lib/validators/request";

type RequirementFormValues = z.input<typeof requirementRequestSchema>;

export function RequirementForm() {
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RequirementFormValues>({
    resolver: zodResolver(requirementRequestSchema),
    defaultValues: {
      attachments: [],
      incoterms: "FOB",
      unit: "kg",
      quantity: "",
      productName: "",
      targetCountry: "",
      qualitySpec: "",
      packaging: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      targetPrice: "",
      message: "",
    },
  });

  const attachments = watch("attachments");

  const onFilesChange = async (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    setUploading(true);

    try {
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "requirements");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          continue;
        }

        const data = (await response.json()) as { url: string };
        uploaded.push(data.url);
      }

      setValue("attachments", [...(attachments ?? []), ...uploaded], { shouldValidate: true });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/requirements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      return;
    }

    setSubmitted(true);
    reset();
  });

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-sm text-emerald-200">
        Requirement received. Our sourcing desk will review your brief and respond with a structured proposal.
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Product Name" error={errors.productName?.message}>
          <Input placeholder="Dehydrated Shiitake Mushroom" {...register("productName")} />
        </Field>
        <Field label="Target Country" error={errors.targetCountry?.message}>
          <Input placeholder="Germany" {...register("targetCountry")} />
        </Field>
        <Field label="Quantity" error={errors.quantity?.message}>
          <Input placeholder="5000" {...register("quantity")} />
        </Field>
        <Field label="Unit" error={errors.unit?.message}>
          <Input placeholder="kg" {...register("unit")} />
        </Field>
        <Field label="Quality Standard / Spec" error={errors.qualitySpec?.message}>
          <Input placeholder="EU food grade, moisture <8%" {...register("qualitySpec")} />
        </Field>
        <Field label="Packaging Requirement" error={errors.packaging?.message}>
          <Input placeholder="25kg moisture barrier bags" {...register("packaging")} />
        </Field>
        <Field label="Target Price (optional)">
          <Input placeholder="USD 2.5/kg" {...register("targetPrice")} />
        </Field>
        <Field label="Timeline" error={errors.timeline?.message}>
          <Input placeholder="Shipment in 45 days" {...register("timeline")} />
        </Field>
      </div>

      <div className="space-y-2">
        <Label>Delivery Terms (Incoterms)</Label>
        <Select defaultValue="FOB" onValueChange={(value) => setValue("incoterms", value, { shouldValidate: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Incoterms" />
          </SelectTrigger>
          <SelectContent>
            {INCOTERMS.map((term) => (
              <SelectItem key={term} value={term}>
                {term}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachments">Attachments</Label>
        <Input id="attachments" onChange={(event) => onFilesChange(event.target.files)} type="file" multiple />
        <p className="text-xs text-[var(--gm-color-text-muted)]">Upload specs, images, or previous references (PDF/JPG/PNG/WEBP).</p>
        {uploading ? <p className="text-xs text-[var(--gm-color-gold)]">Uploading files...</p> : null}
        {attachments?.length ? (
          <ul className="space-y-1 text-xs text-[var(--gm-color-text-muted)]">
            {attachments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Contact Name" error={errors.name?.message}>
          <Input placeholder="Jane Smith" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input placeholder="jane@company.com" type="email" {...register("email")} />
        </Field>
        <Field label="Phone">
          <Input placeholder="+44 7700 900000" {...register("phone")} />
        </Field>
        <Field label="Company">
          <Input placeholder="Continental Foods GmbH" {...register("company")} />
        </Field>
        <Field label="Country">
          <Input placeholder="Germany" {...register("country")} />
        </Field>
      </div>

      <Field label="Additional Notes">
        <Textarea placeholder="Any additional commercial, quality, or compliance notes" {...register("message")} />
      </Field>

      <Button disabled={isSubmitting || uploading} type="submit">
        {isSubmitting ? "Submitting..." : "Send Requirement"}
      </Button>
    </form>
  );
}

function Field({
  children,
  label,
  error,
}: {
  children: React.ReactNode;
  label: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
