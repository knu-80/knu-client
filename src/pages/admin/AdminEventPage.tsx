import { useState } from 'react';
import { MdEventNote } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import EventCard, { type EventCardProps } from '@/components/EventCard';
import EventCardEdit from '@/components/EventCardEdit';
import SegmentedControl from '@/components/SegmentedControl';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import { ALL_EVENTS, type EventType } from '@/mocks/events';

interface EventData extends EventCardProps {
  id: number;
}

export default function AdminEventPage() {
  const [selectedType, setSelectedType] = useState<EventType>('RECRUITMENT');
  const [editingId, setEditingId] = useState<number | null>(null);

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const filteredEvents = ALL_EVENTS.filter((event) => event.type === selectedType);

  const handleAddEvent = () => {
    setAlertConfig({
      isOpen: true,
      title: '알림',
      message: '이벤트 추가 기능 구현 예정입니다!',
    });
  };

  const handleSave = (data: EventData) => {
    setEditingId(null);
    setAlertConfig({
      isOpen: true,
      title: '성공',
      message: `"${data.title}" 이벤트가 수정되었습니다.`,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setAlertConfig({
      isOpen: true,
      title: '삭제',
      message: `ID: ${id} 이벤트를 삭제하시겠습니까?`,
    });
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
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) =>
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
          )
        ) : (
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
