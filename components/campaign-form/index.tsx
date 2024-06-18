'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase_client';
import { FilterType, propsType } from './types';

export default function CampForm({
  id,
  mode,
  templates,
  campaignAction,
  defaultValues = {}
}: propsType) {
  const [state, formAction] = useFormState(campaignAction, {
    mode: mode,
    message: '',
    error: false
  });
  const [totalCount, setTotalCounts] = useState(0);
  const [clickedBtn, setclickedBtn] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('Ticket');
  const [filterOptions, setFilterOptions] = useState<Partial<FilterType>>({
    noAccout: defaultValues.filter?.noAccount || true,
    ticketNotCompleted: defaultValues.filter?.ticketNotCompleted || false,
    TicketNotAssigned: defaultValues.filter?.ticketNotAssigned || false,
    OrderUnpaid: defaultValues.filter?.orderUnpaid || false,
    selectedDelivery: defaultValues.filter?.delivery || '',
    selectedTicketType: defaultValues.ticketType || '',
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

  useEffect(() => {
    const buildQuery = () => {
      const campaignsCollection = collection(db, 'campaigns');
      let q = query(campaignsCollection);

      if (filterOptions.noAccout) {
        q = query(q, where('filters.noAccount', '==', true));
      }
      if (filterOptions.ticketNotCompleted) {
        q = query(q, where('filters.ticketNotCompleted', '==', true));
      }
      if (filterOptions.TicketNotAssigned) {
        q = query(q, where('filters.ticketNotAssigned', '==', true));
      }
      if (filterOptions.OrderUnpaid) {
        q = query(q, where('filters.orderUnpaid', '==', true));
      }
      if (filterOptions.selectedDelivery) {
        q = query(
          q,
          where(
            'filters.selectedDelivery',
            '==',
            filterOptions.selectedDelivery
          )
        );
      }
      if (filterOptions.selectedTicketType) {
        q = query(
          q,
          where(
            'filters.selectedTicketType',
            '==',
            filterOptions.selectedTicketType
          )
        );
      }

      return q;
    };

    const q = buildQuery();
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTotalCounts(snapshot.size);
    });

    return () => unsubscribe();
  }, [filterOptions]);

  useLayoutEffect(() => {
    if (state.error == false && state.message == 'success') {
      router.push('/');
    }
  }, [state]);

  return (
    <form className="space-y-6" action={formAction}>
      <input type="hidden" name="newid" value={id} />
      <div className="flex flex-row">
        <label className="block text-sm font-medium text-gray-700 basis-2/4">
          Campaign Name
        </label>
        <input
          type="text"
          defaultValue={defaultValues?.name ? defaultValues?.name : ''}
          name="campaignName"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 basis-2/4 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-row">
        <label className="block text-sm font-medium text-gray-700 basis-2/4">
          Type
        </label>
        <select
          name="selectedTicket"
          defaultValue={
            defaultValues?.selectedTicket ? defaultValues?.selectedTicket : ''
          }
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
                  name="delivery"
                  defaultValue={
                    defaultValues?.delivery ? defaultValues?.delivery : ''
                  }
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
                  defaultValue={
                    defaultValues?.ticketType ? defaultValues?.ticketType : ''
                  }
                  value={filterOptions.selectedTicketType}
                  name="ticketType"
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
        <select
          defaultValue={
            defaultValues?.selectedTemplate
              ? defaultValues.selectedTemplate
              : ''
          }
          name="template"
          className="mt-1 block w-full px-3 py-2 basis-2/4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {templates.length > 0 &&
            templates.map(({ name, id }) => {
              return (
                <option key={id} value={id}>
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
        <div>{totalCount}</div>
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
          name="button"
          type="submit"
          value={clickedBtn}
          onClick={() => setclickedBtn('save')}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
        <button
          onClick={() => setclickedBtn('schedule')}
          name="button"
          type="submit"
          value={clickedBtn}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Schedule
        </button>
      </div>
    </form>
  );
}
