'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FilterType = {
  noAccout: boolean;
  ticketNotCompleted: boolean;
  TicketNotAssigned: boolean;
  OrderUnpaid: boolean;
  delivery: string[];
  ticketType: string[];
  selectedDelivery: string;
  selectedTicketType: string;
};

type MailerSendTemplateType = {
  id: string;
  image_path: string;
  name: string;
  type: string;
  variables: object;
};

export default function IndexPage() {
  const [selectedTicket, setSelectedTicket] = useState('Ticket');
  const [templates, setTemplates] = useState<MailerSendTemplateType[]>([]);
  const [filterOptions, setFilterOptions] = useState<Partial<FilterType>>({
    noAccout: true,
    ticketNotCompleted: false,
    TicketNotAssigned: false,
    OrderUnpaid: false,
    selectedDelivery: '',
    selectedTicketType: '',
    delivery: ['In-Person', 'Online'],
    ticketType: [
      'Talks',
      'Talks + Workshops',
      'Workshops',
      'Executive + Talks + Workshops'
    ]
  });

  const router = useRouter();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    mode: string
  ) => {
    const value = event.target.value;
    switch (mode) {
      case 'Type':
        if (value === 'Ticket') {
          setFilterOptions((prev) => ({
            ...prev,
            delivery: ['In-Person', 'Online'],
            ticketType: [
              'Talks',
              'Talks + Workshops',
              'Workshops',
              'Executive + Talks + Workshops'
            ]
          }));
        }
        if (value === 'Order') {
          setFilterOptions((prev) => ({
            ...prev,
            TicketNotAssigned: true,
            OrderUnpaid: true
          }));
        }
        setSelectedTicket(event.target.value);
        break;

      case 'Delivery':
        setFilterOptions((prev) => ({ ...prev, selectedDelivery: value }));
        break;
      case 'Ticket Type':
        setFilterOptions((prev) => ({ ...prev, selectedTicketType: value }));
        break;
    }
  };

  const checkboxes = () => {
    if (selectedTicket === 'Ticket') {
      return (
        <>
          <div className="my-2">
            <div className="flex items-center">
              <input
                name="no-account"
                type="checkbox"
                checked={filterOptions.noAccout}
                onChange={(e) => handleCheckboxes(e, 'No Account')}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="no-account"
                className="ml-2 block text-sm text-gray-900"
              >
                No Account
              </label>
            </div>
            <div className="text-slate-400 text-sm">
              Get notified when someone posts a comment on posting
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-center">
              <input
                id="ticket-not-completed"
                name="ticket-not-completed"
                type="checkbox"
                checked={filterOptions.ticketNotCompleted}
                onChange={(e) => handleCheckboxes(e, 'Ticket Not Completed')}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="ticket-not-completed"
                className="ml-2 block text-sm text-gray-900"
              >
                Ticket Not Completed
              </label>
            </div>
            <div className="text-slate-400 text-sm">
              Get notified when candidate applies for job
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="my-2">
            <div className="flex items-center">
              <input
                name="ticket-not-assigned"
                id="ticket-not-assigned"
                type="checkbox"
                checked={filterOptions.TicketNotAssigned}
                onChange={(e) => handleCheckboxes(e, 'Ticket Not Assigned')}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="ticket-not-assigned"
                className="ml-2 block text-sm text-gray-900"
              >
                Ticket Not Assigned
              </label>
            </div>
            <div className="text-slate-400 text-sm">
              Get notified when someone posts a comment on posting
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-center">
              <input
                id="order-unpaid"
                name="order-unpaid"
                type="checkbox"
                checked={filterOptions.OrderUnpaid}
                onChange={(e) => handleCheckboxes(e, 'Order Unpaid')}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="order-unpaid"
                className="ml-2 block text-sm text-gray-900"
              >
                Order Unpaid
              </label>
            </div>
            <div className="text-slate-400 text-sm">
              Get notified when candidate applies for job
            </div>
          </div>
        </>
      );
    }
  };

  const handleCheckboxes = (
    event: React.ChangeEvent<HTMLInputElement>,
    mode: string
  ) => {
    const checked = event.target.checked;
    let type = '';
    switch (mode) {
      case 'Order Unpaid':
        type = 'OrderUnpaid';
        break;
      case 'Ticket Not Assigned':
        type = 'TicketNotAssigned';
        break;
      case 'Ticket Not Completed':
        type = 'ticketNotCompleted';
        break;
      case 'No Account':
        type = 'noAccout';
        break;
    }
    console.log('value', type, mode, checked);
    setFilterOptions((prev) => ({ ...prev, [type]: checked }));
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/mailersend/getTemplates');
      const data: MailerSendTemplateType[] = await response.json();
      setTemplates(data);
    } catch (error) {
      console.log('Error fetching templates', error.message);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <main className="flex flex-col p-4 md:p-6 justify-center items-center">
      <section className="flex flex-col w-75">
        <div className="flex items-center mb-8">
          <h1 className="font-semibold text-lg md:text-2xl">Add Campaign</h1>
        </div>
        <form className="space-y-6">
          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-700 basis-2/4">
              Campaign Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 basis-2/4 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-700 basis-2/4">
              Type
            </label>
            <select
              value={selectedTicket}
              onChange={(e) => handleChange(e, 'Type')}
              className="mt-1 block w-full px-3 py-2 basis-2/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Ticket">Ticket</option>
              <option value="Order">Order</option>
            </select>
          </div>
          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-700 basis-2/4">
              Filters
            </label>
            <div className="space-y-2 basis-2/4">
              {checkboxes()}
              {selectedTicket == 'Ticket' && (
                <>
                  <div className="my-3">
                    <select
                      value={filterOptions.selectedDelivery}
                      onChange={(e) => handleChange(e, 'Delivery')}
                      className="mt-1 block w-full px-3 basis-2/4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Delivery</option>
                      {filterOptions.delivery?.map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-3">
                    <select
                      value={filterOptions.selectedTicketType}
                      onChange={(e) => handleChange(e, 'Ticket Type')}
                      className="mt-1 block w-full px-3 py-2 basis-2/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Ticket Type</option>
                      {filterOptions.ticketType?.map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-700 basis-2/4">
              Mailersend template
            </label>
            <select className="mt-1 block w-full px-3 py-2 basis-2/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Ticket</option>
              {templates.length > 0 &&
                templates.map(({ name }, index) => {
                  return (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-row">
            <label className="block text-sm font-medium text-gray-700 basis-2/4">
              Total count of recipients
            </label>
            <div>200</div>
          </div>
          <hr />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Schedule
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
