import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import moment from 'moment';

import {NoteListItem} from './NoteListItem';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient) {
	describe('NoteListItem', function() {
		let Session;

		beforeEach(() => {
			Session = {
				set: expect.createSpy()
			}
		})
		it('should render title', function(){			
			const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)
			expect(wrapper.find('h5').text()).toBe(notes[0].title)
		})
		it('should render timestamp', function() {			
			const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)
			expect(wrapper.find('p').text()).toBe(moment(notes[0].updatedAt).format('D/M/YY'));
		})
		it('should render Untitled Note', function() {
			const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>)
			expect(wrapper.find('h5').text()).toBe('Untitled note');
		})
		it('should call set on click', function() {
			const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>)
			wrapper.find('div').simulate('click');
			console.log(Session.set.calls);
			expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[1]._id);
		})
	});
}