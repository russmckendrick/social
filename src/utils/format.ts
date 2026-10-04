export const stripHtml = (value: string) => {
  if (!value) {
    return '';
  }

  const parsed = new DOMParser().parseFromString(value, 'text/html');
  return parsed.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
};

// "3 Oct" — short, British-style day and month.
export const formatShortDate = (value?: string) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export const getHost = (value?: string) => {
  if (!value) {
    return '';
  }

  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
};

export const formatCount = (value: number) => value.toLocaleString('en-GB');
