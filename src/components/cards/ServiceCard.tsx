import { ServiceCardProps } from "./ServiceCard.types";
import iconMapper from "../../utils/iconMapper";

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const Icon = icon ? iconMapper[icon as unknown as string] : null;

  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-[#dce0e5] bg-white p-4 flex-col">
      {Icon && <Icon />}
      <div className="flex flex-col gap-1">
        <h2 className="text-[#111418] text-base font-bold leading-tight">
          {title}
        </h2>
        <p className="text-[#637588] text-sm font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
