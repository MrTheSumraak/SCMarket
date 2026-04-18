import CopyIcon from '../../svg-icon/copy-icon';

interface IProfileHeader {
  personID: string | number;
}

const ProfileHeader = ({ personID }: IProfileHeader) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-[url('https://avatars.mds.yandex.net/i?id=55486af37a7a88634d4f407c0d6bfd4ffa825219-5278644-images-thumbs&n=13')] bg-cover bg-center bg-no-repeat  qhd:w-32 qhd:h-32"></div>
      <div className="flex flex-col items-center mt-3">
        <h2 className="font-bold qhd:text-2xl">четкий залупик</h2>
        <span className="text-accentProfile qhd:text-2xl">premium collector</span>
      </div>
      <div className="flex flex-row items-center justify-between rounded-full px-3 border mt-2 border-gray-800 2xl:w-full">
        <span>ID : {personID}</span>
        <button className="appearance-none shadow-none bg-transparent border-none p-0 m-0 w-fit h-fit group hover:bg-transparent">
          <CopyIcon className="w-full transition-all duration-300 group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
