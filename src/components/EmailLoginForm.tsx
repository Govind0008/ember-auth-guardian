
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Mail } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormData = z.infer<typeof formSchema>;

interface EmailLoginFormProps {
  onOtpRequested: (email: string) => void;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onOtpRequested }) => {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");

  // Initialize form with validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await login(data.email, role);
      if (result) {
        onOtpRequested(data.email);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-lg animate-fade-in-up">
      <CardHeader className="space-y-1">
        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
          <Mail className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl text-center font-bold">Log In</CardTitle>
        <CardDescription className="text-center">
          Enter your email to receive a one-time passcode
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">I am a:</p>
                <ToggleGroup 
                  type="single" 
                  value={role}
                  onValueChange={(value) => value && setRole(value as "user" | "admin")} 
                  className="justify-center"
                >
                  <ToggleGroupItem value="user" className="px-6">User</ToggleGroupItem>
                  <ToggleGroupItem value="admin" className="px-6">Admin</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending OTP..." : "Continue with Email"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">
          Passwordless authentication with secure OTP
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmailLoginForm;
