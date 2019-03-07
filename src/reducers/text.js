const text = (state = "", action) => {
	switch(action.type) {
		case 'CHANGE_TEXT' :
		  return action.newText;
		 default :
		 	return state;
	}
}

export default text;
