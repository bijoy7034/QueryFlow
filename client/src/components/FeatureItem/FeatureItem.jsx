const FeatureItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex gap-4 mb-5 p-4 bg-white/5 rounded-lg hover:bg-white/10 hover:translate-x-1 transition-all">
      <div className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;