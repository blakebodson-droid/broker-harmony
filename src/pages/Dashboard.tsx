import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { label: "Total Matched", value: "$284,320", change: "+12.3%", up: true, icon: CheckCircle },
  { label: "Unmatched Deposits", value: "14", change: "-3", up: false, icon: AlertTriangle },
  { label: "Coverage Rate", value: "94.2%", change: "+2.1%", up: true, icon: TrendingUp },
  { label: "Unexplained Variance", value: "$1,847", change: "+$320", up: false, icon: TrendingDown },
];

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Reconciliation overview and system health" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className={`h-4 w-4 ${s.up ? "text-success" : "text-destructive"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <Badge variant={s.up ? "secondary" : "destructive"} className="mt-1 text-xs">
                  {s.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Recent Ingestion Runs</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["StubHub CSV Import", "Vivid Seats Remittance", "Chase Bank Sync"].map((name, i) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <span>{name}</span>
                    <Badge variant={i === 2 ? "destructive" : "secondary"} className="text-xs">
                      {i === 2 ? "Error" : "Success"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Items Needing Attention</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>Unmatched deposits &gt; 7 days</span><Badge>5</Badge></div>
                <div className="flex justify-between"><span>Draft remittances</span><Badge>3</Badge></div>
                <div className="flex justify-between"><span>Watchlist alerts</span><Badge variant="destructive">2</Badge></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
