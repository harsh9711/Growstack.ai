const KeyPoints = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 p-4 sm:p-8">
      {[
        "Spot Social Trends and Generate Content Instantly",
        "Launch Campaigns in just a few Clicks Create, Publish, Manage",
        "AI Agents for Smart Lead Gen and Engagement",
        "Streamline Sales and Marketing with AI Automation",
      ].map((point, index) => (
        <div key={index} className="flex flex-row items-start space-x-2">
          <span className="w-3 h-3 mt-1 bg-green-500 rounded-full" />
          <h2 className="text-sm sm:text-md md:text-lg font-semibold text-black">
            {point}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default KeyPoints;
