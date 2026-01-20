import { getPayloadConfig } from "@/utilities/getPayloadConfig";
import { getMediaUrl, getServerSideURL } from "@/utilities/getURL";
import type { Metadata } from 'next';
import Page from "./p/[slug]/page";
import React, { cache } from "react";
import type { PagePropsWithParams } from "@/types";
import type { CollectionSlug } from "payload";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ domain: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const getProfileAvatar = React.cache(async (domain: string) => {
  try {
    const payload = await getPayloadConfig()
    const avatar = await payload.find({
      collection: "users",
      where: { 'tenants.tenant.slug': { equals: domain } },
      select: { profile: true }
    })
    return getMediaUrl(avatar.docs.at(0)?.profile)
  } catch (error) {
    console.error('Something went wrong to fetch user profile', error)
  }
})

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props || {}
  const domain = (await params)?.domain
  const avatarUrl = await getProfileAvatar(domain)
  return {
    title: domain,
    description: domain,
    metadataBase: new URL(getServerSideURL()),
    ...(avatarUrl && {
      icons: [{
        url: avatarUrl,
        fetchPriority: 'high',
      }]
    }),
    ...(avatarUrl && {
      openGraph: {
        url: avatarUrl,
        images: [{
          url: avatarUrl,
        }]
      }
    })
  }
}

export default async function DomainPage(props: PagePropsWithParams) {
  const params = await props.params
  const __rootPageSlug = await queryRootPageByDomain({ domain: params.domain! })

  if (!__rootPageSlug) {
    return notFound()
  }

  return Page({ ...props, params: Promise.resolve({ ...params, slug: __rootPageSlug as CollectionSlug }) })
}

const queryRootPageByDomain = cache(async ({ domain }: { domain: string }) => {
  const payload = await getPayloadConfig()
  const __slug = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          'tenant.slug': {
            equals: domain
          }
        },
        {
          isRootPage: {
            equals: true
          }
        }
      ]
    },
    select: {
      slug: true
    }
  })
  return __slug?.docs?.at(0)?.slug
})


//import { BlocksRenderrer } from "@/blocks";
//import { Hero } from "@/blocks/Hero/components/hero";
//import { HackathonCard } from "@/components/hackathon-card";
//import BlurFade from "@/components/magicui/blur-fade";
//import BlurFadeText from "@/components/magicui/blur-fade-text";
//import { ProjectCard } from "@/components/project-card";
//import { ResumeCard } from "@/components/resume-card";
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { Badge } from "@/components/ui/badge";
//import { DATA } from "@/data/resume";
//import { getPayloadConfig } from "@/utilities/getPayloadConfig";
//import Link from "next/link";
//import Markdown from "react-markdown";
//
//const BLUR_FADE_DELAY = 0.04;
//
//
//type Props = {
//  params: Promise<{ page: string }>
//}

//export default async function Page({ params }: Props) {
//  const { page: pageId = 1 } = (await params)
//  const config = await getPayloadConfig()
//  const page = await config.findByID({ id: pageId, collection: 'pages' })
//  // console.log(page.layout)
//  return (
//    <main className="flex flex-col min-h-[100dvh] space-y-10">
//      <BlocksRenderrer blocks={page.layout} />
//    </main>
//  )
// return (
//   <main className="flex flex-col min-h-[100dvh] space-y-10">
//     <section id="hero">
//       <div className="mx-auto w-full max-w-2xl space-y-8">
//         <div className="gap-2 flex justify-between">
//           <div className="flex-col flex flex-1 space-y-1.5">
//             <BlurFadeText
//               delay={BLUR_FADE_DELAY}
//               className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
//               yOffset={8}
//               text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
//             />
//             <BlurFadeText
//               className="max-w-[600px] md:text-xl"
//               delay={BLUR_FADE_DELAY}
//               text={DATA.description}
//             />
//           </div>
//           <BlurFade delay={BLUR_FADE_DELAY}>
//             <Avatar className="size-28 border">
//               <AvatarImage
//                 alt={DATA.name}
//                 src={DATA.avatarUrl}
//                 className="object-cover object-top aspect-auto"
//               />
//               <AvatarFallback>{DATA.initials}</AvatarFallback>
//             </Avatar>
//           </BlurFade>
//         </div>
//       </div>
//     </section>
//     <section id="about">
//       <BlurFade delay={BLUR_FADE_DELAY * 3}>
//         <h2 className="text-xl font-bold">About</h2>
//       </BlurFade>
//       <BlurFade delay={BLUR_FADE_DELAY * 4}>
//         <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
//           {DATA.summary}
//         </Markdown>
//       </BlurFade>
//     </section>
//     <section id="work">
//       <div className="flex min-h-0 flex-col gap-y-3">
//         <BlurFade delay={BLUR_FADE_DELAY * 5}>
//           <h2 className="text-xl font-bold">Work Experience</h2>
//         </BlurFade>
//         {DATA.work.map((work, id) => (
//           <BlurFade
//             key={work.company}
//             delay={BLUR_FADE_DELAY * 6 + id * 0.05}
//           >
//             <ResumeCard
//               key={work.company}
//               logoUrl={work.logoUrl}
//               altText={work.company}
//               title={work.company}
//               subtitle={work.title}
//               href={work.href}
//               badges={work.badges}
//               period={`${work.start} - ${work.end ?? "Present"}`}
//               description={work.description}
//             />
//           </BlurFade>
//         ))}
//       </div>
//     </section>
//     <section id="education">
//       <div className="flex min-h-0 flex-col gap-y-3">
//         <BlurFade delay={BLUR_FADE_DELAY * 7}>
//           <h2 className="text-xl font-bold">Education</h2>
//         </BlurFade>
//         {DATA.education.map((education, id) => (
//           <BlurFade
//             key={education.school}
//             delay={BLUR_FADE_DELAY * 8 + id * 0.05}
//           >
//             <ResumeCard
//               key={education.school}
//               href={education.href}
//               logoUrl={education.logoUrl}
//               altText={education.school}
//               title={education.school}
//               subtitle={education.degree}
//               period={`${education.start} - ${education.end}`}
//             />
//           </BlurFade>
//         ))}
//       </div>
//     </section>
//     <section id="skills">
//       <div className="flex min-h-0 flex-col gap-y-3">
//         <BlurFade delay={BLUR_FADE_DELAY * 9}>
//           <h2 className="text-xl font-bold">Skills</h2>
//         </BlurFade>
//         <div className="flex flex-wrap gap-1">
//           {DATA.skills.map((skill, id) => (
//             <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
//               <Badge key={skill}>{skill}</Badge>
//             </BlurFade>
//           ))}
//         </div>
//       </div>
//     </section>
//     <section id="projects">
//       <div className="space-y-12 w-full py-12">
//         <BlurFade delay={BLUR_FADE_DELAY * 11}>
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="space-y-2">
//               <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
//                 My Projects
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                 Check out my latest work
//               </h2>
//               <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 I&apos;ve worked on a variety of projects, from simple
//                 websites to complex web applications. Here are a few of my
//                 favorites.
//               </p>
//             </div>
//           </div>
//         </BlurFade>
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
//           {DATA.projects.map((project, id) => (
//             <BlurFade
//               key={project.title}
//               delay={BLUR_FADE_DELAY * 12 + id * 0.05}
//             >
//               <ProjectCard
//                 href={project.href}
//                 key={project.title}
//                 title={project.title}
//                 description={project.description}
//                 dates={project.dates}
//                 tags={project.technologies}
//                 image={project.image}
//                 video={project.video}
//                 links={project.links}
//               />
//             </BlurFade>
//           ))}
//         </div>
//       </div>
//     </section>
//     {!!DATA.hackathons?.length && (
//       <section id="hackathons">
//         <div className="space-y-12 w-full py-12">
//           <BlurFade delay={BLUR_FADE_DELAY * 13}>
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
//                   Hackathons
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                   I like building things
//                 </h2>
//                 <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   During my time in university, I attended{" "}
//                   {DATA.hackathons.length}+ hackathons. People from around the
//                   country would come together and build incredible things in
//                   2-3 days. It was eye-opening to see the endless
//                   possibilities brought to life by a group of motivated and
//                   passionate individuals.
//                 </p>
//               </div>
//             </div>
//           </BlurFade>
//           <BlurFade delay={BLUR_FADE_DELAY * 14}>
//             <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
//               {DATA.hackathons.map((project: any, id) => (
//                 <BlurFade
//                   key={project.title + project.dates}
//                   delay={BLUR_FADE_DELAY * 15 + id * 0.05}
//                 >
//                   <HackathonCard
//                     title={project.title}
//                     description={project.description}
//                     location={project.location}
//                     dates={project.dates}
//                     image={project.image}
//                     links={project.links}
//                   />
//                 </BlurFade>
//               ))}
//             </ul>
//           </BlurFade>
//         </div>
//       </section>
//     )}
//     <section id="contact">
//       <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
//         <BlurFade delay={BLUR_FADE_DELAY * 16}>
//           <div className="space-y-3">
//             <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
//               Contact
//             </div>
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//               Get in Touch
//             </h2>
//             <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//               Want to chat? Just shoot me a dm{" "}
//               <Link href="#" className="text-blue-500 hover:underline">
//                 with a direct question on Whatsapp (+92) 3422342958
//               </Link>{" "}
//               and I&apos;ll respond whenever I can. I will ignore all
//               soliciting.
//             </p>
//           </div>
//         </BlurFade>
//       </div>
//     </section>
//   </main>
// );
//}
