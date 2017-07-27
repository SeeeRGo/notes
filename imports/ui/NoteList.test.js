import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteList} from './NoteList';
import {NoteListItem} from './NoteListItem';
if(Meteor.isClient){
	describe('NoteList', function() {
		it('should render NoteListItem for every note', function(){
			notes = [{
				_id: 'testNoteId1',
				title: '',
				body: '',
				userId: this.userId,
				updateAt: 0
			}, {
				_id: 'testNoteId2',
				title: '',
				body: '',
				userId: this.userId,
				updateAt: 0
			}]
			const wrapper = mount(<NoteList notes={notes}/>)
			expect(wrapper.find('NoteListItem').length).toBe(notes.length);
			expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
		})
		it('should render NoteListEmptyItem and no NoteListItems if no notes', function(){
			notes = [];
			const wrapper = mount(<NoteList notes={notes}/>)
			expect(wrapper.find('NoteListItem').length).toBe(0);
			expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
		})
	})
}