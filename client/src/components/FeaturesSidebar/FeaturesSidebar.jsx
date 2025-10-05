import { Package } from "lucide-react";
import FeatureItem from "../FeatureItem/FeatureItem";

const FeaturesSidebar = () => {
  const features = [
    { icon: MessageSquare, title: "Natural Language", description: "Convert plain English to SQL queries instantly" },
    { icon: Shield, title: "Query Validation", description: "Sandbox and validate for safe execution" },
    { icon: Activity, title: "Intent Extraction", description: "Smart parameterization and accuracy" },
    { icon: FileText, title: "Result Formatting", description: "Tables, JSON, and human-friendly summaries" },
    { icon: Clock, title: "Multi-Database", description: "Postgres, MySQL, SQLite support" }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
      <h2 className="text-xl mb-6 flex items-center gap-2">
        <Package className="w-5 h-5" />
        Key Features
      </h2>
      {features.map((feature, idx) => (
        <FeatureItem key={idx} {...feature} />
      ))}
    </div>
  );
};

export default FeaturesSidebar;