import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "npm:@supabase/supabase-js@2.39.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // CORS check
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    // Si no hay key, tiramos el error para que lo vea nuestra app
    if (!supabaseServiceKey) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en el entorno.");

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    const { email, first_name } = await req.json();

    // Ejecutar la invitación nativa de Supabase
    let { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, { 
        data: { first_name }
    });

    // Si falló por Rate Limit de Correos gratuitos, USAMOS LA API MAESTRA `generateLink`
    let testLink = null;
    if (error && error.message.includes('rate limit')) {
        console.log("RATE LIMIT DETECTADO. Generando link maestro silencioso...");
        
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'invite',
            email: email,
            data: { first_name }
        });
        
        if (linkError) throw linkError;
        if (linkData && linkData.properties && linkData.properties.action_link) {
            testLink = linkData.properties.action_link;
            error = null; // Borramos el error porque lo resolvimos
        } else {
            throw new Error("No se pudo generar el link de respaldo.");
        }
    } else if (error) {
        throw error;
    }

    return new Response(JSON.stringify({ success: true, link: testLink, data }), { 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
    });
    
  } catch (err: any) {
    console.error("EDGE FUNCTION ERROR:", err.message, err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
    });
  }
})
