import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient) {
	describe('PrivateHeader', function(){
		it('should set button text to logout', function(){
			const wrapper = mount( <PrivateHeader title="test title" handleLogout={() => {}}/> );

			const butttonText = wrapper.find('button').text();
			expect(butttonText).toBe('Logout');
		});
		it('should render title properly', function(){
			const title="test title";
			const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );

			const headerText = wrapper.find('h1').text();
			expect(headerText).toBe(title);
		});		
		it('should call handleLogout on click', function(){
			const spy = expect.createSpy();
			const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );
			wrapper.find('button').simulate('click');
			expect(spy).toHaveBeenCalled();
		})
	});
}