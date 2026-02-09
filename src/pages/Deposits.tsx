import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

const mockData = [
  { id: "BT-1001", date: "2026-02-01", description: "ACH CREDIT STUBHUB", amount: "$11,205.00", source: "Chase", matched: true },
  { id: "BT-1002", date: "2026-02-03", description: "WIRE VIVID SEATS PAYOUT", amount: "$7,438.00", source: "Chase", matched: false },
  { id: "BT-1003", date: "2026-02-05", description: "ACH CREDIT SEATGEEK", amount: "$14,327.00", source: "CSV Import", matched: true },
  { id: "BT-1004", date: "2026-02-07", description: "ACH CREDIT UNKNOWN", amount: "$3,200.00", source: "Chase", matched: false },
];

export default function Deposits() {
  return (
    <div>
      <PageHeader title="Bank Deposits" description="Bank transactions imported via CSV or connector" actions={<Button size="sm"><Upload className="h-4 w-4 mr-1" />Import CSV</Button>} />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell className="text-right font-medium">{t.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{t.source}</TableCell>
                  <TableCell>
                    <Badge variant={t.matched ? "secondary" : "destructive"} className="text-xs">
                      {t.matched ? "Matched" : "Unmatched"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
