import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
	const renderNotes = () => {
		if(props.notes.length === 0) {
			return <NoteListEmptyItem/>
		}
		return props.notes.map((note) => {
			return <NoteListItem key={note._id} note={note}/>
		})
	}
	return (
		<div>
			NoteList {props.notes.length}
			<NoteListHeader/>
			{renderNotes()}
		</div>
		);
};

NoteList.propTypes = {
	notes: React.PropTypes.array.isRequired
}

export default createContainer(() => {
	const selectedNoteId = Session.get('selectedNoteId')
	Meteor.subscribe('notes');

	return {
		notes: Notes.find().fetch().map((note) => {
			return {
				...note,
				selected: (note._id === selectedNoteId)
			}
		})
	};
}, NoteList)