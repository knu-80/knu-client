import { useState } from 'react';
import { MdEventNote } from 'react-icons/md';
import EventCard from '@/components/EventCard';
import SegmentedControl from '@/components/SegmentedControl';
import { ALL_EVENTS, type EventType } from '@/mocks/events';

export default function EventPage() {
  const [selectedType, setSelectedType] = useState<EventType>('RECRUITMENT');

  const filteredEvents = ALL_EVENTS.filter((event) => event.type === selectedType);

  return (
    <div className="pt-5 sm:p-5">
      <div className="flex items-center space-x-2 mb-4">
        <MdEventNote className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">이벤트</h2>
      </div>

      <div className="mb-6">
        <SegmentedControl
          options={[
            { label: '가두모집 이벤트', value: 'RECRUITMENT' },
            { label: '주막이벤트', value: 'PUB' },
          ]}
          selectedValue={selectedType}
          onChange={(val) => setSelectedType(val as EventType)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
