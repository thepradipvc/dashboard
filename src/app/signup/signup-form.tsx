'use client';
import { signup, googleLogin } from '@/api/users';
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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { GoogleLogin } from "@react-oauth/google";

const formSchema = z.object({
    name: z.string({ message: "Name is required" }).min(3, "Name should be at least 3 characters long"),
    email: z.string({ message: "Email is required" }).email({ message: 'Enter a valid email address' }),
    password: z.string({ message: "Password is required" }).min(4, "Password should be at least 8 characters long")
});

export default function SignupForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const signupMutation = useMutation({
        mutationFn: signup,
        onSuccess: (token) => {
            toast.success('Signed Up Successfully!');
            localStorage.setItem("auth_token", token);
            router.push("/onboarding");
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(userData => signupMutation.mutate({ userData }))}
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
                                        disabled={signupMutation.isPending}
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
                                        disabled={signupMutation.isPending}
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
                                        disabled={signupMutation.isPending}
                                        placeholder="Shhh! keep it secret"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={signupMutation.isPending} className="ml-auto w-full !mt-6" type="submit">
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
            <div className='mt-4'>
                <GoogleLogin
                    text="signup_with"
                    onSuccess={async (credentialResponse) => {
                        try {
                            const credential = credentialResponse.credential ?? "";
                            const response = await googleLogin({ credential });
                            localStorage.setItem("auth_token", response.accessToken);
                            const userCreatedAt = new Date(response.user.createdAt);
                            const now = new Date();
                            const timeDifference = now.getTime() - userCreatedAt.getTime();
                            const secondsDifference = timeDifference / 1000;
                            if (secondsDifference <= 120) {
                                router.push("/onboarding");
                            } else {
                                router.push("/");
                            }
                        } catch (error: any) {
                            toast.error(error.message)
                        }
                    }}
                    onError={() => {
                        toast.error("Failed to login with google. Please try again")
                    }}
                />
            </div>
        </div>
    );
}
