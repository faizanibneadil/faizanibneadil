'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sdk } from "@/lib/sdk";
import { Industry } from "@/payload-types";

const SignUpFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email cannot contain spaces or invalid format'),
    password: z
        .string()
        .min(6, 'Minimum 6 characters')
        .max(20, 'Maximum 20 characters')
        .refine((s) => !s.includes(' '), 'Password cannot contain spaces'),
    username: z
        .string({ error: 'Username is required.' })
        .min(6, 'Minimum 6 characters')
        .max(24, 'Maximum 24 characters')
        .regex(/^[a-zA-Z0-9-]+$/, 'Only letters, numbers, and hyphens (-) are allowed. No spaces or special characters.')
        .refine((s) => !s.startsWith('-') && !s.endsWith('-'), 'Username cannot start or end with a hyphen'),
    industry: z.string().min(1, 'Field is required'),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),
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
            industry: '',
            terms: false,
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
            <form className="space-y-4" onSubmit={onSubmit}>
                <div className="space-y-2 text-center">
                    <h1 className="font-bold text-2xl">Create an account</h1>
                    <p className="text-muted-foreground text-sm">
                        Sign up to get started with our skill shelf
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-background"
                                    placeholder="John Doe"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-background"
                                    placeholder="you@example.com"
                                    type="email"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    className="bg-background"
                                    placeholder="Create a strong password"
                                    type="password"
                                    {...field}
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormDescription className="text-xs">
                                Must contain uppercase, lowercase, and number
                            </FormDescription>
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
                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="font-normal text-sm">
                                    I agree to the{" "}
                                    <a className="hover:underline" href="#">
                                        terms and conditions
                                    </a>
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Signing up ...' : 'Continue'}
                </Button>
                <p className="text-center text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <a className="hover:underline" href="/admin">
                        Sign in
                    </a>
                </p>
            </form>
        </Form>
    )
}