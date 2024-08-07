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
widgets.rangeWidget = function(options) {
    var opt = Object.assign({}, options);
    return {
        toHTML: function(name, field) {
            return `
                <input type="range" name="${name}" id="${field.id}" value="${field.value || opt.min}" min="${opt.min}" max="${opt.max}" step="${opt.step}" class="form-control" oninput="document.getElementById('${field.id}-label').innerHTML = this.value" />
                <label id="${field.id}-label">${field.value || opt.min}</label>
            `;
        }
    };
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
        }),
        image_url: fields.string({
            widget: widgets.hidden()
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

const createRegistrationForm = () => {
    return forms.create({
        username: fields.string({
            required: true,
            errorAfterField: true
        }),
        email: fields.email({
            required:true,
            errorAfterField: true
        }),
        password: fields.password({
            required: true,
            errorAfterField: true
        }),
        confirm_password: fields.password({
            required: true,
            errorAfterField: true,
            validators:[validators.matchField('password')]
        })
        
    })
}

const createLoginForm = () => {
    return forms.create({
        email: fields.email({
            required:true,
            errorAfterField: true
        }),
        password: fields.password({
            required: true,
            errorAfterField: true
        })
        
    })
}

const createSearchForm = (categories=[], uoms=[]) => {
    return forms.create({
       'name': fields.string({
            required: false,
            errorAfterField: true
        }),
        'price_range': fields.number({
            required: false,
            widget: widgets.rangeWidget({ min: 0, max: 10000, step: 100 }),
            validators: [validators.integer()],
            label: 'Price Range'
        }),
        uom_id: fields.string({
            label: 'UOM',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices: uoms
        }),
        categories: fields.string({
            required: true,
            errorAfterField: true,
            widget: widgets.multipleSelect(),
            choices: categories
        })
    })
}

module.exports = { createProductForm, createUOMForm, bootstrapField, createRegistrationForm, createLoginForm, createSearchForm}