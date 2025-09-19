import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, TrendingUp, Users, Leaf } from "lucide-react";
import Header from "@/components/Header";
import FarmerRegistration from "@/components/FarmerRegistration";
import SupplyChainUpdate from "@/components/SupplyChainUpdate";
import ConsumerVerification from "@/components/ConsumerVerification";
import StatsCard from "@/components/StatsCard";

const Index = () => {
  const [stats, setStats] = useState({
    totalBatches: "0",
    activeFarmers: "0",
    herbVarieties: "0",
    verificationRate: "0.0%"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Blockchain-Powered Herb Traceability
          </h1>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            From farm to formulation, track every step of your Ayurvedic herbs' journey with 
            transparent, verified blockchain technology.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Batches"
            value={stats.totalBatches}
            description="Verified herb batches"
            icon={Package}
            trend={{ value: "+12%", isPositive: true }}
          />
          <StatsCard
            title="Active Farmers"
            value={stats.activeFarmers}
            description="Registered farmers"
            icon={Users}
            trend={{ value: "+8%", isPositive: true }}
          />
          <StatsCard
            title="Herb Varieties"
            value={stats.herbVarieties}
            description="Different Ayurvedic herbs"
            icon={Leaf}
          />
          <StatsCard
            title="Verification Rate"
            value={stats.verificationRate}
            description="Successful verifications"
            icon={TrendingUp}
            trend={{ value: "+0.2%", isPositive: true }}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="farmer" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="farmer" className="text-sm">
              Farmer Registration
            </TabsTrigger>
            <TabsTrigger value="supply-chain" className="text-sm">
              Supply Chain Update
            </TabsTrigger>
            <TabsTrigger value="consumer" className="text-sm">
              Consumer Verification
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer" className="space-y-6">
            <FarmerRegistration />
          </TabsContent>
          
          <TabsContent value="supply-chain" className="space-y-6">
            <SupplyChainUpdate />
          </TabsContent>
          
          <TabsContent value="consumer" className="space-y-6">
            <ConsumerVerification />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AyuLink. Powered by blockchain technology for authentic Ayurvedic herbs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;