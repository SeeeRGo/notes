import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import moment from 'moment';

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
	describe('NoteListItem', function() {
		it('should render title', function(){
			const noteOne = {
				title: 'Title',
				body: 'Body',
				userId: this.userId,
				updateAt: moment(0).valueOf()
			}
			const wrapper = mount(<NoteListItem note={noteOne}/>)
			expect(wrapper.find('h5').text()).toBe(noteOne.title)
		})
		it('should render timestamp', function() {
			const noteOne = {
				title: 'Title',
				body: 'Body',
				userId: this.userId,
				updateAt: moment(0).valueOf()
			}
			const wrapper = mount(<NoteListItem note={noteOne}/>)
			expect(wrapper.find('p').text()).toBe(moment(noteOne.updatedAt).format('D/M/YY'));
		})
		it('should render Untitled Note', function() {

		const wrapper = mount(<NoteListItem note={{}}/>)
			expect(wrapper.find('h5').text()).toBe('Untitled note');
		})
	});
}