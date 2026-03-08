import { useState } from 'react';
import { MdEventNote } from 'react-icons/md';
import { SlPencil } from 'react-icons/sl';
import EventCard from '@/components/EventCard';
import EventCardEdit from '@/components/EventCardEdit';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import ConfirmModal from '@/components/ConfirmModal';
import { useEvents } from '@/hooks/useEvents';
import { useEventMutation } from '@/hooks/useEventMutation';
import { type EventItem } from '@/apis/modules/eventApi';
import { type EventType } from '@/apis/endpoints';

export default function AdminEventPage() {
  const selectedType: EventType = 'RECRUITMENT';
  const { events, isLoading, refetch } = useEvents(selectedType);
  const { mutateCreate, mutateUpdate, mutateUpdateImage, mutateDelete } = useEventMutation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [targetEventId, setTargetEventId] = useState<number | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const handleAddEvent = () => {
    setIsAdding(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleSave = async (data: EventItem) => {
    const formatAt = (at: string) => {
      if (!at) return '';
      const date = new Date(at);
      return date.toISOString();
    };

    if (isAdding) {
      const payload = {
        title: data.title,
        description: data.description,
        eventType: selectedType,
        startAt: formatAt(data.startAt),
        endAt: formatAt(data.endAt),
        location: data.location,
        isActive: true,
      };

      await mutateCreate(payload, data.image, {
        onSuccess: () => {
          showAlert('성공', '새로운 이벤트가 등록되었습니다.');
          refetch();
          setIsAdding(false);
        },
        onError: (err) => {
          showAlert('실패', `등록 중 오류가 발생했습니다: ${err.message}`);
        },
      });
    } else if (editingId !== null) {
      const original = events.find((e) => e.id === editingId);
      if (!original) return;

      const isTextChanged =
        original.title !== data.title ||
        original.description !== data.description ||
        original.location !== data.location ||
        original.startAt !== data.startAt ||
        original.endAt !== data.endAt ||
        original.isActive !== data.isActive;

      const isImageChanged = !!data.image;

      try {
        if (isImageChanged && data.image) {
          await mutateUpdateImage(editingId, data.image);
        }

        if (isTextChanged) {
          const payload = {
            title: data.title,
            description: data.description,
            eventType: selectedType,
            isActive: data.isActive,
            startAt: formatAt(data.startAt),
            endAt: formatAt(data.endAt),
            location: data.location,
          };
          await mutateUpdate(editingId, payload);
        }

        showAlert('성공', '이벤트 정보가 수정되었습니다.');
        setEditingId(null);
        refetch();
      } catch {
        showAlert('실패', '수정 중 오류가 발생했습니다.');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDeleteClick = (id: number) => {
    setTargetEventId(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (targetEventId !== null) {
      await mutateDelete(targetEventId, {
        onSuccess: () => {
          showAlert('삭제 완료', '이벤트가 성공적으로 삭제되었습니다.');
          refetch();
        },
        onError: (error) => {
          showAlert('삭제 실패', error.message);
        },
      });
      setIsConfirmModalOpen(false);
      setTargetEventId(null);
    }
  };

  const showAlert = (title: string, message: string) => {
    setAlertConfig({ isOpen: true, title, message });
  };

  return (
    <div className="pt-5 sm:p-5 relative pb-40">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 px-2 sm:px-0">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-gray-400 typo-body-2">
            데이터를 불러오는 중...
          </div>
        ) : events.length === 0 && !isAdding ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
            <MdEventNote className="h-12 w-12 mb-4 opacity-20" />
            <p className="typo-body-1">진행 중인 이벤트가 없습니다.</p>
          </div>
        ) : (
          events.map((event) =>
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
                startAt={event.startAt}
                endAt={event.endAt}
                location={event.location}
                imageUrl={event.imageUrl}
                isAdmin={true}
                onEdit={() => setEditingId(event.id)}
                onDelete={() => handleDeleteClick(event.id)}
              />
            ),
          )
        )}

        {isAdding && (
          <EventCardEdit
            initialData={{
              id: 0,
              title: '',
              description: '',
              eventType: selectedType,
              imageUrl: null,
              startAt: '',
              endAt: '',
              isActive: true,
              location: '',
            }}
            onSave={handleSave}
            onCancel={handleCancel}
          />
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="이벤트 삭제"
        message={`정말로 이 이벤트를 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.`}
        confirmText="삭제"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />

      <AlertModal
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
