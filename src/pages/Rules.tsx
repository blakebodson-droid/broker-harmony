import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

const mockRules = [
  { id: 1, name: "Ignore < $1 transactions", condition: "amount < 1.00", action: "Auto-exclude", enabled: true },
  { id: 2, name: "Flag large variances", condition: "variance > 500", action: "Add to watchlist", enabled: true },
  { id: 3, name: "Auto-match exact amounts", condition: "exact_match && date_within_7d", action: "Auto-match", enabled: false },
];

export default function Rules() {
  return (
    <div>
      <PageHeader title="Rules Engine" description="Configurable rules for automated actions" actions={<Button size="sm"><Plus className="h-4 w-4 mr-1" />Add Rule</Button>} />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Enabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRules.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{r.condition}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{r.action}</Badge></TableCell>
                  <TableCell><Badge variant={r.enabled ? "secondary" : "outline"} className="text-xs">{r.enabled ? "Active" : "Disabled"}</Badge></TableCell>
                  <TableCell className="text-right"><Switch checked={r.enabled} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
