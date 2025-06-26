import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { transactions } from "@/lib/mock-data";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statusIcons: { [key: string]: React.ReactNode } = {
  Completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  Pending: <Clock className="h-4 w-4 text-yellow-500" />,
  Failed: <XCircle className="h-4 w-4 text-red-500" />,
};

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Transaction History" />
      <main className="flex-1 p-4 sm:p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={tx.avatar} alt={tx.name} data-ai-hint="transaction person" />
                          <AvatarFallback>{tx.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{tx.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {tx.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(tx.date).toLocaleDateString("en-IN", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.status === "Completed"
                            ? "default"
                            : tx.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        <div className="flex items-center gap-2">
                           {statusIcons[tx.status]}
                           {tx.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold flex items-center justify-end gap-1",
                         tx.type === "credit" ? "text-green-500" : "text-red-500"
                      )}
                    >
                       {tx.type === "credit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      ₹{tx.amount.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
