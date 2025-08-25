'use client'
import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Category } from "@/payload-types"
import { PaginatedDocs } from "payload"
import React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { signup } from "@/actions/signup"
import { cn } from "@/lib/utils"

export function SignUp({ getFields }: {
  getFields: Promise<PaginatedDocs<Pick<Category, 'id' | 'title' | 'slug'>>>
}) {
  const fields = React.use(getFields)
  const [state, Signup, isPending] = React.useActionState(signup, {
    message: '',
    success: false,
    initialState: {
      email: '',
      field: '',
      password: '',
      username: ''
    }
  })
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button size="sm">Signup</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Create Account</CredenzaTitle>
          <CredenzaDescription>
            Sign up for a new account by filling out the form below.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="mb-4">
          <p className={cn('text-center', {
            'text-red-600': state?.success === false,
            'text-green-600': state?.success === true
          })}>{state?.message}</p>
          <form action={Signup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input disabled={isPending} defaultValue={state?.initialState?.email?.toString()} id="email" name='email' type="email" placeholder="Enter your email." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input disabled={isPending} defaultValue={state?.initialState?.password?.toString()} id="password" name='password' type="password" placeholder="********" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input disabled={isPending} defaultValue={state?.initialState?.username?.toString()} id="username" name='username' type="text" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field">Field</Label>
              <Select name="field" defaultValue={state?.initialState?.field?.toString()}>
                <SelectTrigger className="w-full" disabled={isPending}>
                  <SelectValue id="field" placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  {fields?.docs?.map(field => (
                    <SelectItem key={`field-${field?.id}`} value={field?.id?.toString()}>{field?.title}</SelectItem>
                  ))}

                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isPending}>{isPending ? 'Signing up ...' : 'Create an account'}</Button>
          </form>
        </CredenzaBody>
        <CredenzaFooter className="flex items-center !justify-between w-full">
          <CredenzaClose asChild>
            <Button variant='destructive'>Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}