// IGNORE THIS FILE

"use serve"

import { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/app/components/SignupForm"
import { IconLeadFilter, IconDashboard, IconGuaranteed, IconAI } from "@/components/icons"
import { FeatureItem } from "@/app/components/FeatureItem"
import "./signup.css"


export const metadata: Metadata = {
  title: "Create an account",
  description: "Authentication forms built using the components.",
}

export default function Signup() {
  return (
    <>
      <div className="container">
        <div className="sideheadercontent">

          <div>
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
       
        <div className="signup">
          <div className="signup-content">
            <div className="signup-header">
              <h1 className="signup-title">
                Create an account
              </h1>
              <p>
                Already have an account?{" "}
                <Link href="/auth/login" className="link">
                  Sign in
                </Link>
              </p>
              <p className="signup-subtitle">
                Enter your email below to create your account
              </p>
            </div>
            <SignupForm />
            <p className="terms">
              By clicking continue, you agree to our{" "}
              <Link href="/terms" className="link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="link">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="login-prompt">
              Already have an account?{" "}
              <Link href="/auth/login" className="link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
