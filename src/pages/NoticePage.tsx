import { GrAnnounce } from 'react-icons/gr';

export default function NoticePage() {
  return (
    <div className="p-5">
      <div className="flex items-center space-x-2 mb-4">
        <GrAnnounce className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">공지사항</h2>
      </div>
    </div>
  );
}
