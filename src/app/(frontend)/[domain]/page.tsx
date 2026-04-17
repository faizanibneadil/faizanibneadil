import { PayloadRedirects } from "@/components/PayloadRedirects";
import type { PageProps } from "@/types";
import { Suspense } from "react";

export default async function DomainPage(props: PageProps) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  return (
    <Suspense fallback='Redirecting ...'>
      <PayloadRedirects domain={params.domain} url={`/${params.domain}`} />
    </Suspense>
  )
}