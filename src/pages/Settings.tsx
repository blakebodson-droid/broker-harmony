import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" description="Organization, accounts, and connector configuration" />
      <div className="p-6 space-y-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle className="text-base">Organization</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Organization Name</Label>
              <Input defaultValue="My Ticket Brokerage" />
            </div>
            <Button size="sm">Save</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Bank Accounts</CardTitle></CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between"><span>Chase ****4821</span><Button variant="outline" size="sm">Configure</Button></div>
              <Separator />
              <div className="flex justify-between"><span>BofA ****7733</span><Button variant="outline" size="sm">Configure</Button></div>
            </div>
            <Button variant="outline" size="sm" className="mt-4">+ Add Bank Account</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Marketplace Accounts</CardTitle></CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between"><span>StubHub</span><Button variant="outline" size="sm">Configure</Button></div>
              <Separator />
              <div className="flex justify-between"><span>Vivid Seats</span><Button variant="outline" size="sm">Configure</Button></div>
              <Separator />
              <div className="flex justify-between"><span>SeatGeek</span><Button variant="outline" size="sm">Configure</Button></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
