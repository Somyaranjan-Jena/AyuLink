import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";

const SupplyChainUpdate = () => {
  const [formData, setFormData] = useState({
    batchId: "",
    stakeholder: "",
    status: "",
    location: "",
    notes: "",
    timestamp: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Send the update to the backend API
      await axios.put(`/api/herbs/${formData.batchId}/update`, {
        stakeholder: formData.stakeholder,
        status: formData.status,
        location: formData.location,
        notes: formData.notes,
        timestamp: formData.timestamp
      });
      
      toast.success("Supply chain updated successfully!", {
        description: `Status for ${formData.batchId} set to ${formData.status}`
      });
      
      // Reset form
      setFormData({
        batchId: "", stakeholder: "", status: "",
        location: "", notes: "", timestamp: ""
      });

    } catch (error: any) {
      toast.error("Failed to update supply chain.", {
        description: error.response?.data?.error || "Please check the console.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Supply Chain Update
        </CardTitle>
        <CardDescription>
          Track and update herb batch status throughout the supply chain.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batchId">Batch ID</Label>
              <Input
                id="batchId"
                placeholder="e.g., BATCH-XXXXXX"
                value={formData.batchId}
                onChange={(e) => handleInputChange("batchId", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stakeholder">Stakeholder</Label>
              <Select onValueChange={(value) => handleInputChange("stakeholder", value)} value={formData.stakeholder}>
                <SelectTrigger><SelectValue placeholder="Select stakeholder" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processor">Processor</SelectItem>
                  <SelectItem value="Distributor">Distributor</SelectItem>
                  <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="Retailer">Retailer</SelectItem>
                  <SelectItem value="Laboratory">Laboratory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">New Status</Label>
              <Select onValueChange={(value) => handleInputChange("status", value)} value={formData.status}>
                <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Quality-Tested">Quality Tested</SelectItem>
                  <SelectItem value="Packaged">Packaged</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="In-Store">In-Store</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input
                id="location"
                placeholder="Enter current location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timestamp">Timestamp</Label>
            <Input
              id="timestamp"
              type="datetime-local"
              value={formData.timestamp}
              onChange={(e) => handleInputChange("timestamp", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or observations..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={2}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Record Update"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupplyChainUpdate;