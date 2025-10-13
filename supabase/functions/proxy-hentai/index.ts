import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function bufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const API_URL = "https://www.api.neext.online/api/hentai";

  try {
    const externalResp = await fetch(API_URL, { method: "GET" });

    if (!externalResp.ok) {
      const text = await externalResp.text();
      console.error("proxy-hentai upstream error:", externalResp.status, text);
      return new Response(
        JSON.stringify({ error: "Upstream error", status: externalResp.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contentType = externalResp.headers.get("content-type") || "image/jpeg";
    const buf = await externalResp.arrayBuffer();
    const base64 = bufferToBase64(buf);
    const dataUrl = `data:${contentType};base64,${base64}`;

    // Return JSON with a data URL so the client can render it easily
    return new Response(JSON.stringify({ url: dataUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("proxy-hentai error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
