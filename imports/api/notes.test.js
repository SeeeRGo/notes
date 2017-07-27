import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';
if (Meteor.isServer) {
	describe('notes', function () {
		const noteOne = {
				_id: 'testNoteId1',
				title: 'My title',
				body: 'My body for note',
				updatedAt: 0,
				userId: 'testUserId1'
			}
		const noteTwo = {
				_id: 'testNoteId2',
				title: 'My other title',
				body: 'My other body for note',
				updatedAt: 0,
				userId: 'testUserId2'
			}
		beforeEach(function() {
			Notes.remove({});
			Notes.insert(noteOne);
			Notes.insert(noteTwo);
		});

		it('should insert new note', function() {
			userId = 'testid';
			const _id = Meteor.server.method_handlers['notes.insert'].apply({userId})
			expect(Notes.findOne({_id, userId})).toExist();
		});
		it('should not insert new note for anons', function() {			
			expect(() => {
				Meteor.server.method_handlers['notes.insert'].apply({}, [noteOne._id]);
			}).toThrow();			
		});
		it('should remove a note', function(){
			Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
			expect(Notes.findOne({_id: noteOne._id, userId: noteOne.userId})).toNotExist();
		});
		it('should not remove note if unauthenticated', function(){
			expect(() =>{
				Meteor.server.method_handlers['notes.remove'](noteOne._id);
			}).toThrow()
		});
		it('should not remove if invalid _id', function(){
			expect(() =>{
				Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
			}).toThrow();
		});
		it('should update note', function(){
			const title = 'new title';
			Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, {title}]);
			const note = Notes.findOne({_id: noteOne._id});
			expect(note.updatedAt).toBeGreaterThan(0);
			expect(note).toInclude({title, body: noteOne.body});
		});
		it('should throw error if extra updates', function(){
			const title = 'new title';
			expect(() => {
				Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, 
							[noteOne._id, 
							{
								title, 
								extra: 'extraItem'
							}])
			}).toThrow();			
		});
		it('should not update if user was not a creator', function() {
			const title = 'new title';
			Meteor.server.method_handlers['notes.update'].apply({userId: 'otherUser'}, [noteOne._id, {title}]);
			const note = Notes.findOne({_id: noteOne._id});
			expect(note).toInclude(noteOne);			
		});
		it('should not update note if unauthenticated', function(){
			const title = 'new title';
			expect(() =>{
				Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id, {title}]);
			}).toThrow();
		});
		it('should not update if invalid _id', function(){
			const title = 'new title';
			expect(() =>{
				Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [true, {title}]);
			}).toThrow();
		});

		it('should return user notes', function() {
			const res = Meteor.server.publish_handlers.notes.apply({userId: noteTwo.userId});
			const notes = res.fetch();
			expect(notes.length).toBe(1);
			expect(notes[0]).toEqual(noteTwo);
		});
		it('should return no notes for user that has none', function() {
			const res = Meteor.server.publish_handlers.notes.apply({userId: 'Unknown user'});
			const notes = res.fetch();
			expect(notes.length).toBe(0);			
		});
	});
}