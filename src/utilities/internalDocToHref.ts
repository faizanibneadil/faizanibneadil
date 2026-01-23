import type { SerializedLinkNode } from "@payloadcms/richtext-lexical"
import { generateRoute } from "./generateRoute"
import type { CollectionSlug } from "payload"

export function internalDocToHref({ node }: { node: SerializedLinkNode }) {
    const { value: doc, relationTo } = node.fields.doc!
    if (typeof doc !== 'object') {
      throw new Error('Expected value to be an object')
    }

    const route = generateRoute({
      domain: typeof doc?.tenant === 'object' ? (doc?.tenant as any)?.domain : doc?.tenant, 
      slug: relationTo as CollectionSlug,
      docSlug: doc?.slug as string,
      id: doc?.id
    })
  
    const routeMap: { [K in CollectionSlug]?: string } = {
      pages: route.PageRoute,
      blogs: route.RouteWithDocSlug,
      achievements: route.RouteWithDocSlug,
      certifications: route.RouteWithDocSlug,
      forms: route.RouteWithDocSlug,
      licenses: route.RouteWithDocSlug,
      notes: route.RouteWithDocSlug,
      projects: route.RouteWithDocSlug,
      publications: route.RouteWithDocSlug,
      researches: route.RouteWithDocSlug,
      hackathons: route.RouteWithDocSlug,
      educations: route.RouteWithDocSlug,
      experiences: route.RouteWithDocSlug
    }
  
    const redirectTo = routeMap[relationTo as CollectionSlug]
  
    return redirectTo ?? '#'
  
  }