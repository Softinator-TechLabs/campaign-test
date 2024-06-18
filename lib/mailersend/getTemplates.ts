import { mailerSend } from './config';

export const getTemplates = async () => {
  if (mailerSend) {
    try {
      const response = await mailerSend.email.template.list({
        domain_id: 'domain_id'
      });
      return response.body.data;
    } catch (error: any) {
      console.log('Failed to get templates', error.message);
    }
  }
};

export const getTemplateById = async (templateId: string) => {
  if (mailerSend) {
    try {
      const response = await mailerSend.email.template.single(templateId);
      return response.body;
    } catch (error: any) {
      console.log('Failed to get template by ID', error.message);
      return null;
    }
  }
};
