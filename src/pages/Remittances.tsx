import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

const mockData = [
  { id: "REM-001", marketplace: "StubHub", period: "Jan 15–31", gross: "$12,450", fees: "-$1,245", adj: "$0", net: "$11,205", state: "STABLE", version: 1 },
  { id: "REM-002", marketplace: "Vivid Seats", period: "Jan 15–31", gross: "$8,320", fees: "-$832", adj: "-$50", net: "$7,438", state: "DRAFT", version: 1 },
  { id: "REM-003", marketplace: "SeatGeek", period: "Feb 1–14", gross: "$15,780", fees: "-$1,578", adj: "$125", net: "$14,327", state: "LOCKED", version: 3 },
];

const stateColors: Record<string, string> = {
  DRAFT: "bg-warning/15 text-warning border-warning/30",
  STABLE: "bg-success/15 text-success border-success/30",
  LOCKED: "bg-primary/15 text-primary border-primary/30",
};

export default function Remittances() {
  return (
    <div>
      <PageHeader title="Remittances" description="Marketplace payout rollups & stability tracking" actions={<Button size="sm"><Upload className="h-4 w-4 mr-1" />Import</Button>} />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Marketplace</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Fees</TableHead>
                <TableHead className="text-right">Adj</TableHead>
                <TableHead className="text-right">Net Expected</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Ver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>{r.marketplace}</TableCell>
                  <TableCell className="text-muted-foreground">{r.period}</TableCell>
                  <TableCell className="text-right">{r.gross}</TableCell>
                  <TableCell className="text-right text-destructive">{r.fees}</TableCell>
                  <TableCell className="text-right">{r.adj}</TableCell>
                  <TableCell className="text-right font-medium">{r.net}</TableCell>
                  <TableCell><Badge variant="outline" className={stateColors[r.state]}>{r.state}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">v{r.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
