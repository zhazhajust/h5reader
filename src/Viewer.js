import React, { startTransition, useState, useEffect } from 'react';
import { App } from '@h5web/app';
import { H5WasmProvider } from '@h5web/h5wasm';

function Viewer(props) {
  const { fileInfo } = props;
  const [buffer, setBuffer] = useState(null);

  useEffect(() => {
    startTransition(() => {
      (async () => {
        try {
          console.log('Fetching data from:', fileInfo.uri);
          const res = await fetch(fileInfo.uri);
          if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
          }
          const arrayBuffer = await res.arrayBuffer();
          console.log('Data fetched successfully');
          setBuffer(arrayBuffer);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
    });
  }, [fileInfo]);

  if (!buffer) {
    return <div>Loading...</div>;
  }

  return (
    <H5WasmProvider
      filename={fileInfo.name}
      buffer={buffer}
    >
      <App />
    </H5WasmProvider>
  );
}

export default Viewer;
