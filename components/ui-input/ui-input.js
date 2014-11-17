(function () {
    'use strict';
    // The element's implementation.
    Polymer('ui-input', {
        // An instance of the element is created. If you’re initializing an array or object,
        // do it in the created callback rather than directly on the prototype.
        created: function () {
        },
        // The <polymer-element> has been fully prepared
        // (e.g. Shadow DOM created, property observers setup, event listeners attached, etc).
        ready: function () {
            // Set ARIA attributes.
            this.disabledHandler();
            this.placeholderHandler();
        },
        // An instance of the element was inserted into the DOM.
        attached: function () {
        },
        // Called when the element’s initial set of children are guaranteed to exist.
        // This is an appropriate time to poke at the element’s parent or light DOM children.
        // Another use is when you have sibling custom elements (e.g. they're .innerHTML'd together, at the same time).
        // Before element A can use B’s API/properties, element B needs to be upgraded.
        // The domReady callback ensures both elements exist.
        domReady: function () {
        },
        // An instance was removed from the DOM.
        detached: function () {
        },
        // An attribute was added, removed, or updated.
        // Note: to observe changes to published properties, use changed watchers.
        attributeChanged: function (attrName, oldVal, newVal) {
            if (this[attrName + 'Handler']) {
                this[attrName + 'Handler'](oldVal, newVal);
            }
        },
        // When you publish a property name, you’re making that property part of the element’s “public API”.
        // Published properties have the following features:
        // Support for two-way, declarative data binding.
        // Declarative initialization using an HTML attribute with a matching name.
        // Optionally, the current value of a property can be reflected back to an attribute with a matching name.
        publish: {
            /**
             * The "committed" value of the input, ie. the input value when the user
             * hits the "enter" key or blurs the input after changing the value. You
             * can bind to this value instead of listening for the "change" event.
             * Setting this property has no effect on the input value.
             *
             * @attribute committedValue
             * @type string
             * @default ''
             */
            committedValue: '',
            /**
             * Set to true to prevent invalid input from being entered.
             *
             * @attribute preventInvalidInput
             * @type boolean
             * @default false
             */
            preventInvalidInput: false
        },
        // Store the last valid input value.
        previousValidInput: '',
        // Delegate events to action handlers.
        eventDelegates: {
            input: 'inputAction',
            change: 'changeAction'
        },
        // Update ARIA attributes.
        disabledHandler: function () {
            if (this.disabled) {
                this.setAttribute('aria-disabled', '');
            } else {
                this.removeAttribute('aria-disabled');
            }
        },
        // ARIA attributes.
        placeholderHandler: function () {
            if (this.placeholder) {
                this.setAttribute('aria-label', this.placeholder);
            } else {
                this.removeAttribute('aria-label');
            }
        },
        // Commit changes.
        changeAction: function () {
            this.commit();
        },
        // Validate input.
        inputAction: function (e) {
            if (this.preventInvalidInput) {
                if (!e.target.validity.valid) {
                    e.target.value = this.previousValidInput;
                } else {
                    this.previousValidInput = e.target.value;
                }
            }
        },
        /**
         * Commits the `value` to `committedValue`
         *
         * @method commit
         */
        commit: function () {
            this.committedValue = this.value;
        }
    });
})();
