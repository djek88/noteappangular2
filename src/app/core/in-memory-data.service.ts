import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
      // tslint:disable-next-line:max-line-length
      { id: 0, title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.', content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.', createdAt: new Date(), updatedAt: new Date() },
      { id: 1, title: 'title11', content: 'content11', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'title12', content: 'content12 aaa', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, title: 'title13', content: 'content13', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, title: 'tit4le14', content: 'content14', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, title: 'title15', content: 'content15', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, title: 'title16', content: 'content16', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, title: 'title17', content: 'content17 aaa', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, title: 'title18 aaa', content: 'content18', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, title: 'title19', content: 'content19', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, title: 'title20', content: 'content20 aaa', createdAt: new Date(), updatedAt: new Date() }
    ];
    return { notes };
  }
}
