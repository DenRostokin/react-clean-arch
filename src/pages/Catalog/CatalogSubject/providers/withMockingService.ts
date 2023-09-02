import { createMockingServiceProviderHOC, ODataServiceContext } from 'shared/model/apiService';

const mockingServicePayload = new Map();

mockingServicePayload.set({
  method: 'GET',
  url: '/catalog/subject/1'
}, {
  id: '1',
  info: 'Catalog Subject Info'
});

export const withMockingService = createMockingServiceProviderHOC({
  Context: ODataServiceContext,
  waitingMs: 2000,
  payload: mockingServicePayload
});
