import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {NoteList} from './NoteList';
import {NoteListItem} from './NoteListItem';
import {notes} from '../fixtures/fixtures';
if(Meteor.isClient){
	describe('NoteList', function() {
		it('should render NoteListItem for every note', function(){			
			const wrapper = mount(<NoteList notes={notes}/>)
			expect(wrapper.find('NoteListItem').length).toBe(notes.length);
			expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
		})
		it('should render NoteListEmptyItem and no NoteListItems if no notes', function(){
			//notes = [];
			const wrapper = mount(<NoteList notes={[]}/>)
			expect(wrapper.find('NoteListItem').length).toBe(0);
			expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
		})
	})
}