import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contacts } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardHeader } from "@/components/dashboard-header";

function PaymentForm({ upiId }: { upiId: string | undefined }) {
  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="upi-id">Recipient UPI ID or Phone</Label>
        <Input id="upi-id" placeholder="Enter UPI ID or mobile number" defaultValue={upiId} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" placeholder="₹0.00" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Textarea id="note" placeholder="Add a note" />
      </div>
      <Button type="submit" size="lg" className="w-full">
        Proceed to Pay
      </Button>
    </form>
  )
}

function PaymentPageContent({ searchParams }: { searchParams: { to?: string } }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>
            Enter the details to send money securely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentForm upiId={searchParams.to} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 max-h-[400px] overflow-y-auto">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person avatar" />
                  <AvatarFallback>{contact.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{contact.upiId}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/payment?to=${contact.upiId}`}>Pay</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentPage({ searchParams }: { searchParams: { to?: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Send Money" />
      <main className="flex-1 p-4 sm:p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentPageContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
