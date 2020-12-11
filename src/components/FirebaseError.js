import React from 'react';

// Simple error comopnent, showing that a firebase error occurred
const FirebaseError = ({error}) => {
	return (
		<div className="alert alert-danger">Ooops! an error occurred:
			<pre>
				{error}
			</pre>
		</div>
	);
}

export default FirebaseError;
