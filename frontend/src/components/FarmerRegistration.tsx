import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Leaf, Package, Download } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";

const FarmerRegistration = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    location: "",
    herbType: "", // Matched to backend
    quantity: "",
    gpsCoordinates: "", // Matched to backend
    harvestDate: "",
    farmingMethod: "",
    soil_ph: "6.5",
    rainfall_mm: "500",
    sunlight_hours: "8",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [batchId, setBatchId] = useState<string | null>(null);
  const [qualityScore, setQualityScore] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- ✅ THIS IS THE UPGRADED, FUNCTIONAL SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBatchId(null);
    setQrCodeUrl(null);
    setQualityScore(null);
    
    try {
      // 1. Send all form data to the backend API
      const response = await axios.post("/api/herbs", {
        ...formData,
        quantity: parseInt(formData.quantity),
        soil_ph: parseFloat(formData.soil_ph),
        rainfall_mm: parseInt(formData.rainfall_mm),
        sunlight_hours: parseFloat(formData.sunlight_hours),
      });
      
      const { batchId: newBatchId, qualityScore: newQualityScore } = response.data;

      // 2. Set the REAL batchId and qualityScore from the API response
      setBatchId(newBatchId);
      setQualityScore(newQualityScore);
      
      // 3. Generate QR Code with the REAL data
      const qrData = JSON.stringify({
        batchId: newBatchId,
        herb: formData.herbType,
        farmer: formData.farmerName,
      });
      
      const qrDataUrl = await QRCode.toDataURL(qrData, { width: 256, margin: 2 });
      setQrCodeUrl(qrDataUrl);
      
      toast.success("Batch created successfully!", {
        description: `Batch ID: ${newBatchId} | AI Quality Score: ${newQualityScore}/10`
      });
      
      // 4. Reset form
      setFormData({
        farmerName: "", location: "", herbType: "", quantity: "",
        gpsCoordinates: "", harvestDate: "", farmingMethod: "",
        soil_ph: "6.5", rainfall_mm: "500", sunlight_hours: "8",
      });

    } catch (error: any) {
      toast.error("Failed to create batch.", {
        description: error.response?.data?.error || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        handleInputChange("gpsCoordinates", coordinates);
        toast.success("Location captured successfully!");
        setIsGettingLocation(false);
      },
      (error) => {
        toast.error("Unable to retrieve your location. Please enter manually.");
        setIsGettingLocation(false);
      }
    );
  };

  const downloadQRCode = () => {
    if (qrCodeUrl && batchId) {
      const link = document.createElement('a');
      link.download = `batch-${batchId}-qr.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <Card className="bg-gradient-card shadow-medium animate-fade-in">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <User className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Farmer Registration</CardTitle>
        </div>
        <CardDescription>
          Register new herb batch with blockchain verification
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="farmerName">Farmer Name</Label>
              <Input id="farmerName" placeholder="Enter farmer name" value={formData.farmerName} onChange={(e) => handleInputChange("farmerName", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Farm location" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="herbType">Herb Type</Label>
              <Select onValueChange={(value) => handleInputChange("herbType", value)} value={formData.herbType}>
                <SelectTrigger><SelectValue placeholder="Select herb type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ashwagandha">Ashwagandha</SelectItem>
                  <SelectItem value="Turmeric">Turmeric</SelectItem>
                  <SelectItem value="Neem">Neem</SelectItem>
                  <SelectItem value="Tulsi">Tulsi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input id="quantity" type="number" placeholder="0" value={formData.quantity} onChange={(e) => handleInputChange("quantity", e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gpsCoordinates">GPS Coordinates</Label>
              <div className="flex gap-2">
                <Input id="gpsCoordinates" placeholder="lat, long" value={formData.gpsCoordinates} onChange={(e) => handleInputChange("gpsCoordinates", e.target.value)} required />
                <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation} disabled={isGettingLocation} className="shrink-0">
                  <MapPin className="h-4 w-4 mr-1" />
                  {isGettingLocation ? "Getting..." : "GPS"}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="harvestDate">Harvest Date</Label>
              <Input id="harvestDate" type="date" value={formData.harvestDate} onChange={(e) => handleInputChange("harvestDate", e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="farmingMethod">Farming Method</Label>
            <Select onValueChange={(value) => handleInputChange("farmingMethod", value)} value={formData.farmingMethod}>
              <SelectTrigger><SelectValue placeholder="Select farming method" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Organic">Organic</SelectItem>
                <SelectItem value="Conventional">Conventional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Leaf className="h-4 w-4 text-primary" />
              AI Quality Assessment Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="soil_ph">Soil pH Level</Label>
                <Input id="soil_ph" type="number" step="0.1" placeholder="6.5" value={formData.soil_ph} onChange={(e) => handleInputChange("soil_ph", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rainfall_mm">Rainfall (mm)</Label>
                <Input id="rainfall_mm" type="number" placeholder="500" value={formData.rainfall_mm} onChange={(e) => handleInputChange("rainfall_mm", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sunlight_hours">Sunlight Hours/Day</Label>
                <Input id="sunlight_hours" type="number" step="0.5" placeholder="8" value={formData.sunlight_hours} onChange={(e) => handleInputChange("sunlight_hours", e.target.value)} required />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Creating Batch..." : (<><Package className="h-4 w-4 mr-2" /> Create Batch</>)}
          </Button>
        </form>

        {batchId && (
          <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-success">Batch Created Successfully!</h3>
                <p className="text-sm text-muted-foreground">Batch ID: {batchId}</p>
                {qualityScore && (
                  <p className="text-sm font-medium text-success">
                    AI Quality Score: {qualityScore}/10
                  </p>
                )}
              </div>
            </div>
            
            {qrCodeUrl && (
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="bg-white p-2 rounded-lg">
                  <img src={qrCodeUrl} alt="Batch QR Code" className="w-32 h-32" />
                </div>
                <div className="flex-1 space-y-2">
                  <Badge variant="outline" className="border-success text-success">
                    QR Code Generated
                  </Badge>
                  <Button onClick={downloadQRCode} variant="outline" size="sm" className="w-full md:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FarmerRegistration;