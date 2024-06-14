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
