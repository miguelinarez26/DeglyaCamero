const TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';

async function list() {
    try {
        const response = await fetch('https://api.supabase.com/v1/projects', {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });

        if (!response.ok) {
            console.error(`Error ${response.status}: ${await response.text()}`);
            return;
        }

        const projects = await response.json();
        console.log(JSON.stringify(projects, null, 2));
    } catch (err) {
        console.error(err);
    }
}

list();
