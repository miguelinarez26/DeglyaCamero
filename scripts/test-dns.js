
import dns from 'dns';

const hostname = 'db.yqmqzyaqlhgzcbcbintn.supabase.co';

console.log(`Looking up ${hostname}...`);

dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) {
        console.error('Lookup failed:', err);
    } else {
        console.log('Addresses:', addresses);
    }
});
