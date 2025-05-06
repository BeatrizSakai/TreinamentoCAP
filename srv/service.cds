using { FirstApp as this } from '../db/schema';

@path: '/api/first'

service FirstAppSrv {

    entity pessoa as projection on this.pessoa;

}