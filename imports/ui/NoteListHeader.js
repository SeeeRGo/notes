import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';

import {Notes} from '../api/notes';

export const NoteListHeader = (props) => {
	return (
		<div>
			<button onClick={() => {
				props.meteorCall('notes.insert', (err, res) => {
					if(res){
						props.Session.set('selectedNoteId', res);
					}
				});
			}}>Create Note</button>
		</div>
		)
}

NoteListHeader.propTypes = {
	meteorCall: React.PropTypes.func.isRequired,
	Session: React.PropTypes.object.isRequired
}

export default createContainer(() => {
	return {
		meteorCall: Meteor.call,
		Session
	}
}, NoteListHeader)