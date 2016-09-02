import { expect } from 'chai';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as TYPES from '../../../src/static/constants';
import * as ACTIONS_DATA from '../../../src/static/actions/data';
import { SERVER_URL } from '../../../src/static/utils/config';


describe('Data Actions:', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    beforeEach(() => {
    });

    it('receiveCategories should create RECEIVE_CATEGORIES action', () => {
        expect(ACTIONS_DATA.receiveCategories('data')).to.eql({
            type: TYPES.RECEIVE_CATEGORIES, payload: {
                data: 'data'
            }
        });
    });
});
