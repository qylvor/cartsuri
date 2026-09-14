export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    if (!q) return new Response(JSON.stringify({error:'q required'}), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
    
    const shopeeUrl = `https://shopee.ph/api/v4/search/search_items?by=relevancy&keyword=${encodeURIComponent(q)}&limit=24&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`;
    
    try {
      const res = await fetch(shopeeUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15',
          'Accept': 'application/json',
          'Referer': `https://shopee.ph/search?keyword=${encodeURIComponent(q)}`
        }
      });
      const data = await res.text();
      return new Response(data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Cache-Control': 'public, max-age=300'
        }
      });
    } catch(e) {
      return new Response(JSON.stringify({error:e.message, items:[]}), {
        headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
      });
    }
  }
}
