import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
	const renderNotes = () => {
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
	Meteor.subscribe('notes');

	return {
		notes: Notes.find().fetch()
	};
}, NoteList)