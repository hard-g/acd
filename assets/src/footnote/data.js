import { registerStore } from '@wordpress/data';

// Pre-load initial state from server.
const initialState = window.attrMeta ? Object.values( window.attrMeta ) : [];

// Reducer
function reducer( state, action ) {
	switch ( action.type ) {
		case 'ADD_FOOTNOTE':
			return state.concat( [ action.item ] );

		case 'UPDATE_FOOTNOTE':
			return state.map( ( item ) =>
				item.id === action.item.id ? action.item : item
			);

		case 'REMOVE_FOOTNOTE':
			return state.filter( ( item ) => item.id !== action.id );
	}

	return state;
}

// Actions.
const actions = {
	add( item ) {
		return {
			type: 'ADD_FOOTNOTE',
			item,
		};
	},
	update( item ) {
		return {
			type: 'UPDATE_FOOTNOTE',
			item,
		};
	},
	remove( id ) {
		return {
			type: 'REMOVE_FOOTNOTE',
			id,
		};
	},
};

// Selectors
const selectors = {
	get( state ) {
		return state;
	},
};

registerStore( 'acd/footnotes', {
	reducer,
	actions,
	selectors,
	initialState,
} );
