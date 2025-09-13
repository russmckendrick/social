// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Env {}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate target URL
  if (!targetUrl) {
    return new Response(
      JSON.stringify({ error: 'Missing url parameter' }),
      {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    );
  }

  // Whitelist allowed domains for security
  const allowedDomains = [
    'www.russ.fm',
    'russ.fm',
    'www.russ.foo',
    'russ.foo',
    'www.russ.cloud',
    'russ.cloud',
  ];

  try {
    const targetHost = new URL(targetUrl).hostname;
    if (!allowedDomains.includes(targetHost)) {
      return new Response(
        JSON.stringify({ error: 'Domain not allowed' }),
        {
          status: 403,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          },
        }
      );
    }

    // Fetch from target URL
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Russ Social Proxy/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Get content type and body
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const body = await response.text();

    return new Response(body, {
      headers: {
        'Content-Type': contentType,
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data' }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    );
  }
};