import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

const mockData = [
  { id: "PL-001", remittance: "REM-001", type: "Payment", description: "Order #8842", amount: "$450.00", marketplace: "StubHub" },
  { id: "PL-002", remittance: "REM-001", type: "Fee", description: "Commission", amount: "-$45.00", marketplace: "StubHub" },
  { id: "PL-003", remittance: "REM-002", type: "Payment", description: "Order #9102", amount: "$820.00", marketplace: "Vivid Seats" },
  { id: "PL-004", remittance: "REM-002", type: "Adjustment", description: "Chargeback reversal", amount: "$50.00", marketplace: "Vivid Seats" },
];

const typeColors: Record<string, string> = {
  Payment: "bg-success/15 text-success border-success/30",
  Fee: "bg-destructive/15 text-destructive border-destructive/30",
  Adjustment: "bg-warning/15 text-warning border-warning/30",
};

export default function PaymentLines() {
  return (
    <div>
      <PageHeader title="Payment Lines" description="Individual payment line items from marketplace remittances" actions={<Button size="sm"><Upload className="h-4 w-4 mr-1" />Import</Button>} />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Remittance</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount (Signed)</TableHead>
                <TableHead>Marketplace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-xs">{l.id}</TableCell>
                  <TableCell className="font-mono text-xs">{l.remittance}</TableCell>
                  <TableCell><Badge variant="outline" className={typeColors[l.type]}>{l.type}</Badge></TableCell>
                  <TableCell>{l.description}</TableCell>
                  <TableCell className={`text-right font-medium ${l.amount.startsWith("-") ? "text-destructive" : ""}`}>{l.amount}</TableCell>
                  <TableCell className="text-muted-foreground">{l.marketplace}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
