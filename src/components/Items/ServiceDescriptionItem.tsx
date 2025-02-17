export const ServiceDescriptionItem = ({
  description,
}: {
  description: string;
}) => {
  return (
    <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111418]">
      <div
        className="text-[#111418]"
        data-icon="Check"
        data-size="20px"
        data-weight="regular"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </div>
      {description}
    </div>
  );
};

export default ServiceDescriptionItem;
