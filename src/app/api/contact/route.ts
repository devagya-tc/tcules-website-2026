import { createClientContact, type ContactFormSubmission } from '@/content';

function formValue(formData: FormData, key: keyof ContactFormSubmission): string {
  const candidate = formData.get(key);
  return typeof candidate === 'string' ? candidate.trim() : '';
}

function isEmail(candidate: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(candidate);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const submission: ContactFormSubmission = {
    clientName: formValue(formData, 'clientName'),
    clientCompany: formValue(formData, 'clientCompany'),
    clientEmail: formValue(formData, 'clientEmail'),
    clientContact: formValue(formData, 'clientContact'),
    clientComments: formValue(formData, 'clientComments'),
  };

  if (Object.values(submission).some((field) => field.length === 0)) {
    return Response.json(
      { ok: false, error: 'All contact fields are required.' },
      { status: 400 },
    );
  }

  if (!isEmail(submission.clientEmail)) {
    return Response.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 });
  }

  try {
    const created = await createClientContact(submission);
    return Response.json(
      { ok: true, documentId: created.documentId },
      { status: 201, headers: { 'cache-control': 'no-store' } },
    );
  } catch {
    return Response.json(
      { ok: false, error: 'The contact request could not be submitted.' },
      { status: 502, headers: { 'cache-control': 'no-store' } },
    );
  }
}
