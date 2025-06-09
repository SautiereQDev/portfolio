export const TagItem = ({ text }: { text: string }) => {
  return (
    <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#f0f2f4] pr-4 pl-4">
      <p className="text-sm leading-normal font-medium text-[#111418]">
        {text}
      </p>
    </div>
  );
};

export default TagItem;
