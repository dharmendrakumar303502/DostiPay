import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ScanLine,
  Send,
  PlusCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { user, transactions, contacts } from "@/lib/mock-data";
import { DashboardHeader } from "@/components/dashboard-header";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const recentTransactions = transactions.slice(0, 4);
  const userInitial = user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardDescription>Available Balance</CardDescription>
              <CardTitle className="text-4xl font-bold tracking-tighter">
                ₹{user.balance.toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
               <Button asChild variant="outline" className="flex-col h-20 gap-1">
                <Link href="/payment">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Send Money</span>
                </Link>
              </Button>
               <Button asChild variant="outline" className="flex-col h-20 gap-1">
                <Link href="/scan">
                  <ScanLine className="h-6 w-6 text-primary" />
                  <span>Scan & Pay</span>
                </Link>
              </Button>
               <Button variant="outline" className="flex-col h-20 gap-1">
                <PlusCircle className="h-6 w-6 text-primary" />
                <span>Request</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/history">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {recentTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={tx.avatar} alt={tx.name} data-ai-hint="transaction person" />
                            <AvatarFallback>{tx.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{tx.name}</div>
                            <div className="text-xs text-muted-foreground">{tx.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={cn(
                          "font-semibold flex items-center justify-end gap-1",
                          tx.type === "credit" ? "text-green-500" : "text-red-500"
                        )}>
                          {tx.type === "credit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                          ₹{tx.amount.toLocaleString("en-IN")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pay Contacts</CardTitle>
              <CardDescription>
                Quickly send money to your friends.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {contacts.slice(0, 4).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} alt={contact.name} data-ai-hint="person avatar" />
                      <AvatarFallback>{contact.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.upiId}</div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href={`/payment?to=${contact.upiId}`}>Pay</Link>
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                <Link href="/payment" className="w-full">View All Contacts</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}


import { getInsightsAction } from '@/actions/getInsightsAction';
