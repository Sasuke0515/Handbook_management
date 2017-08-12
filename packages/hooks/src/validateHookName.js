/**
 * Validate a hookName string.
 *
 * @param  {string} hookName The hook name to validate. Should be a non empty string containing
 *                           only numbers, letters, dashes, periods and underscores. Also,
 *                           the hook name cannot begin with `__`.
 *
 * @return {bool}            Whether the hook name is valid.
 */
function validateHookName( hookName ) {

	if ( 'string' !== typeof hookName || '' === hookName ) {
		console.error( 'The hook name must be a non-empty string.' );
		return false;
	}

	if ( /^__/.test( hookName ) ) {
		console.error( 'The hook name cannot begin with `__`.' );
		return false;
	}

	if ( ! /^[a-z][a-z0-9_.-]*$/.test( hookName ) ) {
		console.error( 'The hook name can only contain numbers, letters, dashes, periods and underscores.' );
		return false;
	}

	return true;
}

export default validateHookName;
