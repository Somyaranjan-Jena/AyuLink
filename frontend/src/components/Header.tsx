import { Leaf, Shield, Link2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-primary shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-gold rounded-lg p-2">
              <Leaf className="h-6 w-6 text-primary-gold-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">AyuLink</h1>
              <p className="text-xs text-primary-foreground/80">Blockchain Herb Traceability</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              <span className="text-sm font-medium">Blockchain Powered</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;