import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockMatches = [
  { deposit: "BT-1001", remittance: "REM-001", allocated: "$11,205.00", variance: "$0.00", state: "AUTO_MATCHED_1TO1", confidence: 98 },
  { deposit: "BT-1003", remittance: "REM-003", allocated: "$14,327.00", variance: "$0.00", state: "AUTO_MATCHED_1TO1", confidence: 95 },
  { deposit: "BT-1002", remittance: "—", allocated: "—", variance: "$7,438.00", state: "UNMATCHED", confidence: 0 },
  { deposit: "BT-1004", remittance: "—", allocated: "—", variance: "$3,200.00", state: "UNMATCHED", confidence: 0 },
];

const stateColors: Record<string, string> = {
  AUTO_MATCHED_1TO1: "bg-success/15 text-success border-success/30",
  UNMATCHED: "bg-destructive/15 text-destructive border-destructive/30",
  MANUAL_MATCHED: "bg-primary/15 text-primary border-primary/30",
  CANDIDATES_FOUND: "bg-warning/15 text-warning border-warning/30",
};

export default function Matching() {
  return (
    <div>
      <PageHeader
        title="Deposit Matching"
        description="Match bank deposits to remittances"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm">Auto Match</Button>
          </div>
        }
      />
      <div className="p-6 space-y-4">
        <div className="flex gap-4 items-center">
          <Select defaultValue="chase">
            <SelectTrigger className="w-48"><SelectValue placeholder="Bank Account" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="chase">Chase ****4821</SelectItem>
              <SelectItem value="boa">BofA ****7733</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Matched</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Unmatched</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-destructive">2</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Variance</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-warning">$10,638</div></CardContent></Card>
        </div>

        <Tabs defaultValue="review">
          <TabsList>
            <TabsTrigger value="review">For Review</TabsTrigger>
            <TabsTrigger value="matched">Matched</TabsTrigger>
            <TabsTrigger value="excluded">Excluded</TabsTrigger>
          </TabsList>
          <TabsContent value="review" className="mt-4">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deposit</TableHead>
                    <TableHead>Remittance</TableHead>
                    <TableHead className="text-right">Allocated</TableHead>
                    <TableHead className="text-right">Variance</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead className="text-right">Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMatches.map((m) => (
                    <TableRow key={m.deposit}>
                      <TableCell className="font-mono text-xs">{m.deposit}</TableCell>
                      <TableCell className="font-mono text-xs">{m.remittance}</TableCell>
                      <TableCell className="text-right">{m.allocated}</TableCell>
                      <TableCell className="text-right">{m.variance}</TableCell>
                      <TableCell><Badge variant="outline" className={stateColors[m.state] || ""}>{m.state.replace(/_/g, " ")}</Badge></TableCell>
                      <TableCell className="text-right">{m.confidence > 0 ? `${m.confidence}%` : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="matched"><p className="text-sm text-muted-foreground p-4">Matched items will appear here.</p></TabsContent>
          <TabsContent value="excluded"><p className="text-sm text-muted-foreground p-4">Excluded items will appear here.</p></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
