import FeaturesSidebar from "../components/FeaturesSidebar/FeaturesSidebar";
import Header from "../components/Header/Header";
import QueryInterface from "../components/QueryInterface/QueryInterface";

const Dashboard = () => {
  return (
    <div className="container max-w-[1400px] mx-auto px-5">
      <Header/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FeaturesSidebar />
        <div className="lg:col-span-2">
          <QueryInterface />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;