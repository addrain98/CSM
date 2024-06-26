const forms = require('forms');

const classes = forms.fieldsetClasses;
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets

const bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    let validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    const label = object.labelHTML(name);
    const error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    const widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

const createProductForm = (uoms=[], categories=[]) => {
    return forms.create({
        name: fields.string({
            required: true,
            errorAfterField: true
        }),
        cost: fields.string({
            required: true,
            errorAfterField: true,
            validators: [validators.integer()]
        }),
        product_specs: fields.string({
            required: true,
            errorAfterField: true
        }),
        uom_id: fields.string({
            label: 'UOM',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: uoms
        }),
        categories:fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.multipleSelect(),
            choices: categories
        })
    });
};

const createUOMForm = () => {
    return forms.create({
        name: fields.string({
            required: true,
            errorAfterField: true
        }),

        description: fields.string({
            required: true,
            errorAfterField: true
        })

    });
}

module.exports = { createProductForm, createUOMForm, bootstrapField }