import EventCard from '@/components/EventCard';
import { useEvents } from '@/hooks/useEvents';
import EventSvg from '@/assets/event.svg';
import { StatusDisplay } from '@/components/StatusDisplay';
import { PiSpinnerGapThin } from 'react-icons/pi';

export default function EventPage() {
  const { events, isLoading, error, refetch } = useEvents('RECRUITMENT');

  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime(),
  );

  return (
    <div className="flex flex-col flex-1 pt-5 sm:p-5">
      <div className="flex items-center h-14">
        {' '}
        <img
          src={EventSvg}
          alt="이벤트"
          draggable={false}
          className="ml-1 mt-1 w-18 h-16 pointer-events-none select-none"
        />
        <span className="ml-2 mt-2 typo-heading-3 font-semibold text-base-deep">
          이벤트에 참여해보세요
        </span>
      </div>

      {isLoading ? (
        <div className="mt-[-20px] flex items-center justify-center rounded-2xl w-full min-h-80 border border-white bg-white">
          <PiSpinnerGapThin className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center rounded-2xl w-full min-h-80 border border-gray-200 bg-white">
          <StatusDisplay variant="error" title="인터넷 연결을 확인해주세요" onAction={refetch} />
        </div>
      ) : sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              startAt={event.startAt}
              endAt={event.endAt}
              location={event.location}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-2xl shadow-sm w-full min-h-45 border border-gray-200 bg-white ">
          <StatusDisplay variant="event" title="아직 예정된 이벤트가 없어요" />
        </div>
      )}
    </div>
  );
}
