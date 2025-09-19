import { useState } from "react";
import axios from "axios"; // Make sure axios is installed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  QrCode, Search, MapPin, Calendar, User, Leaf, 
  Package, Truck, CheckCircle, Shield, Award
} from "lucide-react";
import { toast } from "sonner";

// --- ✅ 1. UPDATED TYPES TO MATCH YOUR BACKEND API ---
interface TraceEvent {
  status: string;
  stakeholder: string;
  location: string;
  notes: string;
  eventTimestamp: string;
  blockTimestamp: string;
}
interface BatchData {
  batchId: string;
  herbType: string;
  farmerName: string;
  location: string;
  harvestDate: string;
  quantityKg: string;
  farmingMethod: string;
  qualityScore: string;
  history: TraceEvent[];
}

const ConsumerVerification = () => {
  const [batchId, setBatchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [batchInfo, setBatchInfo] = useState<BatchData | null>(null);

  // --- ✅ 2. THIS IS THE UPGRADED FUNCTION WITH A REAL API CALL ---
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBatchInfo(null); // Clear previous results
    
    try {
      // Replace the simulated API call with a real axios call
      const response = await axios.get(`/api/herbs/${batchId}`);
      
      setBatchInfo(response.data);
      toast.success("Batch verified successfully!", {
        description: "Authentic product with complete traceability"
      });

    } catch (error: any) {
      setBatchInfo(null);
      toast.error("Batch not found", {
        description: error.response?.data?.error || "Please check the batch ID and try again"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage.toLowerCase()) { // Use toLowerCase() for consistency
      case "harvested": return <Leaf className="h-4 w-4" />;
      case "quality-tested": return <Award className="h-4 w-4" />;
      case "processed": return <Package className="h-4 w-4" />;
      case "packaged": return <Package className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  // --- The rest of your component's JSX is great, we just need to update the variable names ---
  // e.g., batchInfo.herb -> batchInfo.herbType
  // e.g., batchInfo.farmer -> batchInfo.farmerName
  // e.g., batchInfo.timeline -> batchInfo.history

  return (
    <Card className="bg-gradient-card shadow-medium animate-fade-in">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <QrCode className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Consumer Verification</CardTitle>
        </div>
        <CardDescription>
          Verify the authenticity and trace the journey of your Ayurvedic herbs
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="batchId">Batch ID or QR Code</Label>
            <div className="flex gap-2">
              <Input
                id="batchId"
                placeholder="Enter batch ID (e.g., BATCH-Z8KP36I)"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                required
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : (<><Search className="h-4 w-4 mr-2" /> Verify</>)}
              </Button>
            </div>
          </div>
        </form>

        {batchInfo && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-success" />
                <h3 className="font-semibold text-success">Verified Authentic Product</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                This product's history has been verified on the blockchain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2"><Package className="h-4 w-4" /> Batch Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Batch ID:</span><span className="font-medium">{batchInfo.batchId}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Herb Type:</span><span className="font-medium">{batchInfo.herbType}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Quantity:</span><span className="font-medium">{batchInfo.quantityKg} kg</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">AI Quality Score:</span><Badge variant="success">{batchInfo.qualityScore}/10</Badge></div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2"><User className="h-4 w-4" /> Origin Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Farmer:</span><span className="font-medium">{batchInfo.farmerName}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location:</span><span className="font-medium">{batchInfo.location}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Harvest Date:</span><span className="font-medium">{batchInfo.harvestDate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Method:</span><Badge variant="outline">{batchInfo.farmingMethod}</Badge></div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4" /> Batch Timeline</h4>
              <div className="space-y-3 text-left">
                {batchInfo.history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="p-2 rounded-full bg-success/20 text-success">{getStageIcon(entry.status)}</div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">{entry.status}</h5>
                        <Badge variant="outline">{entry.stakeholder}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground text-left">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {entry.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(entry.eventTimestamp).toLocaleString()}</span>
                      </div>
                       {entry.notes && <p className="text-xs text-muted-foreground mt-1">Notes: {entry.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsumerVerification;