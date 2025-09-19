import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Factory, Users, MapPin, Calendar, Leaf } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  status: "completed" | "in-progress" | "pending";
  icon: React.ComponentType<any>;
  details?: string[];
}

interface TraceabilityTimelineProps {
  batchId: string;
  events?: TimelineEvent[];
}

const TraceabilityTimeline = ({ batchId, events }: TraceabilityTimelineProps) => {
  const defaultEvents: TimelineEvent[] = [
    {
      id: "1",
      title: "Herb Harvesting",
      description: "Organic Ashwagandha harvested from certified farm",
      timestamp: "2024-03-15 06:30 AM",
      location: "Rajasthan, India (26.9124, 75.7873)",
      status: "completed",
      icon: Leaf,
      details: [
        "Farmer: Ramesh Kumar",
        "Quality Score: 9.2/10",
        "Soil pH: 6.8",
        "Rainfall: 450mm",
        "Sunlight: 8.5 hrs/day"
      ]
    },
    {
      id: "2",
      title: "Processing & Packaging",
      description: "Cleaned, dried, and packaged at certified facility",
      timestamp: "2024-03-16 02:00 PM",
      location: "Jaipur Processing Unit",
      status: "completed",
      icon: Factory,
      details: [
        "Temperature: 45°C",
        "Moisture: 8%",
        "Batch Weight: 250kg",
        "Packaging: Food-grade containers"
      ]
    },
    {
      id: "3",
      title: "Quality Testing",
      description: "Laboratory testing for purity and potency",
      timestamp: "2024-03-17 11:00 AM",
      location: "NABL Certified Lab",
      status: "completed",
      icon: CheckCircle,
      details: [
        "Heavy metals: Pass",
        "Pesticide residue: Nil",
        "Microbial count: Within limits",
        "Active compounds: 98.5%"
      ]
    },
    {
      id: "4",
      title: "Transportation",
      description: "Shipped to distribution center",
      timestamp: "2024-03-18 09:00 AM",
      location: "Delhi Distribution Hub",
      status: "in-progress",
      icon: Truck,
      details: [
        "Vehicle: Temperature controlled",
        "Driver: Verified & licensed",
        "Route: GPS tracked",
        "ETA: 2024-03-19 06:00 PM"
      ]
    },
    {
      id: "5",
      title: "Retail Distribution",
      description: "Available for consumer purchase",
      timestamp: "Expected: 2024-03-20",
      location: "Authorized retailers",
      status: "pending",
      icon: Users,
      details: []
    }
  ];

  const timelineEvents = events || defaultEvents;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⏳";
      case "pending":
        return "⏸";
      default:
        return "○";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-medium">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <CardTitle>Complete Traceability Timeline</CardTitle>
        </div>
        <CardDescription>
          Batch ID: {batchId} - Full journey from farm to formulation
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="relative flex gap-4">
                  {/* Timeline Node */}
                  <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                    event.status === "completed" ? "border-success bg-success/10" :
                    event.status === "in-progress" ? "border-warning bg-warning/10" :
                    "border-muted bg-muted/10"
                  }`}>
                    <IconComponent className={`h-5 w-5 ${
                      event.status === "completed" ? "text-success" :
                      event.status === "in-progress" ? "text-warning" :
                      "text-muted-foreground"
                    }`} />
                  </div>
                  
                  {/* Event Content */}
                  <div className="flex-1 pb-6">
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {getStatusIcon(event.status)} {event.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                      
                      {event.details && event.details.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {event.details.map((detail, idx) => (
                            <div key={idx} className="text-xs bg-muted/30 rounded px-2 py-1">
                              {detail}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TraceabilityTimeline;