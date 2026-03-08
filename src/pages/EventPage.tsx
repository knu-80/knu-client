import { MdEventNote } from 'react-icons/md';
import EventCard from '@/components/EventCard';
import { ALL_EVENTS } from '@/mocks/events';

export default function EventPage() {
  return (
    <div className="pt-5 sm:p-5">
      <div className="flex items-center space-x-2 mb-4">
        <MdEventNote className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">이벤트</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ALL_EVENTS.length > 0 ? (
          ALL_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              startAt={event.startAt}
              endAt={event.endAt}
              location={event.location}
              imageUrl={event.imageUrl}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <MdEventNote className="h-12 w-12 mb-4 opacity-20" />
            <p className="typo-body-1">진행 중인 이벤트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
