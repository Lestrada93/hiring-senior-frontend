import React from 'react';
import { create } from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '.';

describe('Header component', () => {
    test('Snapshot', () => {
        const header = create(
            <Router>
                <Header />
            </Router>);
        expect(header.toJSON()).toMatchSnapshot();
    });
});
