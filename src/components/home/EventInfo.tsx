import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';

export type EventInfoItem = {
  title: string;
  date: string;
  location: string;
  time: string;
  description: string;
};

type EventInfoProps = {
  items: EventInfoItem[];
};

export default function EventInfo({ items }: EventInfoProps) {
  return (
    <section id="events" className="scroll-mt-[80px] py-6">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 rounded-full bg-knu-red" />
        <h3 className="typo-heading-2 text-knu-gray">행사 안내</h3>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.title}-${item.date}`}
            className="rounded-3xl border border-knu-red/15 bg-knu-red/5 p-5"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-knu-red text-white">
                <FiCalendar className="h-5 w-5" />
              </span>
              <div>
                <h4 className="typo-heading-3 text-knu-gray">{item.title}</h4>
                <p className="typo-body-2 mt-1 text-text-muted">{item.date}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-knu-gray">
                <FiMapPin className="h-4 w-4 text-knu-red" />
                <span>{item.location}</span>
              </li>
              <li className="flex items-center gap-2 text-knu-gray">
                <FiClock className="h-4 w-4 text-knu-red" />
                <span>{item.time}</span>
              </li>
              <li className="flex items-center gap-2 text-knu-gray">
                <FiUsers className="h-4 w-4 text-knu-red" />
                <span>{item.description}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
