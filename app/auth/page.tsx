"use serve"

import { Metadata } from "next"
import Link from "next/link"
import { SignupCard } from "@/app/components/SignupCard"
import { LoginCard } from "@/app/components/LoginCard"
import { IconLeadFilter, IconDashboard, IconGuaranteed, IconAI } from "@/components/icons"
import { FeatureItem } from "@/app/components/FeatureItem"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "./auth.css"

export const metadata: Metadata = {
  title: "Create an account",
  description: "Authentication forms built using the components.",
}

export default function Auth() {
  return (
    <>
      <div className="container min-h-screen flex">
        <div className="sideheadercontent flex-1">
          <h1 className="logo text-white text-bf text-2xl">BMR Logo</h1>
          <div className="welcome-text-container">
            <h2 className="welcome-text">Welcome to the Future of Mortgage Lending</h2>
            <p className="subtitle">Streamline your workflow. Maximize your leads.</p>
          </div>
          <div className="features">
            <FeatureItem
              icon={<IconLeadFilter className="w-6 h-6" />}
              title="Instant Access to Competitive Leads"
              description="Stay ahead of the competition with real-time updates on available loans."
            />
            <FeatureItem
              icon={<IconDashboard className="w-6 h-6" />}
              title="Advanced Bid Management"
              description="Easily manage your bids with our intuitive dashboard."
            />
            <FeatureItem
              icon={<IconGuaranteed className="w-6 h-6" />}
              title="Guaranteed Leads"
              description="Receive a guaranteed number of high-quality leads each month."
            />
            <FeatureItem
              icon={<IconAI className="w-6 h-6" />}
              title="AI-Powered Loan Matching"
              description="Our AI technology ensures fair lead distribution and data protection."
            />
          </div>
          <div className="copyright">
            <p>© 2024 BeatMyRate</p>
          </div>
        </div>
        <div className="auth-tabs flex-1"> 
          <Tabs defaultValue="signup">
            <TabsList>
              <TabsTrigger value="signup">Create an account</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <SignupCard />
            </TabsContent>
            <TabsContent value="login">
              <LoginCard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
