import { createMockingServiceProviderHOC, ODataServiceContext } from 'shared/model/apiService';

const mockingServicePayload = new Map();

mockingServicePayload.set({
  method: 'GET',
  url: '/catalog/subject/1'
}, {
  id: '1',
  info: 'Catalog Subject Information'
});

export const withMockingService = createMockingServiceProviderHOC({
  Context: ODataServiceContext,
  waitingMs: 1000,
  payload: mockingServicePayload
});
