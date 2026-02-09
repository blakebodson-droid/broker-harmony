import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockData = [
  { id: "WL-001", marketplace: "StubHub", expected: "2026-01-28", amount: "$4,200", age: 12, priority: "High", status: "Overdue" },
  { id: "WL-002", marketplace: "Vivid Seats", expected: "2026-02-01", amount: "$7,438", age: 8, priority: "Medium", status: "Overdue" },
  { id: "WL-003", marketplace: "SeatGeek", expected: "2026-02-10", amount: "$2,100", age: 0, priority: "Low", status: "Pending" },
];

const priorityColors: Record<string, string> = {
  High: "bg-destructive/15 text-destructive border-destructive/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-muted text-muted-foreground",
};

export default function Watchlist() {
  return (
    <div>
      <PageHeader title="Watchlist" description="Overdue receivables and aging remittances" />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Marketplace</TableHead>
                <TableHead>Expected Pay</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Days Overdue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((w) => (
                <TableRow key={w.id}>
                  <TableCell className="font-mono text-xs">{w.id}</TableCell>
                  <TableCell>{w.marketplace}</TableCell>
                  <TableCell>{w.expected}</TableCell>
                  <TableCell className="text-right font-medium">{w.amount}</TableCell>
                  <TableCell className="text-right">{w.age > 0 ? w.age : "—"}</TableCell>
                  <TableCell><Badge variant="outline" className={priorityColors[w.priority]}>{w.priority}</Badge></TableCell>
                  <TableCell><Badge variant={w.status === "Overdue" ? "destructive" : "secondary"} className="text-xs">{w.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
