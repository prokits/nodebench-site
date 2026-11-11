"use client"

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@/components/ui/select'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/hooks/use-theme"
import { Loader2 } from "lucide-react";
import posthog from 'posthog-js';

const formSchema = z.object({
    email: z.string().email(),
    subject: z.string().nonempty(),
    message: z.string().nonempty(),
    category: z.enum(["general", "collaboration", "feedback"]),
})

export default function QueryForm() {
    const { toast } = useToast()
    const { theme } = useTheme()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            category: "general",
            subject: "",
            message: ""
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Failed to submit');
            }

            form.reset();
            toast({
                title: "Message sent",
                description: "Your message has been sent successfully!",
            })

            posthog.capture('Contact form submit', {
                category: values.category,
                subject: values.subject,
                email: values.email
            })

        } catch (error) {
            toast({
                title: "Failed to send message",
                description: JSON.stringify(error),
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='max-w-md w-full flex flex-col gap-2'>
                    <FormField control={form.control} name="email" render={
                        ({ field }) => {
                            return <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Email address' type='email' />
                                </FormControl>
                                <FormDescription>You will be replied via this email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        }
                    } />

                    <FormField control={form.control} name="category" render={
                        ({ field }) => {
                            return <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Your purpose" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="collaboration">Collaboration</SelectItem>
                                        <SelectItem value="feedback">Feedback</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        }
                    } />

                    <FormField control={form.control} name="subject" render={
                        ({ field }) => {
                            return <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Subject' type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    } />

                    <FormField control={form.control} name="message" render={
                        ({ field }) => {
                            return <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder='Message' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    } />

                    {/* Keyed by theme so the widget re-renders when the theme changes. */}
                    <Turnstile
                        key={theme}
                        className='my-4'
                        siteKey='0x4AAAAAAA4aVCLbIJuXc6yO'
                        options={
                            {
                                theme,
                            }
                        }
                    />

                    <Button disabled={isSubmitting} type='submit' className='w-full'>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}