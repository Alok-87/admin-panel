import { FiChevronDown } from "react-icons/fi";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export const CollapsibleSection = ({
  title,
  children,
}: CollapsibleSectionProps) => {
  return (
    <div className="mb-6 border rounded-lg overflow-hidden hover:outline hover:outline-brand-500">
      <div className="w-full flex justify-between items-center p-4 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-4 bg-white">{children}</div>
    </div>
  );
};
