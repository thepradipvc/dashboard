'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string({ message: "Name is required" }).min(3, "Name should be at least 3 characters long"),
    email: z.string({ message: "Email is required" }).email({ message: 'Enter a valid email address' }),
    password: z.string({ message: "Password is required" }).min(8, "Password should be at least 8 characters long")
});

export default function SignupForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        toast.success('Signed In Successfully!');
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label>Name</Label>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your name..."
                                        {...field}
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
                            <FormItem className="space-y-1">
                                <Label>Email</Label>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email..."
                                        {...field}
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
                            <FormItem className="space-y-1">
                                <Label>Password</Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Shhh! keep it secret"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="ml-auto w-full !mt-6" type="submit">
                        Sign Up
                    </Button>
                </form>
            </Form>
            <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            {/* Google signup */}
        </div>
    );
}
