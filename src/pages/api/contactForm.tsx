import { postContactForm } from '@/lib';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { method } = request;

  if (method === 'POST') {
    const contactForm = request.body.contactForm;

    const result = await postContactForm(contactForm);

    return response.status(200).json(result);
  }
}
