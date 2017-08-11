import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '../api/notes';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router'

export class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: ''
		}
	}
	handleBodyChange(e) {
		const body = e.target.value;
		this.setState({body});
		this.props.call('notes.update', this.props.note._id, {body})
	}
	handleTitleChange(e) {
		const title = e.target.value;
		this.setState({title});
		this.props.call('notes.update', this.props.note._id, {title})
	}
	componentDidUpdate(prevProps, prevState) {
		const currentNoteId = this.props.note ? this.props.note._id : undefined;
		const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
		if(currentNoteId && prevNoteId !== currentNoteId) {
			this.setState({
				title: this.props.note.title,
				body: this.props.note.body
			})
		}
		
	}
	render() {	
			if(this.props.note) {
				return (
					<div className="editor">
						<input value={this.state.title} placeholder="Title of your note" onChange={this.handleTitleChange.bind(this)}/>
						<textarea value={this.state.body} placeholder="Your note" onChange={this.handleBodyChange.bind(this)}></textarea>
						<button onClick={() => {
							this.props.call('notes.remove', this.props.note._id)
							this.props.browserHistory.push('/dashboard');
						}}>Delete Note</button>
					</div>
					)
			}
			else {
				return (
					<div className="editor">
						<p>
							{this.props.selectedNoteId ? "Note not found" : "Pick  or create a note to start"}
						</p>
					</div>
					)
			}
			
	}
}

Editor.propTypes = {
	selectedNoteId: React.PropTypes.string,
	note: React.PropTypes.object,
	call: React.PropTypes.func.isRequired,
	browserHistory: React.PropTypes.object.isRequired
}
export default createContainer (() => {
	const selectedNoteId = Session.get('selectedNoteId');
	return {
		selectedNoteId,
		note: Notes.findOne({_id: selectedNoteId}),
		call: Meteor.call,
		browserHistory
	}
}, Editor);