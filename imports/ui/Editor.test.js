import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {Editor} from './Editor';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient) {
	describe('Editor', function() {
		let browserHistory;
		let call;

		beforeEach(function () {
			call = expect.createSpy();
			browserHistory = {
				push: expect.createSpy()
			}
		})

		it('should render "Pick  or create a note to start" message', function() {
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>)
			expect(wrapper.find('p').text()).toBe("Pick  or create a note to start")
		})
		it('should render "Note not found" message', function() {
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory} selectedNoteId={notes[0]._id}/>)
			expect(wrapper.find('p').text()).toBe("Note not found")
		})
		it('should remove notes', function() {
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id}/>)
			wrapper.find('button').simulate('click')			
			expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
			expect(browserHistory.push).toHaveBeenCalledWith('/dashboard')
		})
		it('should handle changes in textarea', function() {
			const newBody = 'New Body Text'
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id}/>)

			wrapper.find('textarea').simulate('change', {
				target: {
					value: newBody
				}
			})
			expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
			expect(wrapper.state().body).toBe(newBody);
		})
		it('should handle changes in input', function() {
			const newTitle = 'New Title Text'
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id}/>)

			wrapper.find('input').simulate('change', {
				target: {
					value: newTitle
				}
			})
			expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
			expect(wrapper.state().title).toBe(newTitle);
		})
		it('should update state when note changes', function() {
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>)

			wrapper.setProps({
				selectedNoteId: notes[1]._id,
				note: notes[1]
			})
			expect(wrapper.state('body')).toBe(notes[1].body);
			expect(wrapper.state('title')).toBe(notes[1].title);
		})
		it('should not set state when note prop not provided', function() {
			const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>)

			wrapper.setProps({
				selectedNoteId: notes[1]._id				
			})
			expect(wrapper.state('body')).toBe('');
			expect(wrapper.state('title')).toBe('');
		})				
	});
}
