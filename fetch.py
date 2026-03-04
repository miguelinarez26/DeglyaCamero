import urllib.request
import json
import ssl
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
url = "https://api.pexels.com/v1/search?query=archway%20landscape&per_page=10"
hdr = {'Authorization': 'dYOTL2KXYJOMd4iLwKUM6J1ZlE8r5N1wY55S7DMTB1i1xLftrN9jZ6v6'}
req = urllib.request.Request(url, headers=hdr)
with urllib.request.urlopen(req, context=ctx) as response:
    data = json.loads(response.read().decode())
    with open('links.txt', 'w') as f:
        for item in data['photos']:
            f.write(item['src']['large2x'] + '\n')
