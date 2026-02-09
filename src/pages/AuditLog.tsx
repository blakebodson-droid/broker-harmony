import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockLogs = [
  { ts: "2026-02-09 14:32", user: "Alex Morgan", action: "Imported CSV", target: "bank_transactions", detail: "42 rows" },
  { ts: "2026-02-09 13:15", user: "System", action: "Auto-matched", target: "deposit_match_edges", detail: "BT-1001 → REM-001" },
  { ts: "2026-02-09 12:01", user: "Alex Morgan", action: "Locked remittance", target: "remittances", detail: "REM-003 v3" },
  { ts: "2026-02-08 18:45", user: "System", action: "Ingestion error", target: "ingestion_runs", detail: "Chase connector timeout" },
];

export default function AuditLog() {
  return (
    <div>
      <PageHeader title="Audit Log" description="Comprehensive activity log of all user and system actions" />
      <div className="p-6">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((l, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs text-muted-foreground font-mono">{l.ts}</TableCell>
                  <TableCell>{l.user}</TableCell>
                  <TableCell><Badge variant={l.action.includes("error") ? "destructive" : "secondary"} className="text-xs">{l.action}</Badge></TableCell>
                  <TableCell className="font-mono text-xs">{l.target}</TableCell>
                  <TableCell className="text-sm">{l.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
