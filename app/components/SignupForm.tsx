"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
 import { Checkbox } from "@/components/ui/checkbox";
import statesData from "@/app/data/statesData";
import { SelectSearch } from "@/app/components/SelectSearch";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Adjust the import path as necessary


const formSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required." }),
    licenseNumber: z.string().min(1, { message: "License Number is required." }),
    stateOfLicensure: z.string().min(1, { message: "State of Licensure is required." }),
    yearsOfExperience: z.string().min(1, { message: "Years of Experience is required." }),
    companyName: z.string().optional(),
    companyAddress: z.string().optional(),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }),
    agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms." }),
    agreePrivacy: z.boolean().refine(val => val === true, { message: "You must agree to the privacy policy." }),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      licenseNumber: "",
      stateOfLicensure: "",
      yearsOfExperience: "",
      companyName: "",
      companyAddress: "",
      username: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
      agreePrivacy: false,
      referralCode: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
        router.push('/dashboard'); // Redirect to dashboard
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  // // Ensure statesData is correctly typed
  // const stateData = statesData;

  // // Transform statesData to fit the SelectSearch format
  // const transformedStatesData = statesData.map((state) => ({
  //   value: state.value,
  //   label: state.label,
  // }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl>
                <Input placeholder="12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stateOfLicensure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State of Licensure</FormLabel>
              <FormControl>
                <SelectSearch
                  items={statesData}
                  placeholder="Select state..."
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <SelectSearch
                  items={Array.from({ length: 51 }, (_, i) => ({
                    value: i.toString(),
                    label: `${i} ${i === 1 ? "year" : "years"}`,
                  }))}
                  placeholder="Select years..."
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="ABC Mortgage Services" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Input placeholder="1234 Main St, Los Angeles, CA 90001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe_lo" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value} // Use checked instead of value
                  onCheckedChange={(checked) => field.onChange(checked)}
                  value={undefined} // Remove or set to undefined
                />
              </FormControl>
              <FormLabel>I agree to the <a href="/terms" className="underline">Terms and Conditions</a></FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreePrivacy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value} // Use checked instead of value
                  onCheckedChange={(checked) => field.onChange(checked)}
                  value={undefined} // Remove or set to undefined
                />
              </FormControl>
              <FormLabel>I have read and agree to the <a href="/privacy" className="underline">Privacy Policy</a></FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referral Code</FormLabel>
              <FormControl>
                <Input placeholder="REF123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  )
}
