import CopyIcon from '../../svg-icon/copy-icon';

interface IProfileHeader {
  personID: string | number;
  imageURL: string;
}

const ProfileHeader = ({ personID, imageURL }: IProfileHeader) => {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${imageURL})`,
        }}
        className="w-[clamp(2rem,4.15vw,5rem)] h-[clamp(2rem,4.15vw,5rem)] rounded-full bg-cover bg-center bg-no-repeat  qhd:w-32 qhd:h-32"
      ></div>
      <div className="flex flex-col items-center mt-xs">
        <h2 className="font-bold uppercase text-baseText qhd:text-xlText">четкий залупик</h2>
        <span className="text-accentProfile qhd:text-xlText">premium collector</span>
      </div>
      <div className="flex flex-row items-center justify-between rounded-full px-xs border mt-[clamp(0.2rem,0.417vw,0.5rem)] border-gray-800 2xl:w-full">
        <span>ID : {personID}</span>
        <button className="appearance-none shadow-none bg-transparent border-none p-0 m-0 w-fit h-fit group hover:bg-transparent">
          <CopyIcon className="w-full transition-all duration-300 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
