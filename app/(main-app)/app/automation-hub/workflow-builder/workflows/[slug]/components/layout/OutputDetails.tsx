import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

// Dummy data with markdown content
const data = [
  {
    id: 1,
    title: "The Importance of Mindfulness in Everyday Life",
    content: `
# The Importance of Mindfulness in Everyday Life

In today's fast-paced world, where we are constantly bombarded with information and distractions, practicing mindfulness has become more important than ever. Mindfulness is the practice of being present and fully engaged in the moment without judgment. It allows us to slow down, reflect, and connect with ourselves and our surroundings on a deeper level.

## What is Mindfulness?
Mindfulness originates from ancient meditation practices and has been embraced in various cultures for centuries. At its core, mindfulness involves paying attention to our thoughts, feelings, bodily sensations, and the environment around us. It encourages a non-reactive approach to our experiences, helping us to observe rather than immediately react.
    `,
  },
  {
    id: 2,
    title: "Benefits of Mindfulness",
    content: `
## Benefits of Mindfulness
1. **Reduces Stress**: One of the most significant benefits of mindfulness is its ability to reduce stress. By focusing on the present moment, we can alleviate anxiety about the future and regrets about the past.
2. **Improves Mental Health**: Regular mindfulness practice can lead to improvements in mental health conditions such as depression and anxiety. It promotes a more positive outlook on life and enhances emotional regulation.
3. **Enhances Focus**: Mindfulness training can improve our attention span and concentration. It helps us to stay focused on tasks at hand, reducing distractions.
4. **Boosts Creativity**: Being present allows for greater creativity as it opens our minds to new possibilities and ideas without the constraints of judgment.
5. **Promotes Better Relationships**: Practicing mindfulness can improve communication skills and empathy, leading to healthier relationships with others.
    `,
  },
  {
    id: 3,
    title: "How to Incorporate Mindfulness into Your Daily Life",
    content: `
## How to Incorporate Mindfulness into Your Daily Life
1. **Start with Breathing Exercises**: Take a few moments each day to focus solely on your breath. Inhale deeply through your nose, hold for a moment, and exhale slowly through your mouth.
2. **Practice Gratitude**: Take time each day to reflect on what you are grateful for. This practice shifts your focus from negativity to appreciation.
3. **Mindful Eating**: Pay attention to the flavors, textures, and colors of your food while eating. Chew slowly and savor each bite rather than rushing through meals.
4. **Limit Multitasking**: Focus on one task at a time instead of juggling multiple activities. This practice enhances concentration and productivity.
5. **Engage in Nature**: Spend time outdoors and take in the sights, sounds, and smells of nature. This connection can enhance your sense of peace and mindfulness.
    `,
  },
];

const OutputDetails = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Output Details</h2>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`border rounded-lg ${
              openIndex === index ? "border-blue-400" : "border-gray-200"
            }`}
          >
            {/* Accordion Header */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="text-sm font-medium">{item.title}</h3>
              {openIndex === index ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronUp size={18} />
              )}
            </div>

            {/* Accordion Content */}
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200">
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutputDetails;
