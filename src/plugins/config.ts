import { formBuilder } from "@/plugins/formBuilder";
import { seo } from "@/plugins/seo";
import { multiTenancy } from "@/plugins/tenants";
import { uploadthing } from "@/plugins/uploadthing";
import type { Plugin } from "payload";

export const plugins: Plugin[] = [
    uploadthing,
    formBuilder,
    seo,
    multiTenancy,
]