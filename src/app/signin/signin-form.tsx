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
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'nextjs-toploader/app';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { googleLogin, signin } from '@/api/users';
import { GoogleLogin } from "@react-oauth/google";

const formSchema = z.object({
    email: z.string({ message: "Email is required" }).email({ message: 'Enter a valid email address' }),
    password: z.string({ message: "Password is required" }).min(4, "Password should be at least 8 characters long")
});

export default function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const signinMutation = useMutation({
        mutationFn: signin,
        onSuccess: (token) => {
            toast.success('Signed in Successfully!');
            localStorage.setItem("auth_token", token);
            router.push(callbackUrl ?? "/")
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(userData => signinMutation.mutate({ userData }))}
                    className="w-full space-y-2"
                >
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
                                        disabled={signinMutation.isPending}
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
                                        disabled={signinMutation.isPending}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="ml-auto w-full !mt-6" type="submit" disabled={signinMutation.isPending}>
                        Sign In
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
            {/* Google signin */}
            <div className='mt-4'>
                <GoogleLogin
                    text="signin_with"
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
