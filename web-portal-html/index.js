import { createClient, rqlBuilder } from '@extrahorizon/javascript-sdk';

const exh = createClient({
  host: import.meta.env.VITE_API_HOST,
  consumerKey: import.meta.env.VITE_API_OAUTH_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_API_OAUTH_CONSUMER_SECRET,
  token: import.meta.env.VITE_API_OAUTH_TOKEN,
  tokenSecret: import.meta.env.VITE_API_OAUTH_TOKEN_SECRET,
});

const measurementResponse = await exh.data.documents.find('picture-measurement', {
  rql: rqlBuilder()
    .sort('-creationTimestamp')
    .limit(20)
    .build()
});

const measurements = measurementResponse.data;

const tbody = document.querySelector('#overview tbody');
measurements.forEach(measurement => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${measurement.creationTimestamp.toISOString()}</td>
    <td>
      <a href="https://${import.meta.env.VITE_API_HOST}/files/v1/${measurement.data.pictureFileToken}/file">View Picture</a>
    </td>
    <td>
      <a href="https://${import.meta.env.VITE_API_HOST}/files/v1/${measurement.data.reportFileToken}/file">View Report</a>
    </td>
  `;
  tbody.appendChild(tr);
});
