interface ContentCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ContentCard({
  icon,
  title,
  description,
}: ContentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 border border-gray-100 active:shadow-md touch-manipulation transform hover:scale-105 active:scale-[0.98] cursor-pointer min-h-[280px]">
      <div className="text-center">
        <div className="text-6xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-green mb-4 font-pretendard">
          {title}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed font-pretendard">
          {description}
        </p>
      </div>
    </div>
  );
}
