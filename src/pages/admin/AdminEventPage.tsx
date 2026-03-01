import { useState } from 'react';
import { MdEventNote } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import EventCard from '@/components/EventCard';
import EventCardEdit from '@/components/EventCardEdit';
import SegmentedControl from '@/components/SegmentedControl';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import { ALL_EVENTS, type EventType, type FestivalEvent } from '@/mocks/events';

export default function AdminEventPage() {
  const [events, setEvents] = useState<FestivalEvent[]>(ALL_EVENTS);
  const [selectedType, setSelectedType] = useState<EventType>('RECRUITMENT');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const filteredEvents = events.filter((event) => event.type === selectedType);

  const handleAddEvent = () => {
    setIsAdding(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = (data: FestivalEvent) => {
    if (isAdding) {
      const nextId = Math.max(...events.map((event) => event.id), 0) + 1;

      const newEvent: FestivalEvent = {
        ...data,
        id: nextId,
        type: selectedType,
      };
      setEvents((prev) => [...prev, newEvent]);
      setIsAdding(false);
      showAlert('성공', '새로운 이벤트가 등록되었습니다.');
    } else {
      setEvents((prev) =>
        prev.map((event) => (event.id === data.id ? { ...event, ...data } : event)),
      );
      setEditingId(null);
      showAlert('성공', `"${data.title}" 이벤트가 수정되었습니다.`);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    showAlert('삭제 완료', '해당 이벤트가 삭제되었습니다.');
  };

  const showAlert = (title: string, message: string) => {
    setAlertConfig({ isOpen: true, title, message });
  };

  return (
    <div className="pt-5 sm:p-5 relative pb-24">
      <div className="flex items-center space-x-2 mb-4 px-2 sm:px-0">
        <MdEventNote className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black font-bold">이벤트 관리</h2>
      </div>

      <div className="mb-6 px-2 sm:px-0">
        <SegmentedControl
          options={[
            { label: '가두모집 이벤트', value: 'RECRUITMENT' },
            { label: '주막이벤트', value: 'PUB' },
          ]}
          selectedValue={selectedType}
          onChange={setSelectedType}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-2 sm:px-0">
        {filteredEvents.map((event) =>
          editingId === event.id ? (
            <EventCardEdit
              key={event.id}
              initialData={event}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              startDate={event.startDate}
              endDate={event.endDate}
              location={event.location}
              imageUrl={event.imageUrl}
              isAdmin={true}
              onEdit={() => setEditingId(event.id)}
              onDelete={() => handleDelete(event.id)}
            />
          ),
        )}

        {isAdding && (
          <EventCardEdit
            initialData={{
              id: 0,
              type: selectedType,
              title: '',
              description: '',
              startDate: '',
              endDate: '',
              location: '',
              imageUrl: null,
            }}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        {filteredEvents.length === 0 && !isAdding && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <MdEventNote className="h-12 w-12 mb-4 opacity-20" />
            <p className="typo-body-1">진행 중인 이벤트가 없습니다.</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label="이벤트 추가하기"
          icon={SlPencil}
          onClick={handleAddEvent}
          className="bg-[#0F172A]"
        />
      </div>

      <AlertModal
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
