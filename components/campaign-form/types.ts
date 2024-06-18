export type FilterType = {
  noAccout: boolean;
  ticketNotCompleted: boolean;
  TicketNotAssigned: boolean;
  OrderUnpaid: boolean;
  delivery: string[];
  ticketType: string[];
  selectedDelivery: string;
  selectedTicketType: string;
};

export type MailerSendTemplateType = {
  id: string;
  image_path: string;
  name: string;
  type: string;
  variables: object;
};

export type propsType = {
  id?: string;
  mode: string;
  campaignAction: (
    prev: any,
    formData: FormData
  ) => Promise<{ mode: any; error: boolean; message: any }>;
  templates: MailerSendTemplateType[];
  defaultValues?: any;
};
