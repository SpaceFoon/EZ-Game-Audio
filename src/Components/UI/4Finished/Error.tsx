import { listen, UnlistenFn } from '@tauri-apps/api/event';
import { useEffect } from 'react';

useEffect(() => {
  const unlisten = async () => {
    const unlistener: UnlistenFn = await listen('panic_occurred', (event: { payload: { message: string } }) => {
      console.log('Received panic occurred event:', event.payload);
      // Do something with the received event payload
      // For example, show an alert
      alert(event.payload.message);
    });

    return unlistener;
  };

  // Remember to clean up the event listener
  const cleanUp = async () => {
    const unlistener = await unlisten();
    unlistener();
  };

  cleanUp();

}, []);
