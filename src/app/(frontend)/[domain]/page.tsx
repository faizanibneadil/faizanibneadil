import { Suspense } from "react";
import type { PageProps } from "@/types";
import { PayloadRedirects } from "@/components/PayloadRedirects";

export default async function DomainPage(props: PageProps) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  return (
    <Suspense fallback='Redirecting ...'>
      <PayloadRedirects domain={params.domain} url={`/${params.domain}`} />
    </Suspense>
  )
}