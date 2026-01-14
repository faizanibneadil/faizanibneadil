'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sdk } from "@/lib/sdk";
import { Config, Industry } from "@/payload-types";
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSignIcon, Fingerprint, User } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PaginatedDocs } from "payload";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from 'zod';

const SignUpFormSchema = z.object({
    // 1. Email Validation
    // .email() builtin hai, lekin mazeed solid banane ke liye regex add kar sakte hain
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email cannot contain spaces or invalid format'),

    // 2. Password Validation (6-20 chars, no spaces)
    password: z
        .string()
        .min(6, 'Minimum 6 characters')
        .max(20, 'Maximum 20 characters')
        .refine((s) => !s.includes(' '), 'Password cannot contain spaces'),

    // 3. Username Validation (6-24 chars, no spaces)
    username: z
        .string({ error: 'Username is required.' })
        .min(6, 'Minimum 6 characters')
        .max(24, 'Maximum 24 characters')
        // Regex breakdown: 
        // ^: start, [a-zA-Z0-9-]: allowed chars, +: one or more, $: end
        .regex(/^[a-zA-Z0-9-]+$/, 'Only letters, numbers, and hyphens (-) are allowed. No spaces or special characters.')
        // Ye check karega ke hyphen start ya end mein na ho (Clean look ke liye)
        .refine((s) => !s.startsWith('-') && !s.endsWith('-'), 'Username cannot start or end with a hyphen'),

    // 4. Industry
    industry: z.string().min(1, 'Field is required'),
})

export function SignUpForm(props: {
    industries: Industry[]
}) {
    const { industries } = props || {}

    const router = useRouter()


    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
            industry: ''
        },
    })

    // console.log({ error: form.formState.errors })
    const onSubmit = form.handleSubmit(async values => {
        try {
            // console.log({ ...values, error: form.formState.errors })
            const req = await sdk.request({
                path: '/users/external-users/signup',
                method: 'POST',
                json: values
            })

            const response = await req.json()
            if ('errors' in response && response.errors?.length) {
                response.errors.forEach(({ message }: { message: string }) => {
                    toast.error(message)
                })
            }
            // console.log(response.errors)
            if (!('errors' in response)) {
                router.replace('/admin')
            }
        } catch (error) {
            console.error('Something went wrong to sign up', error)
        }
    })
    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-">
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Email</FormLabel> */}
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput placeholder="your.email@example.com" type="email" {...field} disabled={form.formState.isSubmitting} />
                                    <InputGroupAddon>
                                        <AtSignIcon />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Password</FormLabel> */}
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput placeholder="********" type="password" {...field} disabled={form.formState.isSubmitting} />
                                    <InputGroupAddon>
                                        <Fingerprint />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Username</FormLabel> */}
                            <FormControl>
                                <InputGroup>
                                    <InputGroupInput placeholder="username" type="text" {...field} disabled={form.formState.isSubmitting} />
                                    <InputGroupAddon>
                                        <User />
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='industry'
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Field</FormLabel> */}
                            <FormControl>
                                <Select name="industry" defaultValue={field.value} onValueChange={field.onChange} disabled={form.formState.isSubmitting}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue id="field" placeholder="Select a field" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {industries?.map(field => (
                                            <SelectItem key={`field-${field?.id}`} value={field?.id?.toString()}>{field?.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Signing up ...' : 'Continue'}</Button>
            </form>
        </Form>
    )
}