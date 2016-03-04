"use strict";

var FormDeserialize = function() {};

FormDeserialize.prototype.deserialize = function(formValueObject) {
	var that = this;

    console.log('Deserializing: ' + JSON.stringify(formValueObject));

	for (var key in formValueObject) {
		if ($.isArray(formValueObject[key])) {
			formValueObject[key].forEach(function(ele) {
                that.setFieldValue({name: key, value: ele});
			});
		} else {
			that.setFieldValue({name: key, value: formValueObject[key]});
		}
	}
}

FormDeserialize.prototype.setFieldValue = function(fieldData) {
	var $field = this.getField(fieldData);
	if ($field.length > 0) {
	    this.setField($field, fieldData);	
	}
}

FormDeserialize.prototype.setField = function($field, fieldData) {
	var FIELDTYPE = $field.prop('type');

	if (FIELDTYPE === 'checkbox') {
		console.log('Setting checked state for ' + $field.prop('nodeName').toLowerCase() + ' -type- ' + $field.attr('type') + ' -name- ' + $field.attr('name') + ' -value- ' + $field.attr('value') + '');
		$field.prop('checked', true);
	} else if (FIELDTYPE === 'text') {
		console.log('Setting value for ' + $field.prop('nodeName').toLowerCase() + ' -type- ' + $field.attr('type') + ' -name- ' + $field.attr('name') + ' -value- ' + $field.attr('value') + '');
		$field.val(fieldData.value)
	} else {
		console.warn('No method for setting ' + fieldData.name + ' found.');
	}
}

FormDeserialize.prototype.getField = function(field) {
	var that = this;
	var selector;
	var $field;

	// try name and value
	selector = '[name=' + field.name + '][value="' + field.value + '"]';
	var $field = $(selector);

	// nothing found? try name only
	if ($field.length < 1) {
		selector = '[name=' + field.name + ']';
		$field = $(selector);
	}

	// should only have one field with that name
	if ($field.length > 1) {
		console.warn('Too much fields with name ' + field.name + '. Using only first.');
		$field = $($field.get(0));
	}

	// give up
	if ($field.length < 1) {
		console.warn('No field found for selector ' + selector);
		return $();
	}

	console.log('Successfully queried a field with selector ' + selector);

	// success
	return $field;
}

new FormDeserialize().deserialize({"brands":["Lundia","Alessi"],"q":"*","page":"2"});