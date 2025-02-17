import { EducationListItemTypes } from "./EducationListItem.types.ts";
import EducationIcon from "../icons/EducationIcon.tsx";

export const EducationListItem = ({
  title,
  date,
  school,
  mention,
}: EducationListItemTypes) => (
  <div className="flex items-center gap-5 bg-white px-4 min-h-[72px] py-3">
    <EducationIcon />
    <div className="flex flex-col justify-center">
      <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
        {title}
      </p>
      <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
        {date}
      </p>
      <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
        {school}
      </p>
      {mention && (
        <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
          Mention: {mention}
        </p>
      )}
    </div>
  </div>
);

export default EducationListItem;
