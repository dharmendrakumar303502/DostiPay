'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DostiPayLogo } from '@/components/dostipay-logo';
import { ArrowRight, Loader2, Phone, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const isFirebaseConfigured = !!auth;

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;

    const recaptchaContainer = document.getElementById('recaptcha-container');
    if (recaptchaContainer && !window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
          'size': 'invisible',
          'callback': (response: any) => {
            console.log("reCAPTCHA verified.");
          },
          'expired-callback': () => {
             toast({
                variant: 'destructive',
                title: 'reCAPTCHA Expired',
                description: 'Please try sending the OTP again.',
              });
          }
        });
        window.recaptchaVerifier.render().catch((err) => {
          console.error("Recaptcha render error:", err);
          toast({
              variant: 'destructive',
              title: "reCAPTCHA Error",
              description: "Could not render reCAPTCHA. Check your network or browser extensions.",
            });
        });
    }

    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.error("Error clearing recaptcha verifier", error);
        }
      }
    }
  }, [isFirebaseConfigured, auth, toast]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !isFirebaseConfigured || !auth) return;
    setLoading(true);

    try {
      if (!window.recaptchaVerifier) {
        throw new Error("Recaptcha verifier not initialized. Please wait a moment and try again.");
      }
      
      const formattedPhoneNumber = `+91${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${formattedPhoneNumber}`,
      });
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      
      let errorTitle = "Failed to send OTP";
      let errorMessage = "An unexpected error occurred. Please try again.";

      switch (error.code) {
        case 'auth/invalid-phone-number':
          errorMessage = "The phone number you entered is not valid. Please enter a 10-digit number.";
          break;
        case 'auth/too-many-requests':
          errorTitle = "Too Many Attempts";
          errorMessage = "You've requested an OTP too many times. Please try again later.";
          break;
        case 'auth/network-request-failed':
          errorTitle = "Network Error";
          errorMessage = "Please check your internet connection and try again.";
          break;
        case 'auth/captcha-check-failed':
          errorTitle = "Verification Failed";
          errorMessage = "reCAPTCHA verification failed. This can happen if your app's domain is not authorized in Firebase. You've added 'localhost', which is great. Please double check for any typos.";
          break;
        case 'auth/operation-not-allowed':
            errorTitle = "Configuration Error";
            errorMessage = "Phone Number sign-in is not enabled for your Firebase project. Please enable it in the Firebase Console under Authentication > Sign-in method.";
            break;
        case 'auth/app-not-authorized':
            errorTitle = "Configuration Error";
            errorMessage = "This app is not authorized for Firebase Authentication. Please check your Firebase project settings and ensure this domain is allowed.";
            break;
        case 'auth/billing-not-enabled':
          errorTitle = "Billing Not Enabled";
          errorMessage = "Your Firebase project must be on the Blaze (pay-as-you-go) plan to use phone authentication. Please upgrade your project in the Firebase Console.";
          break;
        default:
          errorMessage = `An unknown error occurred. (Code: ${error.code})`;
          break;
      }
      
      toast({
        variant: 'destructive',
        title: errorTitle,
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !window.confirmationResult) return;
    setLoading(true);

    try {
      await window.confirmationResult.confirm(otp);
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      let errorMessage = "Failed to verify OTP. Please try again.";
      if (error.code === 'auth/invalid-verification-code') {
          errorMessage = "Invalid OTP. Please check and try again.";
      }
       if (error.code === 'auth/code-expired') {
          errorMessage = "The OTP has expired. Please request a new one.";
      }
      toast({
        variant: 'destructive',
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div>
      </div>
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="items-center text-center">
          <DostiPayLogo className="h-16 w-16 mb-4" />
          <CardTitle className="text-3xl font-bold font-headline tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DostiPay</CardTitle>
          <CardDescription className="text-muted-foreground pt-2">
            Your friendly neighborhood payment app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!isFirebaseConfigured ? (
             <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Firebase Not Configured</AlertTitle>
              <AlertDescription>
                Please add your Firebase project credentials to the <code>.env</code> file to enable phone login.
              </AlertDescription>
            </Alert>
          ) : !otpSent ? (
            <form onSubmit={handleSendOtp} className="grid gap-4">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                  pattern="\d{10}"
                  title="Please enter a 10-digit phone number"
                />
              </div>
              <Button type="submit" size="lg" className="w-full mt-4 rounded-full font-bold text-base" disabled={loading || phoneNumber.length !== 10}>
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Send OTP"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="grid gap-4">
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                required
                maxLength={6}
              />
              <Button type="submit" size="lg" className="w-full mt-4 rounded-full font-bold text-base" disabled={loading || otp.length !== 6}>
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verify OTP"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          )}
          <div id="recaptcha-container"></div>
        </CardContent>
      </Card>
       <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} DostiPay. All rights reserved.
      </footer>
    </main>
  );
}
