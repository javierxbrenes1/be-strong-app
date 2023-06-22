import { StoreApi } from 'zustand';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mountStoreDevtool } from 'simple-zustand-devtools';

function mountStateOnDevTools(
  storeName: string,
  store: StoreApi<Record<string | number | symbol, unknown>>
): void {
  if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool(storeName, store);
  }
}

export default mountStateOnDevTools;
