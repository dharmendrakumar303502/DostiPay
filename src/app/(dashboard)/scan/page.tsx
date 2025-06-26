'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Html5Qrcode } from 'html5-qrcode';
import { DashboardHeader } from '@/components/dashboard-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { QrCode, CameraOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const qrCodeRegionId = "qr-code-reader";

export default function ScanPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);
    }
    const html5QrCode = html5QrCodeRef.current;

    const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
      console.log(`Scan result: ${decodedText}`, decodedResult);
      toast({
        title: "QR Code Scanned!",
        description: `Redirecting to payment...`,
      });
      // Assuming the QR code contains a UPI ID, redirect to the payment page.
      // Example: upi://pay?pa=user@okbank&pn=User
      try {
        const url = new URL(decodedText);
        if (url.protocol === 'upi:') {
          const pa = url.searchParams.get('pa');
          if (pa) {
            router.push(`/payment?to=${pa}`);
          } else {
             throw new Error('Invalid UPI QR code. "pa" (payee address) not found.');
          }
        } else {
            router.push(`/payment?to=${decodedText}`);
        }
      } catch (e) {
         toast({
            variant: "destructive",
            title: "Invalid QR Code",
            description: "The scanned QR code is not a valid UPI link or address.",
        });
        console.error("Scanned QR code is not a valid URL or UPI link", e);
      }
      
      if (html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Failed to stop scanning.", err));
      }
    };

    const qrCodeErrorCallback = (error: any) => {
      // This can be noisy. Only log significant errors.
      if (typeof error !== 'string' || !error.includes('No QR code found')) {
        console.error(`QR Code parsing error: ${error}`);
      }
    };

    const startScanner = async () => {
        try {
            await Html5Qrcode.getCameras();
            await html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                },
                qrCodeSuccessCallback,
                qrCodeErrorCallback
            );
        } catch (err: any) {
            console.error("Camera start error:", err);
            setErrorMessage("Could not start camera. Please grant camera permissions in your browser settings.");
        }
    };

    startScanner();

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop()
          .then(() => console.log("QR Code scanning stopped."))
          .catch(err => console.error("Failed to stop QR Code scanning.", err));
      }
    };
  }, [router, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Scan & Pay" />
      <main className="flex-1 p-4 sm:p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
              <QrCode className="h-8 w-8" />
            </div>
            <CardTitle className="mt-4">Scan QR Code</CardTitle>
            <CardDescription>
              Position the QR code within the frame to scan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage ? (
              <Alert variant="destructive">
                <CameraOff className="h-4 w-4" />
                <AlertTitle>Camera Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : (
                <div id={qrCodeRegionId} className="w-full aspect-square rounded-md bg-muted" />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
